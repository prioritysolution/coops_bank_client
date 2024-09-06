"use client";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useForm, useWatch } from "react-hook-form";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import {
  getDepositCloseAccountAPI,
  getDepositMatureAccountAPI,
  getDepositMaturityBonusInterestAPI,
  getDepositMaturityInterestAPI,
  postDepositCloseAccountAPI,
  postDepositMatureAccountAPI,
} from "./MatureApis";
import { getSpecimenAPI } from "../withdrawn/WithdrawnApis";
import { useDeposit } from "../deposit/Hooks";
import { getAccountDetailsByAccountNoAPI } from "../deposit/DepositApis";

export const useMature = () => {
  const orgId = getSessionStorageData("orgId");
  const finId = getSessionStorageData("finId");
  const branchId = getSessionStorageData("userBranchId");

  const { getAccountListApiCall } = useDeposit();

  const [loading, setLoading] = useState("");
  const [visibleBlock, setVisibleBlock] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [depositProduct, setDepositProduct] = useState(null);
  const [showLedger, setShowLedger] = useState(false);
  const [photoLink, setPhotoLink] = useState(null);
  const [signatureLink, setSignatureLink] = useState(null);
  const [disableOperationTypeForm, setDisableOperationTypeForm] =
    useState(false);
  const [showSearchAccountForm, setShowSearchAccountForm] = useState(false);
  const [dialougeOpen, setDialougeOpen] = useState(false);
  const [savingsAccountFullName, setSavingsAccountFullName] = useState(null);
  const [savingsAccountBalance, setSavingsAccountBalance] = useState(null);
  const [showMatureDialog, setShowMatureDialog] = useState(false);
  const [showBonusDialog, setShowBonusDialog] = useState(false);

  const [bonusInterestInput, setBonusInterestInput] = useState(false);

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
    rateOfInterest: yup.string(),
    maturityDate: yup.string(),
    maturityAmount: yup.string(),
    availableBalance: yup.string(),
    closeDate: yup.string().required("Close date is required"),
    amount: yup.string().required("Amount is required"),
    interest: yup.string(),
    bonusInterest: yup.string(),
    totalAmount: yup.string(),
    Joint_1: yup.string(),
    Joint_2: yup.string(),
    transMode: yup.string().required("Transanction mode is required"),
    savingsAccountNo: yup.string(),
  });

  const optionFormSchema = yup.object({
    operationType: yup.string().required("Operation type is required"),
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
      rateOfInterest: "",
      maturityDate: "",
      maturityAmount: "",
      availableBalance: "",
      closeDate: null,
      amount: "",
      interest: "",
      bonusInterest: "",
      totalAmount: "",
      Joint_1: "",
      Joint_2: "",
      transMode: "cash",
      savingsAccountNo: "",
    },
  });

  const optionForm = useForm({
    resolver: yupResolver(optionFormSchema),
    defaultValues: {
      operationType: "close",
    },
  });

  const { control } = form;
  const { transMode, amount, interest, bonusInterest } = useWatch({ control });

  const { operationType } = useWatch({ control: optionForm.control });

  const handleSubmit = async (values) => {
    operationType === "close"
      ? postDepositCloseAccountApiCall(values)
      : postDepositMatureAccountApiCall(values);
  };

  const handleAccountFormSubmit = (values) => {
    if (operationType === "close") {
      getAccountDetailsByAccountNoApiCall(values);
    } else {
      getMatureAccountDetailsByAccountNoApiCall(values);
    }
    form.setValue("closeDate", format(values.date, "dd-MM-yyyy"));
  };

  const handleOptionFormSubmit = () => {
    setShowSearchAccountForm(true);
    setDisableOperationTypeForm(true);
  };

  const handleSeeSpecimen = () => {
    getSpecimenApiCall(orgId, depositProduct.Acct_Id);
  };

  const handleSearchAccountListByMemberNo = () => {
    if (form.getValues("dialougeMemberNo"))
      getAccountListApiCall(2, form.getValues("dialougeMemberNo"));
    else toast.error("Please enter member no.");
  };

  const handleSearchAccountListByName = () => {
    if (form.getValues("dialougeAccountName"))
      getAccountListApiCall(1, form.getValues("dialougeAccountName"));
    else toast.error("Please enter name");
  };

  const handleSelectClick = (data) => {
    form.setValue("savingsAccountNo", data.Account_No);
    setDialougeOpen(false);
  };

  const handleFetchData = () => {
    if (form.getValues("savingsAccountNo")) {
      getSavingsAccountDetailsByAccountNoApiCall(
        form.getValues("savingsAccountNo"),
        form.getValues("closeDate")
      );
    } else {
      toast.error("Enter a valid account number.");
    }
  };

  const handleCancelPremature = () => {
    form.reset();
    const defaultDenominators = Array(cashDenomData.length).fill("");
    setInDenominators(defaultDenominators);
    setOutDenominators(defaultDenominators);
    setShowMatureDialog(false);
    setVisibleBlock(false);
  };

  const postDepositCloseAccountApiCall = async (item) => {
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
      trans_date: format(Date(item.closeDate), "yyyy-MM-dd"),
      intt_amt: item.interest | 0,
      cash_details: cashDetails,
      sb_id: null,
      bank_id: null,
      branch_id: branchId,
      fin_id: finId,
      org_id: orgId,
    };

    setLoading(true);

    try {
      const res = await postDepositCloseAccountAPI(data);

      if (res.message === "Success") {
        setSuccessMessage(res.details);
        optionForm.reset();
        form.reset();
        const defaultDenominators = Array(cashDenomData.length).fill("");
        setInDenominators(defaultDenominators);
        setOutDenominators(defaultDenominators);
        // toast.success(res.details || res.message);
        setDisableOperationTypeForm(false);
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

  const postDepositMatureAccountApiCall = async (item) => {
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
      trans_date: format(Date(item.closeDate), "yyyy-MM-dd"),
      account_id: depositProduct.Acct_Id,
      member_id: depositProduct.Mem_Id,
      principal_amt: item.amount,
      intt_amt: item.interest,
      bonus_amt: item.bonusInterest | "",
      bonus_rate: bonusInterestInput | "",
      cash_details: cashDetails,
      sb_id: null,
      bank_id: null,
      branch_id: branchId,
      fin_id: finId,
      org_id: orgId,
    };

    setLoading(true);

    try {
      const res = await postDepositMatureAccountAPI(data);

      if (res.message === "Success") {
        setSuccessMessage(res.details);
        optionForm.reset();
        form.reset();
        const defaultDenominators = Array(cashDenomData.length).fill("");
        setInDenominators(defaultDenominators);
        setOutDenominators(defaultDenominators);
        // toast.success(res.details || res.message);
        setDisableOperationTypeForm(false);
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

  const getSavingsAccountDetailsByAccountNoApiCall = async (
    accountNo,
    date
  ) => {
    setLoading(true);

    let data = {
      pAcct_No: accountNo,
      ptype: "C",
      date: format(date, "yyyy-MM-dd"),
      org_id: orgId,
    };

    try {
      const res = await getAccountDetailsByAccountNoAPI(data);
      if (res.message === "Data Found") {
        setSavingsAccountFullName(res.details[0].Full_Name);
        setSavingsAccountBalance(res.details[0].Avail_Bal);
      } else {
        toast.error("Please enter another account");
        setSavingsAccountFullName(null);
        setSavingsAccountBalance(null);
      }
      console.log(res);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      setSavingsAccountFullName(null);
      setSavingsAccountBalance(null);
    } finally {
      setLoading(false);
    }
  };

  const getAccountDetailsByAccountNoApiCall = async (item) => {
    setLoading(true);

    let data = {
      acct_no: item.accountNo,
      date: format(item.date, "yyyy-MM-dd"),
      org_id: orgId,
    };

    try {
      const res = await getDepositCloseAccountAPI(data);
      if (res.message === "Data Found") {
        form.setValue("memberNo", res.details[0].Member_No);
        form.setValue("cifNo", res.details[0].CIF_No);
        form.setValue("memberName", res.details[0].Full_Name);
        form.setValue("gurdianName", res.details[0].Relation_Name);
        form.setValue("mobile", res.details[0].Mem_Mob);
        form.setValue("panNo", res.details[0].Mem_Pan);
        form.setValue("rateOfInterest", res.details[0].ROI);
        form.setValue("availableBalance", res.details[0].Avail_Bal);
        form.setValue("amount", res.details[0].Avail_Bal);
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
        form.setValue("rateOfInterest", "");
        form.setValue("availableBalance", "");
        form.setValue("amount", "");
        form.setValue("joint1", "");
        form.setValue("joint2", "");
        setDepositProduct(null);
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
      form.setValue("rateOfInterest", "");
      form.setValue("availableBalance", "");
      form.setValue("amount", "");
      form.setValue("joint1", "");
      form.setValue("joint2", "");
      setDepositProduct(null);
      setVisibleBlock(false);
      setShowLedger(false);
    } finally {
      setLoading(false);
    }
  };

  const getMatureAccountDetailsByAccountNoApiCall = async (item) => {
    setLoading(true);

    let data = {
      acct_no: item.accountNo,
      date: format(item.date, "yyyy-MM-dd"),
      org_id: orgId,
    };

    try {
      const res = await getDepositMatureAccountAPI(data);
      if (res.message === "Data Found") {
        form.setValue("memberNo", res.details[0].Member_No);
        form.setValue("cifNo", res.details[0].CIF_No);
        form.setValue("memberName", res.details[0].Full_Name);
        form.setValue("gurdianName", res.details[0].Relation_Name);
        form.setValue("mobile", res.details[0].Mem_Mob);
        form.setValue("panNo", res.details[0].Mem_Pan);
        form.setValue("rateOfInterest", res.details[0].ROI);
        form.setValue("maturityDate", res.details[0].Maturity_Date);
        form.setValue("maturityAmount", res.details[0].Maturity_Amount);
        form.setValue("availableBalance", res.details[0].Avail_Bal);
        form.setValue("amount", res.details[0].Avail_Bal);
        form.setValue("joint1", res.details[0].Joint_1);
        form.setValue("joint2", res.details[0].Joint_2);

        if (
          res.details[0].Maturity_Date > item.date.toISOString().slice(0, 10)
        ) {
          setShowMatureDialog(true);
        }

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
        form.setValue("rateOfInterest", "");
        form.setValue("maturityDate", "");
        form.setValue("maturityAmount", "");
        form.setValue("availableBalance", "");
        form.setValue("amount", "");
        form.setValue("joint1", "");
        form.setValue("joint2", "");
        setDepositProduct(null);
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
      form.setValue("rateOfInterest", "");
      form.setValue("maturityDate", "");
      form.setValue("maturityAmount", "");
      form.setValue("availableBalance", "");
      form.setValue("amount", "");
      form.setValue("joint1", "");
      form.setValue("joint2", "");
      setDepositProduct(null);
      setVisibleBlock(false);
      setShowLedger(false);
    } finally {
      setLoading(false);
    }
  };

  const getDepositMaturityInterestApiCall = async (value) => {
    setLoading(true);

    let data = {
      acct_id: depositProduct.Acct_Id,
      date: format(form.getValues("closeDate"), "yyyy-MM-dd"),
      org_id: orgId,
    };

    try {
      const res = await getDepositMaturityInterestAPI(data);
      if (res.message === "Data Found") {
        form.setValue("interest", res.details);
        setShowBonusDialog(true);
      } else {
        toast.error(res.details || res.message);
        form.setValue("interest", "");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      form.setValue("interest", "");
    } finally {
      setLoading(false);
    }
  };

  const getDepositMaturityBonusInterestApiCall = async (roi) => {
    setLoading(true);

    let data = {
      acct_id: depositProduct.Acct_Id,
      date: format(form.getValues("closeDate"), "yyyy-MM-dd"),
      roi,
      org_id: orgId,
    };

    try {
      const res = await getDepositMaturityBonusInterestAPI(data);
      if (res.message === "Data Found") {
        form.setValue("bonusInterest", res.details);
        setShowBonusDialog(false);
        setBonusInterestInput(roi);
      } else {
        toast.error(res.details || res.message);
        form.setValue("bonusInterest", "");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      form.setValue("bonusInterest", "");
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
    if (amount && interest && bonusInterest) {
      let totalAmount =
        Number(amount) + Number(interest) + Number(bonusInterest);
      form.setValue("totalAmount", totalAmount);
    } else {
      form.setValue("totalAmount", "");
    }
  }, [amount, interest, bonusInterest]);

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
    optionForm,
    handleOptionFormSubmit,
    showSearchAccountForm,
    disableOperationTypeForm,
    transMode,
    handleSearchAccountListByMemberNo,
    handleSearchAccountListByName,
    handleSelectClick,
    dialougeOpen,
    setDialougeOpen,
    handleFetchData,
    savingsAccountFullName,
    savingsAccountBalance,
    showMatureDialog,
    setShowMatureDialog,
    handleCancelPremature,
    getDepositMaturityInterestApiCall,
    getDepositMaturityBonusInterestApiCall,
    showBonusDialog,
    setShowBonusDialog,
  };
};
