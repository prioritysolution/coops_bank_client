"use client";

import Deposit from "@/components/deposit/deposit";
import { useDeposit } from "./Hooks";
import { useIssueMembership } from "@/container/membership/issueMembership/Hooks";
import { useEffect } from "react";
import getSessionStorageData from "@/utils/getSessionStorageData";

const DepositContainer = () => {
  const token = getSessionStorageData("userToken");

  const {
    loading,
    cashDenomData,
    inDenominators,
    outDenominators,
    cashInTransactionTotal,
    cashOutTransactionTotal,
    cashInTransactionGrandTotal,
    cashOutTransactionGrandTotal,
    handleInDenominatorChange,
    handleOutDenominatorChange,
    form,
    handleSubmit,
    handleAccountFormSubmit,
    visibleBlock,
    successMessage,
    showLedger,
  } = useDeposit();

  const { getNoteDenomApiCall } = useIssueMembership();

  useEffect(() => {
    if (token) getNoteDenomApiCall();
  }, [token]);

  return (
    <Deposit
      loading={loading}
      notes={cashDenomData}
      inDenominators={inDenominators}
      outDenominators={outDenominators}
      cashInTransactionTotal={cashInTransactionTotal}
      cashOutTransactionTotal={cashOutTransactionTotal}
      cashInTransactionGrandTotal={cashInTransactionGrandTotal}
      cashOutTransactionGrandTotal={cashOutTransactionGrandTotal}
      handleInDenominatorChange={handleInDenominatorChange}
      handleOutDenominatorChange={handleOutDenominatorChange}
      form={form}
      handleSubmit={handleSubmit}
      handleAccountFormSubmit={handleAccountFormSubmit}
      visibleBlock={visibleBlock}
      successMessage={successMessage}
      showLedger={showLedger}
    />
  );
};
export default DepositContainer;
