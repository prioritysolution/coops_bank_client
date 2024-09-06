"use client";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useForm, useWatch } from "react-hook-form";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDays, addMonths, addYears, format } from "date-fns";
import { getMemberDataByIdAPI } from "@/container/membership/issueMembership/IssueMembershipApis";
import {
  checkDepositAmountAPI,
  checkDepositDurationAPI,
  getDepositAccountTypeDataAPI,
  getDepositProductDataAPI,
  getDepositAgentDataAPI,
  getDepositEcsAccountAPI,
  getDepositMaturityAmountAPI,
  getDepositPayoutAmountAPI,
  getOpenDepositAccountDataAPI,
  postOpenDepositAccountAPI,
  getDepositInterestRateAPI,
} from "./OpenDepositAccountApis";
import {
  getDepositAccountTypeData,
  getDepositAgentData,
  getDepositProductData,
  getDurationTypeData,
  getMaturityInstructionData,
  getOperationModeData,
  getPayoutModeData,
} from "./OpenDepositAccountReducer";
import axios from "axios";

export const useOpenDepositAccount = () => {
  const dispatch = useDispatch();

  const startDate = useSelector(
    (state) => state?.footer?.footerData?.Start_Date
  );

  const endDate = useSelector((state) => state?.footer?.footerData?.End_Date);

  const productData = useSelector(
    (state) => state?.openDepositAccount?.depositProductData
  );

  const orgId = getSessionStorageData("orgId");
  const finId = getSessionStorageData("finId");
  const branchId = getSessionStorageData("userBranchId");

  const [loading, setLoading] = useState("");
  const [visibleBlock, setVisibleBlock] = useState(false);
  const [depositMember, setDepositMember] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [checkDepositAmountDisable, setCheckDepositAmountDisable] =
    useState(true);
  const [checkDepositAmountMessage, setCheckDepositAmountMessage] =
    useState("");
  const [checkDepositDurationDisable, setCheckDepositDurationDisable] =
    useState(false);
  const [checkDepositDurationMessage, setCheckDepositDurationMessage] =
    useState("");

  const [jointMemberDialougeOpen, setJointMemberDialougeOpen] = useState(false);
  const [deleteJointMemberDialougeOpen, setDeleteJointMemberDialougeOpen] =
    useState(false);

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
    voterId: yup.string().required("Voter id is required"),
    aadhaarNo: yup.string().required("Aadhaar no. is required"),
    panNo: yup.string().required("Pan no. is required"),
    accountType: yup.string().required("Account type is required"),
    depositProduct: yup.string().required("Deposit product is required"),
    openingDate: yup
      .date()
      .required("Opening date is required")
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
    accountNo: yup.number().required("Account no. is required"),
    ledgerFolio: yup.string().required("Ledger Folio is required"),
    openingAmount: yup.string().required("Opening amount is required"),
    rateOfInterest: yup.string(),
    duration: yup.string(),
    durationUnit: yup.string(),
    maturityDate: yup.string(),
    maturityAmount: yup.string(),
    maturityInstruction: yup.string(),
    operationMode: yup.string(),
    isAvailEcs: yup.boolean(),
    ecsAccount: yup.string(),
    isPayoutInterest: yup.boolean(),
    payoutMode: yup.string(),
    payoutAmount: yup.string(),
    agentId: yup.string(),
    jointHolderDetails: yup
      .array()
      .test(
        "min-1-child-if-operationMode-is-not-70",
        "At least one member is required",
        function (value) {
          const { operationMode } = this.parent;
          if (
            operationMode &&
            operationMode !== "70" &&
            (!value || value.length < 1)
          ) {
            return false; // Validation fails if anotherField is 1 and members array has less than 1 item
          }
          return true; // Validation passes otherwise
        }
      ),
    nomineeName: yup.string().required("Nominee name is required"),
    nomineeRelation: yup.string().required("Nominee relation is required"),
    nomineeAddress: yup.string().required("Nominee address is required"),
    nomineeAge: yup.string().required("Nominee age is required"),
    photo: yup.mixed(),
    signature: yup.mixed(),
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
      voterId: "",
      aadhaarNo: "",
      panNo: "",
      accountType: "",
      depositProduct: "",
      openingDate: null,
      accountNo: "",
      ledgerFolio: "",
      openingAmount: "",
      rateOfInterest: "",
      duration: "",
      durationUnit: "",
      maturityDate: "",
      maturityAmount: "",
      maturityInstruction: "",
      operationMode: "",
      isAvailEcs: false,
      ecsAccount: "",
      isPayoutInterest: false,
      payoutMode: "",
      payoutAmount: "",
      agentId: "",
      jointHolderDetails: [],
      nomineeName: "",
      nomineeRelation: "",
      nomineeAddress: "",
      nomineeAge: "",
      photo: "",
      signature: "",
      transMode: "cash",
    },
  });

  const { control } = form;

  const {
    accountType,
    depositProduct,
    openingDate,
    openingAmount,
    duration,
    durationUnit,
    payoutMode,
    rateOfInterest,
    operationMode,
    isAvailEcs,
  } = useWatch({
    control,
  });

  const handleSubmit = async (values) => {
    postOpenDepositApiCall(values);
  };

  const handleMemberFormSubmit = (values) => {
    getMemberDataByIdApiCall(orgId, values.memberNo);
  };

  const handleJointAccountAdd = (values) => {
    if (form.getValues("jointHolderDetails").length < 2) {
      if (
        form
          .getValues("jointHolderDetails")
          .filter((item) => item.Id === values.Id).length === 0
      ) {
        const currentMembers = form.getValues("jointHolderDetails") || [];
        form.setValue("jointHolderDetails", [...currentMembers, values]);
        setJointMemberDialougeOpen(false);
        // Clear the input
      } else {
        toast.error("Member already added");
      }
    } else {
      toast.error("Please remove a member first");
    }
  };

  const handleJointAccountDelete = (values) => {
    const newMemberList = form
      .getValues("jointHolderDetails")
      .filter((item) => item.Id !== values);
    form.setValue("jointHolderDetails", [...newMemberList]);
    setDeleteJointMemberDialougeOpen(false);
    // Clear the input
  };

  const postOpenDepositApiCall = async (data) => {
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
    // let data = {
    //   member_id: depositMember.Id,
    //   ref_ac_no: item.accountNo,
    //   ledg_folio: item.ledgerFolio,
    //   open_date: item.openingDate.toISOString().slice(0, 10),
    //   prod_type: item.accountType,
    //   dep_type: productData.filter(
    //     (prod) => prod.Id === Number(item.accountType)
    //   )[0].Deposit_Type,
    //   prod_id: item.accountType,
    //   oper_mode: item.operationMode,
    //   proi: item.rateOfInterest,
    //   pamount: item.openingAmount,
    //   duration: item.duration,
    //   dur_unit: item.durationUnit,
    //   matur_ins: item.maturityInstruction,
    //   matur_date: item.maturityDate.toISOString().slice(0, 10),
    //   matur_amt: item.maturityAmount,
    //   nom_name: item.nomineeName,
    //   nom_rel: item.nomineeRelation,
    //   nom_add: item.nomineeAddress,
    //   nom_age: item.nomineeAge,
    //   joint_hld1:
    //     item.jointHolderDetails.length > 0 ? item.jointHolderDetails[0] : null,
    //   joint_hld2:
    //     item.jointHolderDetails.length > 1 ? item.jointHolderDetails[1] : null,
    //   ecs_avail: item.isAvailEcs,
    //   ecs_ac_id: item.ecsAccount || null,
    //   is_int_payout: item.isPayoutInterest,
    //   pay_mode: item.payoutMode || null,
    //   pay_amt: item.payoutAmount || null,
    //   cbs_ac_no: null,
    //   agent_id: item.agentId,
    //   sb_id: null,
    //   bank_id: null,
    //   spec_image: item.photo || null,
    //   spec_sing: item.signature || null,
    //   cash_details: cashDetails,
    //   branch_id: branchId,
    //   fin_id: finId,
    //   org_id: orgId,
    // };

    // Create a new FormData object
    const formData = new FormData();

    // Append all the form data fields to the FormData object
    formData.append("member_id", depositMember.Id);
    formData.append("ref_ac_no", data.accountNo);
    formData.append("ledg_folio", data.ledgerFolio);
    formData.append("open_date", data.openingDate.toISOString().slice(0, 10));
    formData.append("prod_type", data.accountType);
    formData.append(
      "dep_type",
      productData.find((prod) => prod.Id === Number(data.depositProduct))
        .Deposit_Type
    );
    formData.append("prod_id", data.depositProduct);
    formData.append("oper_mode", data.operationMode);
    formData.append("proi", data.rateOfInterest);
    formData.append("pamount", data.openingAmount);
    formData.append("duration", data.duration);
    formData.append("dur_unit", data.durationUnit);
    formData.append("matur_ins", data.maturityInstruction);
    formData.append(
      "matur_date",
      data.maturityDate
        ? new Date(data.maturityDate).toISOString().slice(0, 10)
        : null
    );
    formData.append("matur_amt", data.maturityAmount);
    formData.append("nom_name", data.nomineeName);
    formData.append("nom_rel", data.nomineeRelation);
    formData.append("nom_add", data.nomineeAddress);
    formData.append("nom_age", data.nomineeAge);
    formData.append(
      "joint_hld1",
      data.jointHolderDetails.length > 0 ? data.jointHolderDetails[0] : null
    );
    formData.append(
      "joint_hld2",
      data.jointHolderDetails.length > 1 ? data.jointHolderDetails[1] : null
    );
    formData.append("ecs_avail", data.isAvailEcs ? 1 : 0);
    formData.append("ecs_ac_id", data.ecsAccount || null);
    formData.append("is_int_payout", data.isPayoutInterest ? 1 : 0);
    formData.append("pay_mode", data.payoutMode || null);
    formData.append("pay_amt", data.payoutAmount || null);
    formData.append("cbs_ac_no", null);
    formData.append("agent_id", data.agentId);
    formData.append("sb_id", null);
    formData.append("bank_id", null);
    formData.append("branch_id", branchId);
    formData.append("fin_id", finId);
    formData.append("org_id", orgId);

    // Append the file fields if they exist
    if (data.photo) {
      formData.append("spec_image", data.photo);
    }
    if (data.signature) {
      formData.append("spec_sing", data.signature);
    }

    // Append the cash details as a JSON string if necessary
    // formData.append("cash_details", JSON.stringify(cashDetails));

    cashDetails.forEach((cashItem, index) => {
      for (let key in cashItem) {
        formData.append(`cash_details[${index}][${key}]`, cashItem[key]);
      }
    });

    setLoading(true);

    try {
      const res = await postOpenDepositAccountAPI(
        formData,
        "multipart/form-data"
      );

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

  const getDepositAccountTypeDataApiCall = async (orgId) => {
    setLoading(true);
    try {
      const res = await getDepositAccountTypeDataAPI(orgId);
      if (res.message === "Data Found") {
        dispatch(getDepositAccountTypeData(res.details));
      } else {
        toast.error(res.details);
        dispatch(getDepositAccountTypeData([]));
      }
    } catch (error) {
      dispatch(getDepositAccountTypeData([]));
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getDepositProductDataApiCall = async (orgId, typeId) => {
    setLoading(true);
    try {
      const res = await getDepositProductDataAPI(orgId, typeId);
      if (res.message === "Data Found") {
        dispatch(getDepositProductData(res.details));
      } else {
        toast.error(res.details);
        dispatch(getDepositProductData([]));
      }
    } catch (error) {
      dispatch(getDepositProductData([]));
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getDurationTypeDataApiCall = async () => {
    setLoading(true);
    try {
      const res = await getOpenDepositAccountDataAPI("DURATIONTYPE");
      if (res.message === "Data Found") {
        dispatch(getDurationTypeData(res.details));
      } else {
        toast.error(res.details);
        dispatch(getDurationTypeData([]));
      }
    } catch (error) {
      dispatch(getDurationTypeData([]));
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getOperationModeDataApiCall = async () => {
    setLoading(true);
    try {
      const res = await getOpenDepositAccountDataAPI("OPERATIONMODE");
      if (res.message === "Data Found") {
        dispatch(getOperationModeData(res.details));
      } else {
        toast.error(res.details);
        dispatch(getOperationModeData([]));
      }
    } catch (error) {
      dispatch(getOperationModeData([]));
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getMaturityInstructionDataApiCall = async () => {
    setLoading(true);
    try {
      const res = await getOpenDepositAccountDataAPI("MATURITYINSTRUCTION");
      if (res.message === "Data Found") {
        dispatch(getMaturityInstructionData(res.details));
      } else {
        toast.error(res.details);
        dispatch(getMaturityInstructionData([]));
      }
    } catch (error) {
      dispatch(getMaturityInstructionData([]));
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getPayoutModeDataApiCall = async () => {
    setLoading(true);
    try {
      const res = await getOpenDepositAccountDataAPI("PAYOUTMODE");
      if (res.message === "Data Found") {
        dispatch(getPayoutModeData(res.details));
      } else {
        toast.error(res.details);
        dispatch(getPayoutModeData([]));
      }
    } catch (error) {
      dispatch(getPayoutModeData([]));
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const checkDepositAmountApiCall = async (orgId) => {
    setLoading(true);
    let data = {
      prod_id: form.getValues("depositProduct"),
      amount: form.getValues("openingAmount"),
      org_id: orgId,
    };

    try {
      const res = await checkDepositAmountAPI(data);
      if (res.message === "Data Found") {
        setCheckDepositAmountDisable(false);
        setCheckDepositAmountMessage("");
        getDepositAgentApiCall(orgId);
      } else {
        setCheckDepositAmountDisable(true);
        setCheckDepositAmountMessage(res.details);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      setCheckDepositAmountDisable(true);
      setCheckDepositAmountMessage("");
    } finally {
      setLoading(false);
    }
  };

  const checkDepositDurationApiCall = async (orgId) => {
    setLoading(true);
    let data = {
      prod_id: form.getValues("depositProduct"),
      duration: form.getValues("duration"),
      duration_unit: form.getValues("durationUnit"),
      org_id: orgId,
    };

    try {
      const res = await checkDepositDurationAPI(data);
      if (res.message === "Data Found") {
        setCheckDepositDurationDisable(false);
        setCheckDepositDurationMessage("");
        if (form.getValues("openingDate")) {
          if (form.getValues("durationUnit") === "17")
            form.setValue(
              "maturityDate",
              addDays(
                form.getValues("openingDate"),
                Number(form.getValues("duration"))
              )
            );
          else if (form.getValues("durationUnit") === "18")
            form.setValue(
              "maturityDate",
              addMonths(
                form.getValues("openingDate"),
                Number(form.getValues("duration"))
              )
            );
          else if (form.getValues("durationUnit") === "19")
            form.setValue(
              "maturityDate",
              addYears(
                form.getValues("openingDate"),
                Number(form.getValues("duration"))
              )
            );
        }
        toast.success(res.details);
      } else {
        setCheckDepositDurationDisable(true);
        setCheckDepositDurationMessage(res.details);
        form.setValue("maturityDate", null);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      setCheckDepositDurationDisable(true);
      setCheckDepositDurationMessage("");
      form.setValue("maturityDate", null);
    } finally {
      setLoading(false);
    }
  };

  const getDepositInterestRateApiCall = async (orgId) => {
    setLoading(true);
    let data = {
      prod_id: form.getValues("depositProduct"),
      duration: form.getValues("duration") | 0,
      dur_unit: form.getValues("durationUnit") | 0,
      date: form.getValues("openingDate")?.toISOString().slice(0, 10),
      org_id: orgId,
    };

    try {
      const res = await getDepositInterestRateAPI(data);
      if (res.message === "Data Found") {
        form.setValue("rateOfInterest", res.details);
      } else {
        form.setValue("rateOfInterest", "");
      }
      console.log(res);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      form.setValue("rateOfInterest", "");
    } finally {
      setLoading(false);
    }
  };

  const getDepositMaturityAmountApiCall = async (orgId) => {
    setLoading(true);
    let data = {
      prod_id: form.getValues("depositProduct"),
      duration: form.getValues("duration"),
      duration_unit: form.getValues("durationUnit"),
      amount: form.getValues("openingAmount"),
      roi: form.getValues("rateOfInterest"),
      org_id: orgId,
    };

    try {
      const res = await getDepositMaturityAmountAPI(data);
      if (res.message === "Data Found") {
        form.setValue("maturityAmount", res.details);
      } else {
        form.setValue("maturityAmount", "");
      }
      console.log(res);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      form.setValue("maturityAmount", "");
    } finally {
      setLoading(false);
    }
  };

  const getDepositPayoutAmountApiCall = async (orgId) => {
    setLoading(true);
    let data = {
      prod_id: form.getValues("depositProduct"),
      type_id: form.getValues("payoutMode"),
      amount: form.getValues("openingAmount"),
      roi: form.getValues("rateOfInterest"),
      org_id: orgId,
    };

    try {
      const res = await getDepositPayoutAmountAPI(data);
      if (res.message === "Data Found") {
        form.setValue("payoutAmount", res.details);
      } else {
        form.setValue("payoutAmount", "");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      form.setValue("payoutAmount", "");
    } finally {
      setLoading(false);
    }
  };

  const getDepositAgentApiCall = async (orgId) => {
    setLoading(true);
    try {
      const res = await getDepositAgentDataAPI(orgId);
      if (res.message === "Data Found") {
        dispatch(getDepositAgentData(res.details));
      } else {
        dispatch(getDepositAgentData([]));
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      dispatch(getDepositAgentData([]));
    } finally {
      setLoading(false);
    }
  };

  const getDepositEcsAccountApiCall = async (orgId, memberId) => {
    setLoading(true);

    try {
      const res = await getDepositEcsAccountAPI(orgId, memberId);
      if (res.message === "Data Found") {
        // dispatch(getAgentPayoutData(res.details));
      } else {
        // dispatch(getAgentPayoutData([]));
      }
      console.log("res", res);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      // dispatch(getAgentPayoutData([]));
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
        setDepositMember(res.details[0]);
        form.setValue("memberNo", res.details[0].Member_No);
        form.setValue("cifNo", res.details[0].CIF_No);
        form.setValue("memberName", res.details[0].Full_Name);
        form.setValue("gurdianName", res.details[0].Relation_Name);
        form.setValue("address", res.details[0].Address);
        form.setValue("mobile", res.details[0].Mem_Mob);
        form.setValue("voterId", res.details[0].Mem_Voter);
        form.setValue("aadhaarNo", res.details[0].Mem_Aadar);
        form.setValue("panNo", res.details[0].Mem_Pan);
      } else {
        setVisibleBlock(false);
        setDepositMember(null);
        form.setValue("memberNo", "");
        form.setValue("cifNo", "");
        form.setValue("memberName", "");
        form.setValue("gurdianName", "");
        form.setValue("address", "");
        form.setValue("mobile", "");
        form.setValue("voterId", "");
        form.setValue("aadhaarNo", "");
        form.setValue("panNo", "");
        toast.error(res.details);
      }
    } catch (error) {
      setVisibleBlock(false);
      toast.error("Something went wrong");
      console.error(error);
      setDepositMember(null);
      form.setValue("memberNo", "");
      form.setValue("cifNo", "");
      form.setValue("memberName", "");
      form.setValue("gurdianName", "");
      form.setValue("address", "");
      form.setValue("mobile", "");
      form.setValue("voterId", "");
      form.setValue("aadhaarNo", "");
      form.setValue("panNo", "");
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
    if (accountType) getDepositProductDataApiCall(orgId, accountType);
  }, [accountType]);

  useEffect(() => {
    if (openingAmount && openingAmount > 0 && depositProduct)
      checkDepositAmountApiCall(orgId);
  }, [openingAmount, depositProduct]);

  useEffect(() => {
    if (duration && duration > 0 && durationUnit && depositProduct)
      checkDepositDurationApiCall(orgId);
  }, [duration, durationUnit, depositProduct]);

  useEffect(() => {
    form.setValue("duration", "");
    setCheckDepositDurationMessage("");
  }, [durationUnit]);

  useEffect(() => {
    if (
      depositProduct &&
      duration &&
      duration > 0 &&
      durationUnit &&
      openingAmount &&
      openingAmount > 0 &&
      rateOfInterest &&
      rateOfInterest > 0
    ) {
      getDepositMaturityAmountApiCall(orgId);
    }
  }, [depositProduct, duration, durationUnit, openingAmount, rateOfInterest]);

  useEffect(() => {
    if (
      payoutMode &&
      openingAmount &&
      openingAmount > 0 &&
      rateOfInterest &&
      rateOfInterest > 0
    ) {
      getDepositPayoutAmountApiCall(orgId);
    }
  }, [payoutMode, openingAmount, rateOfInterest]);

  useEffect(() => {
    form.setValue("jointHolderDetails", []);
  }, [operationMode]);

  const prevDuration = useRef();
  const prevDurationUnit = useRef();
  const prevDepositProduct = useRef();
  const prevOpeningDate = useRef();

  useEffect(() => {
    const currentDuration = form.getValues("duration");
    const currentDurationUnit = form.getValues("durationUnit");
    const currentDepositProduct = form.getValues("depositProduct");
    const currentOpeningDate = form.getValues("openingDate");

    if (
      (accountType === "2"
        ? currentDuration &&
          currentDurationUnit &&
          currentDepositProduct &&
          currentOpeningDate &&
          (currentDuration !== prevDuration.current ||
            currentDurationUnit !== prevDurationUnit.current ||
            currentDepositProduct !== prevDepositProduct.current ||
            currentOpeningDate !== prevOpeningDate.current)
        : currentDepositProduct &&
          currentOpeningDate &&
          (currentDepositProduct !== prevDepositProduct.current ||
            currentOpeningDate !== prevOpeningDate.current)) &&
      orgId
    ) {
      getDepositInterestRateApiCall(orgId);
    }

    prevDuration.current = currentDuration;
    prevDurationUnit.current = currentDurationUnit;
    prevDepositProduct.current = currentDepositProduct;
    prevOpeningDate.current = currentOpeningDate;
  }, [duration, durationUnit, depositProduct, accountType, openingDate]);

  useEffect(() => {
    if (isAvailEcs) {
      getDepositEcsAccountApiCall(orgId, depositMember.Id);
    }
  }, [isAvailEcs]);

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
    getDepositAccountTypeDataApiCall,
    getDurationTypeDataApiCall,
    getMaturityInstructionDataApiCall,
    getOperationModeDataApiCall,
    getPayoutModeDataApiCall,
    form,
    handleSubmit,
    handleMemberFormSubmit,
    visibleBlock,
    successMessage,
    handleJointAccountAdd,
    handleJointAccountDelete,
    jointMemberDialougeOpen,
    deleteJointMemberDialougeOpen,
    checkDepositAmountDisable,
    checkDepositAmountMessage,
    checkDepositDurationDisable,
    checkDepositDurationMessage,
  };
};
