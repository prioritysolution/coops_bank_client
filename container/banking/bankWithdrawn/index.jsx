"use client";

import BankWithdrawn from "@/components/banking/bankWithdrawn";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useBankWithdrawn } from "./Hooks";
import { useBankDeposit } from "../bankDeposit/Hooks";
import { useIssueMembership } from "@/container/membership/issueMembership/Hooks";
import { useEffect } from "react";

const BankWithdrawnContainer = () => {
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
    successMessage,
  } = useBankWithdrawn();

  const { getBankAccountApiCall } = useBankDeposit();

  const { getNoteDenomApiCall } = useIssueMembership();

  useEffect(() => {
    if (orgId && token) {
      getBankAccountApiCall(orgId);
      getNoteDenomApiCall();
    }
  }, [orgId]);

  return (
    <BankWithdrawn
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
export default BankWithdrawnContainer;
