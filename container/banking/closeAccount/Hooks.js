"use client";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useForm, useWatch } from "react-hook-form";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { yupResolver } from "@hookform/resolvers/yup";
import { getBankBalanceAPI } from "../bankDeposit/BankDepositApis";
import { postBankClosingAPI } from "./CloseAccountApis";

export const useBankClosing = () => {
  const orgId = getSessionStorageData("orgId");
  const branchId = getSessionStorageData("userBranchId");
  const finId = getSessionStorageData("finId");

  const [loading, setLoading] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // denominators
  const [denominators, setDenominators] = useState([]);

  // cash Transaction Total
  const [cashTransactionTotal, setCashTransactionTotal] = useState([]);

  const [cashTransactionGrandTotal, setCashTransactionGrandTotal] = useState(0);

  const [cashDenomArray, setCashDenomArray] = useState([]);

  const cashDenomData = useSelector(
    (state) => state?.issueMembership?.noteDenomData
  );

  const formSchema = yup.object({
    bankAccount: yup.string().required("Bank account is required"),
    closingDate: yup.date().required("Closing date is required"),
    availableBalance: yup.string().required("Available balance is required"),
    closingAmount: yup.string().required("Closing amount is required"),
    transMode: yup.string().required("Transaction mode is required"),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      bankAccount: "",
      closingDate: null,
      availableBalance: "",
      closingAmount: "",
      transMode: "cash",
    },
  });

  const { control } = form;
  const { bankAccount, closingDate } = useWatch({ control });

  const handleSubmit = async (values) => {
    postBankClosingApiCall(values);
  };

  const postBankClosingApiCall = async (item) => {
    const cashDetails = cashDenomArray.map((cash) => ({
      note_id: cash.note_id,
      in_qnty: 0,
      out_qnty: cash.denominator,
      tot_amount: cash.totalAmount,
    }));

    let data = {
      trans_date:
        item.closingDate && item.closingDate.toISOString().slice(0, 10),
      Account_Id: item.bankAccount,
      Amount: item.closingAmount,
      to_account_id: null,
      cash_details: cashDetails,
      fin_id: finId,
      branch_id: branchId,
      org_id: orgId,
    };

    setLoading(true);
    try {
      const res = await postBankClosingAPI(data);

      if (res.message === "Success") {
        setSuccessMessage(res.details);
        form.reset();
        const defaultDenominators = Array(cashDenomData.length).fill("");
        setDenominators(defaultDenominators);
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
      account_id: form.getValues("bankAccount"),
      date: form.getValues("closingDate").toISOString().slice(0, 10),
      org_id: orgId,
    };

    try {
      const res = await getBankBalanceAPI(data);
      if (res.message === "Data Found") {
        form.setValue("availableBalance", res.details);
      } else {
        form.setValue("availableBalance", "");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      form.setValue("availableBalance", "");
    } finally {
      setLoading(false);
    }
  };

  const prevBankAccount = useRef();
  const prevClosingDate = useRef();

  useEffect(() => {
    const currentBankAccount = form.getValues("bankAccount");
    const currentClosingDate = form.getValues("closingDate");

    if (
      currentBankAccount &&
      currentClosingDate &&
      (currentBankAccount !== prevBankAccount.current ||
        currentClosingDate !== prevClosingDate.current)
    ) {
      getBankBalanceApiCall(orgId);
    }

    prevBankAccount.current = currentBankAccount;
    prevClosingDate.current = currentClosingDate;
  }, [bankAccount, closingDate]);

  //handle in denominators change
  const handleDenominatorChange = (event, rowIndex) => {
    const { value } = event.target;
    const newDenominators = [...denominators];

    if (Number(value) > -1 && /^\d*$/.test(value)) {
      newDenominators[rowIndex] = value;
      setDenominators(newDenominators);
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
    setDenominators(defaultDenominators);
    const defaultTotalAmounts = Array(cashDenomData.length).fill(0);
    setCashTransactionTotal(defaultTotalAmounts);
  }, [cashDenomData]);

  useEffect(() => {
    const newTotalAmounts = cashDenomData.map((cash, index) =>
      calculateCashTransactionTotalAmount(cash.Note_Value, denominators[index])
    );

    setCashTransactionTotal(newTotalAmounts);
  }, [denominators, cashDenomData]);

  useEffect(() => {
    // Calculate grand total
    const newGrandTotal = cashTransactionTotal.reduce(
      (acc, curr) => acc + curr,
      0
    );
    setCashTransactionGrandTotal(newGrandTotal);
  }, [cashTransactionTotal]);

  useEffect(() => {
    let postData = cashDenomData.map((cashDenom, idx) => {
      return {
        note_id: cashDenom.Id,
        denominator: parseInt(denominators[idx]) || 0,
        totalAmount: cashTransactionTotal[idx],
      };
    });
    setCashDenomArray(postData);
  }, [denominators, cashTransactionTotal]);

  return {
    loading,
    cashDenomData,
    denominators,
    cashTransactionTotal,
    cashTransactionGrandTotal,
    handleDenominatorChange,
    form,
    handleSubmit,
    successMessage,
  };
};
