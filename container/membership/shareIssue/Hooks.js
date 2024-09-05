"use client";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useForm, useWatch } from "react-hook-form";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { yupResolver } from "@hookform/resolvers/yup";
import { getShareIssueDataByIdAPI, postShareIssueAPI } from "./ShareIssueApis";
import { format } from "date-fns";

export const useShareIssue = () => {
  const startDate = useSelector(
    (state) => state?.footer?.footerData?.Start_Date
  );

  const endDate = useSelector((state) => state?.footer?.footerData?.End_Date);

  const orgId = getSessionStorageData("orgId");
  const finId = getSessionStorageData("finId");
  const branchId = getSessionStorageData("userBranchId");

  const [loading, setLoading] = useState("");
  const [visibleBlock, setVisibleBlock] = useState(false);
  const [memberProduct, setMemberProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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
    address: yup.string().required("Address is required"),
    mobile: yup.string().required("Mobile no. is required"),
    ledgerFolio: yup.string().required("Ledger folio is required"),
    availableBal: yup.string().required("Available balance is required"),
    date: yup
      .date()
      .required("Admission date is required")
      .test(
        "is-between",
        "Date must be between financial start and end date",
        function (value) {
          if (!value) return false;
          return (
            format(value, "yyyy-MM-dd") >= startDate &&
            format(value, "yyyy-MM-dd") <= endDate
          );
        }
      ),
    noOfShare: yup.string().required("No. of share is required"),
    ratePerShare: yup.string().required("Rate per share is required"),
    totalAmt: yup.string().required("Total amount is required"),
    voucherMode: yup.string().required("Transanction mode is required"),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      memberNo: "",
      cifNo: "",
      memberName: "",
      gurdianName: "",
      address: "",
      mobile: "",
      ledgerFolio: "",
      availableBal: "",
      date: null,
      noOfShare: "",
      ratePerShare: "",
      totalAmt: "",
      voucherMode: "cash",
    },
  });

  const { control } = form;

  const { ratePerShare, noOfShare } = useWatch({
    control,
  });

  const handleSubmit = (values) => {
    postShareIssueApiCall(values);
  };

  const handleMemberFormSubmit = (values) => {
    let data = {
      org_id: orgId,
      mem_no: values.memberNo,
      date: new Date().toISOString().slice(0, 10),
    };

    getShareIssueDataByIdApiCall(data);
  };

  const postShareIssueApiCall = async (item) => {
    const cashDetails = cashInDenomArray.map((inItem, idx) => {
      return {
        note_id: inItem.note_id,
        in_qnty: inItem.denominator,
        out_qnty: cashOutDenomArray.filter(
          (outItem) => inItem.note_id === outItem.note_id
        )[0].denominator,
        tot_amount: cashInTransactionTotal[idx] - cashOutTransactionTotal[idx],
      };
    });
    let data = {
      trans_date: item.date.toISOString().slice(0, 10),
      share_id: memberProduct.Share_Id,
      mem_id: item.memberNo,
      share_gl: memberProduct.Share_Gl,
      no_share: item.noOfShare,
      share_rate: item.ratePerShare,
      ledg_fol: item.ledgerFolio,
      tot_amt: item.totalAmt,
      cash_details: cashDetails,
      branch_id: branchId,
      fin_id: finId,
      org_id: orgId,
      sb_id: null,
      bank_id: null,
    };
    setLoading(true);
    try {
      const res = await postShareIssueAPI(data);
      if (res.message === "Success") {
        setSuccessMessage(res.details);
        form.reset();
        const defaultDenominators = Array(cashDenomData.length).fill("");
        setInDenominators(defaultDenominators);
        setOutDenominators(defaultDenominators);
      } else {
        toast.error(res.details);
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      setSuccessMessage(null);
    } finally {
      setLoading(false);
    }
  };

  const getShareIssueDataByIdApiCall = async (data) => {
    setLoading(true);
    try {
      const res = await getShareIssueDataByIdAPI(data);
      if (res.message === "Data Found") {
        setVisibleBlock(true);
        setMemberProduct(res.details[0]);
        form.setValue("memberNo", res.details[0].Member_No);
        form.setValue("cifNo", res.details[0].CIF_No);
        form.setValue("memberName", res.details[0].Full_Name);
        form.setValue("gurdianName", res.details[0].Relation_Name);
        form.setValue("address", res.details[0].Address);
        form.setValue("mobile", res.details[0].Mem_Mob);
        form.setValue("availableBal", res.details[0].Balance);
        form.setValue("ratePerShare", res.details[0].Share_Rate);
        form.setValue("ledgerFolio", res.details[0].Ledg_fol);
      } else {
        setVisibleBlock(false);
        setMemberProduct(null);
        form.setValue("memberNo", "");
        form.setValue("cifNo", "");
        form.setValue("memberName", "");
        form.setValue("gurdianName", "");
        form.setValue("address", "");
        form.setValue("mobile", "");
        form.setValue("availableBal", "");
        form.setValue("ratePerShare", "");
        form.setValue("ledgerFolio", "");
        toast.error(res.details);
      }
    } catch (error) {
      setVisibleBlock(false);
      toast.error("Something went wrong");
      console.error(error);
      setMemberProduct(null);
      form.setValue("memberNo", "");
      form.setValue("cifNo", "");
      form.setValue("memberName", "");
      form.setValue("gurdianName", "");
      form.setValue("address", "");
      form.setValue("mobile", "");
      form.setValue("availableBal", "");
      form.setValue("ratePerShare", "");
      form.setValue("ledgerFolio", "");
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

  useEffect(() => {
    if (ratePerShare && noOfShare) {
      let total = Number(ratePerShare) * Number(noOfShare);
      form.setValue("totalAmt", total);
    } else {
      form.setValue("totalAmt", "");
    }
  }, [ratePerShare, noOfShare]);

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
    handleMemberFormSubmit,
    visibleBlock,
    successMessage,
  };
};
