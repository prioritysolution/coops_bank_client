"use client";

import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import toast from "react-hot-toast";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { getPaymentTypeAPI, postDepositAgentAPI } from "./DepositAgentApis";
import { getPaymentTypeData } from "./DepositAgentReducer";

export const useDepositAgent = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const orgId = getSessionStorageData("orgId");

  const formSchema = yup.object({
    agentName: yup.string().required("Member type is required"),
    address: yup.string().required("Address is required"),
    mobile: yup.number().required("Mobile no. is required"),
    email: yup.string().email().required("Email is required"),
    depositAmount: yup.number().required("Deposit amount is required"),
    maximumDays: yup.number().required("Maximum days is required"),
    maximumDeposit: yup.number().required("Maximum deposit is required"),
    paymentType: yup.number().required("Payment type is required"),
    payoutAmount: yup.number().required("Payout amount is required"),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      agentName: "",
      address: "",
      mobile: "",
      email: "",
      depositAmount: "",
      maximumDays: "",
      maximumDeposit: "",
      paymentType: "",
      payoutAmount: "",
    },
  });

  const handleSubmit = (values) => {
    postDepositAgentApiCall(values);
  };

  const postDepositAgentApiCall = async (item) => {
    let data = {
      agent_name: item.agentName,
      address: item.address,
      mobile: item.mobile,
      email: item.email,
      deposit_amt: item.depositAmount,
      max_days: item.maximumDays,
      max_amt: item.maximumDeposit,
      paid_mode: item.paymentType,
      paid_amt: item.payoutAmount,

      org_id: orgId,
    };
    setLoading(true);
    try {
      const res = await postDepositAgentAPI(data);
      if (res.message === "Success") {
        toast.success(res.details);
        form.reset();
      } else toast.error(res.message);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getPaymentTypeDataApiCall = async () => {
    try {
      const res = await getPaymentTypeAPI();
      if (res.message === "Data Found") {
        dispatch(getPaymentTypeData(res.details));
      } else {
        dispatch(getPaymentTypeData([]));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      dispatch(getPaymentTypeData([]));
    }
  };

  return {
    loading,
    getPaymentTypeDataApiCall,
    handleSubmit,
    form,
  };
};
