"use client";

import ShareRefund from "@/components/membership/shareRefund";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useShareRefund } from "./Hooks";
import { useEffect } from "react";
import { useIssueMembership } from "../issueMembership/Hooks";

const ShareRefundContainer = () => {
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
    handleMemberFormSubmit,
    visibleBlock,
    successMessage,
  } = useShareRefund();

  const { getNoteDenomApiCall } = useIssueMembership();

  useEffect(() => {
    if (token) {
      getNoteDenomApiCall();
    }
  }, [token]);

  return (
    <ShareRefund
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
      handleMemberFormSubmit={handleMemberFormSubmit}
      visibleBlock={visibleBlock}
      successMessage={successMessage}
    />
  );
};
export default ShareRefundContainer;
