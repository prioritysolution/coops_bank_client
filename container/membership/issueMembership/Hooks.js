"use client";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getCashDenomAPI,
  getMemberDataByIdAPI,
  getMemberDataByNameAPI,
  getMemberProductDataAPI,
  postIssueMembershipAPI,
} from "./IssueMembershipApis";
import {
  getMemberDataByName,
  getNoteDenomData,
} from "./IssueMembershipReducer";
import toast from "react-hot-toast";
import { useForm, useWatch } from "react-hook-form";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";

export const useIssueMembership = () => {
  const dispatch = useDispatch();

  const startDate = useSelector(
    (state) => state?.footer?.footerData?.Start_Date
  );

  const endDate = useSelector((state) => state?.footer?.footerData?.End_Date);

  const orgId = getSessionStorageData("orgId");
  const finId = getSessionStorageData("finId");
  const branchId = getSessionStorageData("userBranchId");

  const [loading, setLoading] = useState("");
  const [visibleBlock, setVisibleBlock] = useState(false);
  const [admissionDisable, setAdmissionDisable] = useState(true);
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
    admissionNo: yup.string().required("Admission no. is required"),
    ledgerFolio: yup.string().required("Ledger folio is required"),
    admissionFees: yup.string().required("Admission Fees is required"),
    memberType: yup.string().required("Member type is required"),
    noOfShare: yup.string().required("No. of share is required"),
    ratePerShare: yup.string().required("Rate per share is required"),
    totalAmt: yup.string().required("Total amount is required"),
    nomineeName: yup.string().required("Nominee name is required"),
    nomineeRelation: yup.string().required("Nominee relation is required"),
    nomineeAddress: yup.string().required("Nominee address is required"),
    nomineeAge: yup.string().required("Nominee age is required"),
    transMode: yup.string().required("Transanction mode is required"),
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
      date: null,
      admissionNo: "",
      ledgerFolio: "",
      admissionFees: "",
      memberType: "",
      noOfShare: "",
      ratePerShare: "",
      totalAmt: "",
      nomineeName: "",
      nomineeRelation: "",
      nomineeAddress: "",
      nomineeAge: "",
      transMode: "cash",
    },
  });

  const { control } = form;

  const { memberType, ratePerShare, admissionFees, noOfShare, transMode } =
    useWatch({
      control,
    });

  const handleSubmit = (values) => {
    postIssueMembershipApiCall(values);
  };

  const handleMemberFormSubmit = (values) => {
    getMemberDataByIdApiCall(orgId, values.memberNo);
  };

  const postIssueMembershipApiCall = async (item) => {
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
      member_id: item.memberNo,
      admm_No: item.admissionNo,
      ledg_fol: item.ledgerFolio,
      adm_fees: item.admissionFees,
      mem_type: item.memberType,
      nomin_name: item.nomineeName,
      nom_add: item.nomineeAddress,
      nom_rel: item.nomineeRelation,
      nom_age: item.nomineeAge,
      no_of_share: item.noOfShare,
      share_rate: item.ratePerShare,
      share_amt:
        item.ratePerShare &&
        item.noOfShare &&
        Number(item.ratePerShare) * Number(item.noOfShare),
      tot_amt: item.totalAmt,
      adm_gl: memberProduct[0].Admis_GL,
      share_gl: memberProduct[0].Share_GL,
      cash_details: cashDetails,
      branch_id: branchId,
      fin_id: finId,
      org_id: orgId,
      sb_id: null,
      bank_id: null,
    };
    setLoading(true);
    try {
      const res = await postIssueMembershipAPI(data);
      if (res.message === "Success") {
        setSuccessMessage(res.details);
      } else {
        toast.error(res.details);
        setSuccessMessage(null);
      }
      form.reset();
      const defaultDenominators = Array(cashDenomData.length).fill("");
      setInDenominators(defaultDenominators);
      setOutDenominators(defaultDenominators);
      setVisibleBlock(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      setSuccessMessage(null);
    } finally {
      setLoading(false);
    }
  };

  const getMemberDataByIdApiCall = async (orgId, memberNo) => {
    setLoading(true);
    try {
      const res = await getMemberDataByIdAPI(orgId, memberNo);
      if (res.message === "Data Found") {
        setVisibleBlock(true);
        form.setValue("memberNo", res.details[0].Id);
        form.setValue("cifNo", res.details[0].CIF_No);
        form.setValue("memberName", res.details[0].Full_Name);
        form.setValue("gurdianName", res.details[0].Relation_Name);
        form.setValue("address", res.details[0].Address);
        form.setValue("mobile", res.details[0].Mem_Mob);
      } else {
        setVisibleBlock(false);
        form.setValue("memberNo", "");
        form.setValue("cifNo", "");
        form.setValue("memberName", "");
        form.setValue("gurdianName", "");
        form.setValue("address", "");
        form.setValue("mobile", "");
        toast.error(res.details);
      }
    } catch (error) {
      setVisibleBlock(false);
      toast.error("Something went wrong");
      console.error(error);
      form.setValue("memberNo", "");
      form.setValue("cifNo", "");
      form.setValue("memberName", "");
      form.setValue("gurdianName", "");
      form.setValue("address", "");
      form.setValue("mobile", "");
    } finally {
      setLoading(false);
    }
  };

  const getMemberDataByNameApiCall = async (orgId, name) => {
    setLoading(true);
    try {
      const res = await getMemberDataByNameAPI(orgId, name);
      if (res.message === "Data Found") {
        dispatch(getMemberDataByName(res.details));
      } else {
        dispatch(getMemberDataByName([]));
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      dispatch(getMemberDataByName([]));
    } finally {
      setLoading(false);
    }
  };

  const getMemberProductDataApiCall = async (orgId, typeId) => {
    setLoading(true);
    try {
      const res = await getMemberProductDataAPI(orgId, typeId);
      if (res.message === "Data Found") {
        setAdmissionDisable(false);
        setMemberProduct(res.details);
        form.setValue("admissionFees", res.details[0].Adm_Amt);
        form.setValue("ratePerShare", res.details[0].Share_Amt);
      } else {
        setAdmissionDisable(true);
        setMemberProduct(null);
        form.setValue("admissionFees", "");
        form.setValue("ratePerShare", "");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      setMemberProduct(null);
      setAdmissionDisable(true);
      form.setValue("admissionFees", "");
      form.setValue("ratePerShare", "");
    } finally {
      setLoading(false);
    }
  };

  //note denom get api call
  const getNoteDenomApiCall = async () => {
    setLoading(true);
    try {
      const res = await getCashDenomAPI();
      if (res.message === "Data Found") {
        dispatch(getNoteDenomData(res.details));
      } else {
        dispatch(getNoteDenomData([]));
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      dispatch(getNoteDenomData([]));
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
    if (memberType) getMemberProductDataApiCall(orgId, memberType);
  }, [memberType]);

  useEffect(() => {
    if (ratePerShare && admissionFees && noOfShare) {
      let total =
        Number(admissionFees) + Number(ratePerShare) * Number(noOfShare);
      form.setValue("totalAmt", total);
    } else {
      form.setValue("totalAmt", "");
    }
  }, [ratePerShare, admissionFees, noOfShare]);

  return {
    loading,
    cashDenomData,
    inDenominators,
    outDenominators,
    cashInTransactionTotal,
    cashOutTransactionTotal,
    cashInTransactionGrandTotal,
    cashOutTransactionGrandTotal,
    getNoteDenomApiCall,
    handleInDenominatorChange,
    handleOutDenominatorChange,
    form,
    handleSubmit,
    getMemberDataByIdApiCall,
    getMemberDataByNameApiCall,
    handleMemberFormSubmit,
    visibleBlock,
    admissionDisable,
    successMessage,
    transMode,
  };
};
