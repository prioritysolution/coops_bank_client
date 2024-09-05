"use client";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  getBankAccountTypeAPI,
  getBankGlAPI,
  postOpenBankAccountAPI,
} from "./OpenBankAccountApis";
import {
  getBankAccountTypeData,
  getBankGlData,
} from "./OpenBankAccountReducer";

export const useOpenBankAccount = () => {
  const dispatch = useDispatch();

  const orgId = getSessionStorageData("orgId");
  const branchId = getSessionStorageData("userBranchId");

  const [loading, setLoading] = useState("");

  const formSchema = yup.object({
    openingDate: yup.date().required("Opening date is required"),
    bankName: yup.string().required("Bank name is required"),
    bankBranch: yup.string().required("Bank branch is required"),
    ifscCode: yup.string().required("IFSC code is required"),
    accountNo: yup.string().required("Account no. is required"),
    accountType: yup.string().required("Account type is required"),
    bankGl: yup.string().required("Bank gl is required"),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      openingDate: null,
      bankName: "",
      bankBranch: "",
      ifscCode: "",
      accountNo: "",
      accountType: "",
      bankGl: "",
    },
  });

  const handleSubmit = async (values) => {
    postOpenBankAccountApiCall(values);
  };

  const postOpenBankAccountApiCall = async (item) => {
    let data = {
      opening_date: item.openingDate.toISOString().slice(0, 10),
      bank_name: item.bankName,
      branch_name: item.bankBranch,
      ifsc_code: item.ifscCode,
      account_no: item.accountNo,
      account_type: item.accountType,
      under_gl: item.bankGl,
      branch_id: branchId,
      org_id: orgId,
    };

    setLoading(true);

    try {
      const res = await postOpenBankAccountAPI(data);

      if (res.message === "Success") {
        form.reset();
        toast.success(res.details || res.message);
      } else {
        toast.error(res.message);
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

  const getBankAccountTypeApiCall = async () => {
    setLoading(true);

    try {
      const res = await getBankAccountTypeAPI();
      if (res.message === "Data Found") {
        dispatch(getBankAccountTypeData(res.details));
      } else {
        dispatch(getBankAccountTypeData([]));
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      dispatch(getBankAccountTypeData([]));
    } finally {
      setLoading(false);
    }
  };

  const getBankGlApiCall = async () => {
    setLoading(true);

    try {
      const res = await getBankGlAPI();
      if (res.message === "Data Found") {
        dispatch(getBankGlData(res.details));
      } else {
        dispatch(getBankGlData([]));
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      dispatch(getBankGlData([]));
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    form,
    handleSubmit,
    getBankAccountTypeApiCall,
    getBankGlApiCall,
  };
};
