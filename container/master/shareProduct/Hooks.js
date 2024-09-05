"use client";

import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getMemberTypeAPI,
  getShareProductDetailsAPI,
  postShareProductAPI,
} from "./ShareProductApis";
import { getMemberTypeData } from "./ShareProductReducer";
import getSessionStorageData from "@/utils/getSessionStorageData";

export const useShareProduct = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [prodId, setProdId] = useState(null);

  const orgId = getSessionStorageData("orgId");

  const formSchema = yup.object({
    memberType: yup.string().required("Member type is required"),
    admissionFees: yup.number().required("Admission fees is required"),
    ratePerShare: yup.number().required("Rate per share is required"),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      memberType: "",
      admissionFees: 0,
      ratePerShare: 0,
    },
  });

  const { control } = form;
  const { memberType } = useWatch({ control });

  const handleSubmit = (values) => {
    postShareProductApiCall(values);
  };

  const postShareProductApiCall = async (item) => {
    let data = {
      prod_id: prodId,
      mem_type: item.memberType,
      adm_fees: item.admissionFees,
      share_rate: item.ratePerShare,
      org_id: orgId,
    };
    setLoading(true);
    try {
      const res = await postShareProductAPI(data);
      if (res.message === "Success") {
        toast.success(res.details);
        form.reset();
        setProdId(null);
      } else toast.error(res.message);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getMemberTypeDataApiCall = async () => {
    try {
      const res = await getMemberTypeAPI();
      if (res.message === "Data Found") {
        dispatch(getMemberTypeData(res.details));
      } else {
        dispatch(getMemberTypeData([]));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      dispatch(getMemberTypeData([]));
    }
  };

  const getShareProductDetailsApiCall = async (orgId, prodId) => {
    try {
      const res = await getShareProductDetailsAPI(orgId, prodId);
      if (res.message === "Data Found") {
        console.log(Number(res.details[0].Adm_Fees));
        form.setValue("admissionFees", res.details[0].Adm_Fees);
        form.setValue("ratePerShare", res.details[0].Share_Rate);
        setProdId(res.details[0].Id);
      } else {
        form.setValue("admissionFees", "");
        form.setValue("ratePerShare", "");
        setProdId(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      form.setValue("admissionFees", "");
      form.setValue("ratePerShare", "");
      setProdId(null);
    }
  };

  useEffect(() => {
    if (memberType) getShareProductDetailsApiCall(orgId, memberType);
    console.log(memberType);
  }, [memberType]);

  return {
    loading,
    getMemberTypeDataApiCall,
    handleSubmit,
    form,
  };
};
