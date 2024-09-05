"use client";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useForm, useWatch } from "react-hook-form";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { yupResolver } from "@hookform/resolvers/yup";
import { postBankTransferAPI } from "./TransferApis";
import { getBankBalanceAPI } from "../bankDeposit/BankDepositApis";

export const useBankTransfer = () => {
  const orgId = getSessionStorageData("orgId");
  const branchId = getSessionStorageData("userBranchId");
  const finId = getSessionStorageData("finId");

  const [loading, setLoading] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [sendersAvailableBalance, setSendersAvailableBalance] = useState(null);

  const formSchema = yup.object({
    transferDate: yup.date().required("Transfer date is required"),
    senderBankAccount: yup
      .string()
      .required("Sender's bank account is required"),
    receiverBankAccount: yup
      .string()
      .required("Receiver's bank account is required"),
    transferAmount: yup.string().required("Transfer amount is required"),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      transferDate: null,
      senderBankAccount: "",
      receiverBankAccount: "",
      transferAmount: "",
    },
  });

  const { control } = form;
  const { transferDate, senderBankAccount } = useWatch({ control });

  const handleSubmit = async (values) => {
    postBankTransferApiCall(values);
  };

  const postBankTransferApiCall = async (item) => {
    let data = {
      trans_date:
        item.transferDate && item.transferDate.toISOString().slice(0, 10),
      Account_Id: item.senderBankAccount,
      Amount: item.transferAmount,
      to_account_id: item.receiverBankAccount,
      fin_id: finId,
      branch_id: branchId,
      org_id: orgId,
    };

    setLoading(true);

    try {
      const res = await postBankTransferAPI(data);

      if (res.message === "Success") {
        setSuccessMessage(res.details);
        form.reset();
        setSendersAvailableBalance(null);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getBankBalanceApiCall = async (orgId) => {
    setLoading(true);

    let data = {
      account_id: form.getValues("senderBankAccount"),
      date: form.getValues("transferDate").toISOString().slice(0, 10),
      org_id: orgId,
    };

    try {
      const res = await getBankBalanceAPI(data);
      if (res.message === "Data Found") {
        setSendersAvailableBalance(Number(res.details));
      } else {
        setSendersAvailableBalance(0);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      setSendersAvailableBalance(0);
    } finally {
      setLoading(false);
    }
  };

  const prevSenderBankAccount = useRef();
  const prevTransferDate = useRef();

  useEffect(() => {
    const currentSenderBankAccount = form.getValues("senderBankAccount");
    const currentTransferDate = form.getValues("transferDate");

    if (
      currentSenderBankAccount &&
      currentTransferDate &&
      (currentSenderBankAccount !== prevSenderBankAccount.current ||
        currentTransferDate !== prevTransferDate.current)
    ) {
      getBankBalanceApiCall(orgId);
    }

    prevSenderBankAccount.current = currentSenderBankAccount;
    prevTransferDate.current = currentTransferDate;
  }, [senderBankAccount, transferDate]);

  return {
    loading,
    form,
    handleSubmit,
    successMessage,
    sendersAvailableBalance,
  };
};
