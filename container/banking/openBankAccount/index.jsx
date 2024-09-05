"use client";

import OpenBankAccount from "@/components/banking/openBankAccount";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useEffect } from "react";
import { useOpenBankAccount } from "./Hooks";

const OpenBankAccountContainer = () => {
  const orgId = getSessionStorageData("orgId");

  const {
    loading,
    form,
    handleSubmit,
    getBankAccountTypeApiCall,
    getBankGlApiCall,
  } = useOpenBankAccount();

  useEffect(() => {
    if (orgId) {
      getBankAccountTypeApiCall();
      getBankGlApiCall();
    }
  }, [orgId]);

  return (
    <OpenBankAccount
      loading={loading}
      form={form}
      handleSubmit={handleSubmit}
    />
  );
};
export default OpenBankAccountContainer;
