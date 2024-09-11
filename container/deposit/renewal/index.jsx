"use client";

import Renewal from "@/components/deposit/renewal";
import { useRenewal } from "./Hooks";
import { useEffect } from "react";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useOpenDepositAccount } from "../openDepositAccount/Hooks";
import { useBankDeposit } from "@/container/banking/bankDeposit/Hooks";

const RenewalContainer = () => {
  const token = getSessionStorageData("userToken");
  const orgId = getSessionStorageData("orgId");

  const {
    loading,
    form,
    handleSubmit,
    handleAccountFormSubmit,
    visibleBlock,
    successMessage,
    checkDepositDurationDisable,
    checkDepositDurationMessage,
  } = useRenewal();

  const { getDurationTypeDataApiCall } = useOpenDepositAccount();

  const { getBankAccountApiCall } = useBankDeposit();

  useEffect(() => {
    if (token && orgId) {
      getDurationTypeDataApiCall();
      getBankAccountApiCall(orgId);
    }
  }, [token, orgId]);

  return (
    <Renewal
      loading={loading}
      form={form}
      handleSubmit={handleSubmit}
      handleAccountFormSubmit={handleAccountFormSubmit}
      visibleBlock={visibleBlock}
      successMessage={successMessage}
      checkDepositDurationDisable={checkDepositDurationDisable}
      checkDepositDurationMessage={checkDepositDurationMessage}
    />
  );
};
export default RenewalContainer;
