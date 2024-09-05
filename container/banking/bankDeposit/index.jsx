"use client";

import BankDeposit from "@/components/banking/bankDeposit";
import { useBankDeposit } from "./Hooks";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useEffect } from "react";
import { useIssueMembership } from "@/container/membership/issueMembership/Hooks";

const BankDepositContainer = () => {
  const orgId = getSessionStorageData("orgId");
  const token = getSessionStorageData("userToken");

  const {
    loading,
    cashDenomData,
    denominators,
    cashTransactionTotal,
    cashTransactionGrandTotal,
    handleDenominatorChange,
    form,
    handleSubmit,
    getBankAccountApiCall,
    successMessage,
  } = useBankDeposit();

  const { getNoteDenomApiCall } = useIssueMembership();

  useEffect(() => {
    if (orgId && token) {
      getBankAccountApiCall(orgId);
      getNoteDenomApiCall();
    }
  }, [orgId]);

  return (
    <BankDeposit
      loading={loading}
      notes={cashDenomData}
      denominators={denominators}
      cashTransactionTotal={cashTransactionTotal}
      cashTransactionGrandTotal={cashTransactionGrandTotal}
      handleDenominatorChange={handleDenominatorChange}
      form={form}
      handleSubmit={handleSubmit}
      successMessage={successMessage}
    />
  );
};
export default BankDepositContainer;
