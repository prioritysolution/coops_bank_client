"use client";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useForm, useWatch } from "react-hook-form";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  getAccountDetailsByAccountNoAPI,
  getAccountListAPI,
  getAccountSpecimenAPI,
  postDepositAPI,
} from "./DepositApis";
import { format } from "date-fns";
import { getSearchAccountData } from "./DepositReducer";

export const useDeposit = () => {
  const dispatch = useDispatch();

  const orgId = getSessionStorageData("orgId");
  const finId = getSessionStorageData("finId");
  const branchId = getSessionStorageData("userBranchId");

  const [loading, setLoading] = useState("");
  const [visibleBlock, setVisibleBlock] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [depositProduct, setDepositProduct] = useState(null);
  const [showLedger, setShowLedger] = useState(false);

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
    lastDepositDate: yup.string().required("Last deposit date is required"),
    lastDepositAmount: yup.string().required("Last deposit amount is required"),
    installmentAmount: yup.string().required("Installment amount is required"),
    maturityDate: yup.string().required("Maturity date is required"),
    maturityAmount: yup.string().required("Maturity amount is required"),
    availableBalance: yup.string(),
    rateOfInterest: yup.string(),
    Inst_No: yup.string(),
    Pending_Amt: yup.string(),
    Oper_Mode: yup.string(),
    depositDate: yup.string().required("Deposit date is required"),
    depositAmount: yup.string().required("Deposit amount is required"),
    fineAmount: yup.string(),
    totalAmount: yup.string(),
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
      lastDepositDate: null,
      lastDepositAmount: "",
      installmentAmount: "",
      maturityDate: null,
      maturityAmount: "",
      availableBalance: "",
      rateOfInterest: "",
      Inst_No: "",
      Pending_Amt: "",
      Oper_Mode: "",
      depositDate: "",
      depositAmount: 0,
      fineAmount: 0,
      totalAmount: "",
      joint1: "",
      joint2: "",
      transMode: "cash",
    },
  });

  const { control } = form;

  const { depositAmount, fineAmount } = useWatch({ control });

  const handleSubmit = async (values) => {
    postDepositApiCall(values);
  };

  const handleAccountFormSubmit = (values) => {
    getAccountDetailsByAccountNoApiCall(values);
    form.setValue("depositDate", format(values.date, "dd-MM-yyyy"));
  };

  const postDepositApiCall = async (item) => {
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
      member_id: depositProduct.Mem_Id,
      account_id: depositProduct.Acct_Id,
      trans_date: format(Date(item.depositDate), "yyyy-MM-dd"),
      pamount: item.depositAmount,
      fine_amt: item.fineAmount,
      cash_details: cashDetails,
      sb_id: null,
      bank_id: null,
      branch_id: branchId,
      fin_id: finId,
      org_id: orgId,
    };

    setLoading(true);

    try {
      const res = await postDepositAPI(data);

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

  const getAccountListApiCall = async (type, value) => {
    setLoading(true);

    try {
      const res = await getAccountListAPI(orgId, type, value);
      if (res.message === "Data Found") {
        dispatch(getSearchAccountData(res.details));
      } else {
        dispatch(getSearchAccountData([]));
      }
      console.log(res);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      dispatch(getSearchAccountData([]));
    } finally {
      setLoading(false);
    }
  };

  const getAccountDetailsByAccountNoApiCall = async (item) => {
    setLoading(true);

    let data = {
      pAcct_No: item.accountNo,
      ptype: "D",
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
          "lastDepositDate",
          res.details[0].Last_Date
            ? format(res.details[0].Last_Date, "dd-MM-yyyy")
            : ""
        );
        form.setValue("lastDepositAmount", res.details[0].Last_Amt);
        form.setValue("installmentAmount", res.details[0].Installment_Amount);
        form.setValue(
          "maturityDate",
          format(res.details[0].Maturity_Date, "dd-MM-yyyy")
        );
        form.setValue("maturityAmount", res.details[0].Maturity_Amount);
        form.setValue("availableBalance", res.details[0].Avail_Bal);
        form.setValue("rateOfInterest", res.details[0].ROI);
        form.setValue("depositAmount", res.details[0].Pending_Amt);
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
        form.setValue("lastDepositDate", "");
        form.setValue("lastDepositAmount", "");
        form.setValue("installmentAmount", "");
        form.setValue("maturityDate", "");
        form.setValue("maturityAmount", "");
        form.setValue("availableBalance", "");
        form.setValue("rateOfInterest", "");
        form.setValue("depositAmount", "");
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
      form.setValue("lastDepositDate", "");
      form.setValue("lastDepositAmount", "");
      form.setValue("installmentAmount", "");
      form.setValue("maturityDate", "");
      form.setValue("maturityAmount", "");
      form.setValue("availableBalance", "");
      form.setValue("rateOfInterest", "");
      form.setValue("depositAmount", "");
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

  useEffect(() => {
    form.setValue("totalAmount", Number(depositAmount) + Number(fineAmount));
  }, [depositAmount, fineAmount]);

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
    getAccountListApiCall,
  };
};
