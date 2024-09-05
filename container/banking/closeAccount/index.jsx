"use client";

import CloseAccount from "@/components/banking/closeAccount";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useBankClosing } from "./Hooks";
import { useBankDeposit } from "../bankDeposit/Hooks";
import { useIssueMembership } from "@/container/membership/issueMembership/Hooks";
import { useEffect } from "react";

const CloseAccountContainer = () => {
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
  } = useBankClosing();

  const { getBankAccountApiCall } = useBankDeposit();

  const { getNoteDenomApiCall } = useIssueMembership();

  useEffect(() => {
    if (orgId && token) {
      getBankAccountApiCall(orgId);
      getNoteDenomApiCall();
    }
  }, [orgId]);

  return (
    <CloseAccount
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
export default CloseAccountContainer;
