"use client";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useForm, useWatch } from "react-hook-form";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { getSpecimenAPI, postWithdrawnAPI } from "./WithdrawnApis";
import { getAccountDetailsByAccountNoAPI } from "../deposit/DepositApis";

export const useWithdrawn = () => {
  const orgId = getSessionStorageData("orgId");
  const finId = getSessionStorageData("finId");
  const branchId = getSessionStorageData("userBranchId");

  const [loading, setLoading] = useState("");
  const [visibleBlock, setVisibleBlock] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [depositProduct, setDepositProduct] = useState(null);
  const [showLedger, setShowLedger] = useState(false);
  const [photoLink, setPhotoLink] = useState(null);
  const [signatureLink, setSignatureLink] = useState(null);

  // denominators
  const [inDenominators, setInDenominators] = useState([]);
  const [outDenominators, setOutDenominators] = useState([]);

  // cash Transaction Total
  const [cashInTransactionTotal, setCashInTransactionTotal] = useState([]);
  const [cashOutTransactionTotal, setCashOutTransactionTotal] = useState([]);

  const [cashInTransactionGrandTotal, setCashInTransactionGrandTotal] =
    useState(0);

  const [cashOutTransactionGrandTotal, setCashOutTransactionGrandTotal] =
    useState(0);

  const [cashInDenomArray, setCashInDenomArray] = useState([]);
  const [cashOutDenomArray, setCashOutDenomArray] = useState([]);

  const cashDenomData = useSelector(
    (state) => state?.issueMembership?.noteDenomData
  );

  const formSchema = yup.object({
    memberNo: yup.string().required("Member no. is required"),
    cifNo: yup.string().required("CIF no is required"),
    memberName: yup.string().required("Member name is required"),
    gurdianName: yup.string().required("Gurdian name is required"),
    mobile: yup.string().required("Mobile no. is required"),
    panNo: yup.string().required("Pan no. is required"),
    lastWithdrawnDate: yup.string(),
    lastWithdrawnAmount: yup.string(),
    availableBalance: yup.string(),
    Pending_Amt: yup.string(),
    Oper_Mode: yup.string(),
    withdrawnDate: yup.string().required("withdrawn date is required"),
    withdrawnAmount: yup.string().required("withdrawn amount is required"),
    transMode: yup.string().required("Transanction mode is required"),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      memberNo: "",
      cifNo: "",
      memberName: "",
      gurdianName: "",
      mobile: "",
      panNo: "",
      lastWithdrawnDate: "",
      lastWithdrawnAmount: "",
      availableBalance: "",
      Pending_Amt: "",
      Oper_Mode: "",
      withdrawnDate: "",
      withdrawnAmount: 0,
      joint1: "",
      joint2: "",
      transMode: "cash",
    },
  });

  const handleSubmit = async (values) => {
    postWithdrawnApiCall(values);
  };

  const handleAccountFormSubmit = (values) => {
    getAccountDetailsByAccountNoApiCall(values);
    form.setValue("withdrawnDate", format(values.date, "dd-MM-yyyy"));
  };

  const handleSeeSpecimen = () => {
    getSpecimenApiCall(orgId, depositProduct.Acct_Id);
  };

  const postWithdrawnApiCall = async (item) => {
    const cashDetails = cashOutDenomArray.map((outItem, idx) => {
      return {
        note_id: outItem.note_id,
        in_qnty: outItem.denominator,
        out_qnty: cashInDenomArray.filter(
          (inItem) => outItem.note_id === inItem.note_id
        )[0].denominator,
        tot_amount: cashInTransactionTotal[idx] - cashOutTransactionTotal[idx],
      };
    });
    let data = {
      member_id: depositProduct.Mem_Id,
      account_id: depositProduct.Acct_Id,
      trans_date: format(Date(item.withdrawnDate), "yyyy-MM-dd"),
      pamount: item.withdrawnAmount,
      fine_amt: 0,
      cash_details: cashDetails,
      sb_id: null,
      bank_id: null,
      branch_id: branchId,
      fin_id: finId,
      org_id: orgId,
    };

    setLoading(true);

    try {
      const res = await postWithdrawnAPI(data);

      if (res.message === "Success") {
        setSuccessMessage(res.details);
        form.reset();
        const defaultDenominators = Array(cashDenomData.length).fill("");
        setInDenominators(defaultDenominators);
        setOutDenominators(defaultDenominators);
        // toast.success(res.details || res.message);
      } else {
        toast.error(res.details || res.message);
        setSuccessMessage(null);
        setVisibleBlock(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      setSuccessMessage(null);
      setVisibleBlock(true);
    } finally {
      setLoading(false);
    }
  };

  const getSpecimenApiCall = async (orgId, acctId) => {
    setLoading(true);

    try {
      const res = await getSpecimenAPI(orgId, acctId);
      if (res.image_link) {
        setPhotoLink(res.image_link);
      } else {
        setPhotoLink(null);
      }
      if (res.sing_url) {
        setSignatureLink(res.sing_url);
      } else {
        setSignatureLink(null);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      setPhotoLink(null);
      setSignatureLink(null);
    } finally {
      setLoading(false);
    }
  };

  const getAccountDetailsByAccountNoApiCall = async (item) => {
    setLoading(true);

    let data = {
      pAcct_No: item.accountNo,
      ptype: "C",
      date: format(item.date, "yyyy-MM-dd"),
      org_id: orgId,
    };

    try {
      const res = await getAccountDetailsByAccountNoAPI(data);
      if (res.message === "Data Found") {
        form.setValue("memberNo", res.details[0].Member_No);
        form.setValue("cifNo", res.details[0].CIF_No);
        form.setValue("memberName", res.details[0].Full_Name);
        form.setValue("gurdianName", res.details[0].Relation_Name);
        form.setValue("mobile", res.details[0].Mem_Mob);
        form.setValue("panNo", res.details[0].Mem_Pan);
        form.setValue(
          "lastWithdrawnDate",
          res.details[0].Last_Date
            ? format(res.details[0].Last_Date, "dd-MM-yyyy")
            : ""
        );
        form.setValue(
          "lastWithdrawnAmount",
          res.details[0].Last_Amt ? res.details[0].Last_Amt : ""
        );
        form.setValue("availableBalance", res.details[0].Avail_Bal);
        form.setValue("withdrawnAmount", res.details[0].Pending_Amt);
        form.setValue("joint1", res.details[0].Joint_1);
        form.setValue("joint2", res.details[0].Joint_2);
        setDepositProduct(res.details[0]);
        setVisibleBlock(true);
        setShowLedger(true);
      } else {
        toast.error(res.details || res.message);
        form.setValue("memberNo", "");
        form.setValue("cifNo", "");
        form.setValue("memberName", "");
        form.setValue("gurdianName", "");
        form.setValue("mobile", "");
        form.setValue("panNo", "");
        form.setValue("lastWithdrawnDate", "");
        form.setValue("lastWithdrawnAmount", "");
        form.setValue("availableBalance", "");
        form.setValue("withdrawnAmount", "");
        form.setValue("joint1", "");
        form.setValue("joint2", "");
        setDepositProduct(null);
        setVisibleBlock(true);
        setVisibleBlock(false);
        setShowLedger(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      form.setValue("memberNo", "");
      form.setValue("cifNo", "");
      form.setValue("memberName", "");
      form.setValue("gurdianName", "");
      form.setValue("mobile", "");
      form.setValue("panNo", "");
      form.setValue("lastWithdrawnDate", "");
      form.setValue("lastWithdrawnAmount", "");
      form.setValue("availableBalance", "");
      form.setValue("withdrawnAmount", "");
      form.setValue("joint1", "");
      form.setValue("joint2", "");
      setDepositProduct(null);
      setVisibleBlock(false);
      setShowLedger(false);
    } finally {
      setLoading(false);
    }
  };

  //handle in denominators change
  const handleInDenominatorChange = (event, rowIndex) => {
    const { value } = event.target;
    const newDenominators = [...inDenominators];

    if (Number(value) > -1 && /^\d*$/.test(value)) {
      newDenominators[rowIndex] = value;
      setInDenominators(newDenominators);
    }
  };
  //handle in denominators change
  const handleOutDenominatorChange = (event, rowIndex) => {
    const { value } = event.target;
    const newDenominators = [...outDenominators];

    if (Number(value) > -1 && /^\d*$/.test(value)) {
      newDenominators[rowIndex] = value;
      setOutDenominators(newDenominators);
    }
  };

  //handle cash transaction grand total
  const calculateCashTransactionTotalAmount = (note, denominator) => {
    const parsedNote = parseFloat(note);
    const parsedDenominators = parseFloat(denominator);
    if (!isNaN(parsedNote) && !isNaN(parsedDenominators)) {
      return parsedNote * parsedDenominators;
    }
    return 0;
  };

  // set denominators
  useEffect(() => {
    const defaultDenominators = Array(cashDenomData.length).fill("");
    setInDenominators(defaultDenominators);
    setOutDenominators(defaultDenominators);
    const defaultTotalAmounts = Array(cashDenomData.length).fill(0);
    setCashInTransactionTotal(defaultTotalAmounts);
    setCashOutTransactionTotal(defaultTotalAmounts);
  }, [cashDenomData]);

  useEffect(() => {
    const newTotalAmounts = cashDenomData.map((cash, index) =>
      calculateCashTransactionTotalAmount(
        cash.Note_Value,
        inDenominators[index]
      )
    );

    setCashInTransactionTotal(newTotalAmounts);
  }, [inDenominators, cashDenomData]);

  useEffect(() => {
    const newTotalAmounts = cashDenomData.map((cash, index) =>
      calculateCashTransactionTotalAmount(
        cash.Note_Value,
        outDenominators[index]
      )
    );

    setCashOutTransactionTotal(newTotalAmounts);
  }, [outDenominators, cashDenomData]);

  useEffect(() => {
    // Calculate grand total
    const newGrandTotal = cashInTransactionTotal.reduce(
      (acc, curr) => acc + curr,
      0
    );
    setCashInTransactionGrandTotal(newGrandTotal);
  }, [cashInTransactionTotal]);

  useEffect(() => {
    // Calculate grand total
    const newGrandTotal = cashOutTransactionTotal.reduce(
      (acc, curr) => acc + curr,
      0
    );
    setCashOutTransactionGrandTotal(newGrandTotal);
  }, [cashOutTransactionTotal]);

  useEffect(() => {
    let postData = cashDenomData.map((cashDenom, idx) => {
      return {
        note_id: cashDenom.Id,
        denominator: parseInt(inDenominators[idx]) || 0,
        totalAmount: cashInTransactionTotal[idx],
      };
    });
    setCashInDenomArray(postData);
  }, [inDenominators, cashInTransactionTotal]);

  useEffect(() => {
    let postData = cashDenomData.map((cashDenom, idx) => {
      return {
        note_id: cashDenom.Id,
        denominator: parseInt(outDenominators[idx]) || 0,
        totalAmount: cashOutTransactionTotal[idx],
      };
    });
    setCashOutDenomArray(postData);
  }, [outDenominators, cashOutTransactionTotal]);

  return {
    loading,
    cashDenomData,
    inDenominators,
    outDenominators,
    cashInTransactionTotal,
    cashOutTransactionTotal,
    cashInTransactionGrandTotal,
    cashOutTransactionGrandTotal,
    handleInDenominatorChange,
    handleOutDenominatorChange,
    form,
    handleSubmit,
    handleAccountFormSubmit,
    visibleBlock,
    successMessage,
    showLedger,
    handleSeeSpecimen,
    photoLink,
    signatureLink,
  };
};
