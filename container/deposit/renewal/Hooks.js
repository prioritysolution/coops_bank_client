"use client";
import { useEffect, useState } from "react";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useForm, useWatch } from "react-hook-form";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { getDepositMatureAccountAPI } from "../mature/MatureApis";
import {
  checkDepositDurationAPI,
  getDepositInterestRateAPI,
  getDepositMaturityAmountAPI,
} from "../openDepositAccount/OpenDepositAccountApis";

export const useRenewal = () => {
  const orgId = getSessionStorageData("orgId");
  const finId = getSessionStorageData("finId");
  const branchId = getSessionStorageData("userBranchId");

  const [loading, setLoading] = useState("");
  const [visibleBlock, setVisibleBlock] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [depositProduct, setDepositProduct] = useState(null);

  const [checkDepositDurationDisable, setCheckDepositDurationDisable] =
    useState(false);
  const [checkDepositDurationMessage, setCheckDepositDurationMessage] =
    useState("");

  const formSchema = yup.object({
    memberNo: yup.string().required("Member no. is required"),
    cifNo: yup.string().required("CIF no is required"),
    memberName: yup.string().required("Member name is required"),
    gurdianName: yup.string().required("Gurdian name is required"),
    mobile: yup.string().required("Mobile no. is required"),
    panNo: yup.string().required("Pan no. is required"),
    depositAmount: yup.string(),
    rateOfInterest: yup.string(),
    maturityDate: yup.string(),
    maturityAmount: yup.string(),
    renewalType: yup.string().required("Renewal type is required"),
    renewalDate: yup.string(),
    duration: yup.string().required("Duration is required"),
    durationUnit: yup.string().required("Duration unit is required"),
    newRateOfInterest: yup.string().required("Rate of interest is required"),
    newMaturityAmount: yup.string().required("Maturity amount is required"),
    payoutAmount: yup.string(),
    Joint_1: yup.string(),
    Joint_2: yup.string(),
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
      depositAmount: "",
      rateOfInterest: "",
      maturityDate: "",
      maturityAmount: "",
      renewalType: "principal",
      renewalDate: "",
      duration: "",
      durationUnit: "",
      newRateOfInterest: "",
      newMaturityAmount: "",
      payoutAmount: "",
      Joint_1: "",
      Joint_2: "",
      transMode: "bank",
    },
  });

  const { control } = form;
  const {
    duration,
    durationUnit,
    renewalType,
    newRateOfInterest,
    depositAmount,
    maturityAmount,
  } = useWatch({
    control,
  });

  const handleSubmit = async (values) => {
    postDepositRenewalAccountApiCall(values);
  };

  const handleAccountFormSubmit = (values) => {
    getAccountDetailsByAccountNoApiCall(values);
    form.setValue("renewalDate", format(values.date, "dd-MM-yyyy"));
  };

  const postDepositRenewalAccountApiCall = async (item) => {
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
        form.reset();
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

  const getAccountDetailsByAccountNoApiCall = async (item) => {
    setLoading(true);

    let data = {
      acct_no: item.accountNo,
      date: format(item.date, "yyyy-MM-dd"),
      org_id: orgId,
    };

    try {
      const res = await getDepositMatureAccountAPI(data);
      if (res.message === "Data Found") {
        if (format(item.date, "yyyy-MM-dd") >= res.details[0].Maturity_Date) {
          form.setValue("memberNo", res.details[0].Member_No);
          form.setValue("cifNo", res.details[0].CIF_No);
          form.setValue("memberName", res.details[0].Full_Name);
          form.setValue("gurdianName", res.details[0].Relation_Name);
          form.setValue("mobile", res.details[0].Mem_Mob);
          form.setValue("panNo", res.details[0].Mem_Pan);
          form.setValue("rateOfInterest", res.details[0].ROI);
          form.setValue("maturityDate", res.details[0].Maturity_Date);
          form.setValue("maturityAmount", res.details[0].Maturity_Amount);
          form.setValue("depositAmount", res.details[0].Avail_Bal);
          form.setValue("amount", res.details[0].Avail_Bal);
          form.setValue("joint1", res.details[0].Joint_1);
          form.setValue("joint2", res.details[0].Joint_2);
          setDepositProduct(res.details[0]);
          setVisibleBlock(true);
        } else {
          toast.error(
            `Maturity date is ${format(
              res.details[0].Maturity_Date,
              "dd-MM-yyyy"
            )}. Can't be process for renew.`
          );
        }
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
        form.setValue("depositAmount", "");
        form.setValue("amount", "");
        form.setValue("joint1", "");
        form.setValue("joint2", "");
        setDepositProduct(null);
        setVisibleBlock(false);
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
      form.setValue("depositAmount", "");
      form.setValue("amount", "");
      form.setValue("joint1", "");
      form.setValue("joint2", "");
      setDepositProduct(null);
      setVisibleBlock(false);
    } finally {
      setLoading(false);
    }
  };

  const checkDepositDurationApiCall = async (orgId) => {
    setLoading(true);
    let data = {
      prod_id: depositProduct.Prod_Id,
      duration: form.getValues("duration"),
      duration_unit: form.getValues("durationUnit"),
      org_id: orgId,
    };

    try {
      const res = await checkDepositDurationAPI(data);
      if (res.message === "Data Found") {
        setCheckDepositDurationDisable(false);
        setCheckDepositDurationMessage("");
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
      prod_id: depositProduct.Prod_Id,
      duration: form.getValues("duration"),
      dur_unit: form.getValues("durationUnit"),
      date: format(form.getValues("renewalDate"), "yyyy-MM-dd"),
      org_id: orgId,
    };

    try {
      const res = await getDepositInterestRateAPI(data);
      if (res.message === "Data Found") {
        form.setValue("newRateOfInterest", res.details);
      } else {
        form.setValue("newRateOfInterest", "");
      }
      console.log(res);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      form.setValue("newRateOfInterest", "");
    } finally {
      setLoading(false);
    }
  };

  const getDepositMaturityAmountApiCall = async (orgId) => {
    setLoading(true);
    let data = {
      prod_id: depositProduct.Prod_Id,
      duration: form.getValues("duration"),
      duration_unit: form.getValues("durationUnit"),
      amount:
        renewalType === "principal"
          ? form.getValues("depositAmount")
          : form.getValues("maturityAmount"),
      roi: form.getValues("newRateOfInterest"),
      org_id: orgId,
    };

    try {
      const res = await getDepositMaturityAmountAPI(data);
      if (res.message === "Data Found") {
        form.setValue("newMaturityAmount", res.details);
      } else {
        form.setValue("newMaturityAmount", "");
      }
      console.log(res);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      form.setValue("newMaturityAmount", "");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (duration && durationUnit && orgId) {
      checkDepositDurationApiCall(orgId);
      getDepositInterestRateApiCall(orgId);
    }
  }, [duration, durationUnit]);

  useEffect(() => {
    if (duration && durationUnit && renewalType && newRateOfInterest && orgId) {
      getDepositMaturityAmountApiCall(orgId);
    }
  }, [duration, durationUnit, renewalType, newRateOfInterest]);

  useEffect(() => {
    if (depositAmount && maturityAmount && renewalType === "principal") {
      form.setValue(
        "payoutAmount",
        Number(maturityAmount) - Number(depositAmount)
      );
    } else {
      form.setValue("payoutAmount", 0);
    }
  }, [depositAmount, maturityAmount, renewalType]);

  return {
    loading,
    form,
    handleSubmit,
    handleAccountFormSubmit,
    visibleBlock,
    successMessage,
    checkDepositDurationDisable,
    checkDepositDurationMessage,
  };
};
