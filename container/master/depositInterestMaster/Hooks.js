"use client";

import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import toast from "react-hot-toast";
import getSessionStorageData from "@/utils/getSessionStorageData";
import {
  getDepositInterestProductAPI,
  postDepositInterestSetupAPI,
} from "./DepositInterestSetupApis";
import { getDepositInterestProductData } from "./DepositInterestSetupReducer";

export const useDepositInterestSetup = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const orgId = getSessionStorageData("orgId");

  const depositInterestProductData = useSelector(
    (state) => state?.depositInterestSetup?.depositInterestProductData
  );

  const formSchema = yup.object({
    productId: yup.string().required("Product is required"),
    effectFrom: yup.date().required("Effect from date is required"),
    effectUpto: yup.date().required("Effect upto date is required"),
    minimumDuration: yup.number().required("Minimum duration is required"),
    maximumDuration: yup.number().required("Maximum duration is required"),
    durationUnit: yup.string().required("Duration unit is required"),
    rateOfInterest: yup.number().required("Rate of interest is required"),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      productId: "",
      effectFrom: null,
      effectUpto: null,
      minimumDuration: "",
      maximumDuration: "",
      durationUnit: "",
      rateOfInterest: "",
    },
  });

  const handleAddTableData = (values) => {
    const selectedProduct = depositInterestProductData.find(
      (item) => item.Id.toString() === values.productId
    );

    const newEntry = {
      productName: selectedProduct?.Prd_SH_Name || "",
      min_dur: values.minimumDuration,
      max_dur: values.maximumDuration,
      dur_unit: values.durationUnit,
      roi: values.rateOfInterest,
      effect_frm: values.effectFrom.toISOString().slice(0, 10),
      eff_to: values.effectUpto.toISOString().slice(0, 10),
    };

    setTableData((prev) => [...prev, newEntry]);

    form.resetField("effectFrom");
    form.resetField("effectUpto");
    form.resetField("minimumDuration");
    form.resetField("maximumDuration");
    form.resetField("durationUnit");
    form.resetField("rateOfInterest");
    // postShareProductApiCall(values);
  };

  const handleSubmit = () => {
    postShareProductApiCall();
  };

  const postShareProductApiCall = async () => {
    const data = {
      prod_id: form.getValues("productId"),
      slab_data: tableData,
      org_id: orgId,
    };
    setLoading(true);

    console.log(data);

    try {
      const res = await postDepositInterestSetupAPI(data);
      if (res.message === "Success") {
        toast.success(res.details);
        form.reset();
        setTableData([]);
      } else toast.error(res.message);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getDepositInterestProductApiCall = async (orgId) => {
    try {
      const res = await getDepositInterestProductAPI(orgId, 2);
      if (res.message === "Data Found") {
        dispatch(getDepositInterestProductData(res.details));
      } else {
        dispatch(getDepositInterestProductData([]));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      dispatch(getDepositInterestProductData([]));
    }
  };

  return {
    loading,
    getDepositInterestProductApiCall,
    handleSubmit,
    handleAddTableData,
    form,
    tableData,
  };
};
