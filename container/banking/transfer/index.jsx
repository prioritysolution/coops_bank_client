"use client";

import Transfer from "@/components/banking/transfer";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useEffect } from "react";
import { useBankTransfer } from "./Hooks";
import { useBankDeposit } from "../bankDeposit/Hooks";
import { useOpenDepositAccount } from "@/container/deposit/openDepositAccount/Hooks";

const TransferContainer = () => {
  const token = getSessionStorageData("userToken");
  const orgId = getSessionStorageData("orgId");

  const {
    loading,
    form,
    handleSubmit,
    successMessage,
    sendersAvailableBalance,
  } = useBankTransfer();

  const { getBankAccountApiCall } = useBankDeposit();

  useEffect(() => {
    if (token && orgId) {
      getBankAccountApiCall(orgId);
    }
  }, [token, orgId]);

  return (
    <Transfer
      loading={loading}
      form={form}
      handleSubmit={handleSubmit}
      successMessage={successMessage}
      sendersAvailableBalance={sendersAvailableBalance}
    />
  );
};
export default TransferContainer;
