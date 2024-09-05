"use client";
import ShareIssue from "@/components/membership/shareIssue";
import { useIssueMembership } from "../issueMembership/Hooks";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useEffect } from "react";
import { useShareIssue } from "./Hooks";

const ShareIssueContainer = () => {
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
  } = useShareIssue();

  const { getNoteDenomApiCall } = useIssueMembership();

  useEffect(() => {
    if (token) {
      getNoteDenomApiCall();
    }
  }, [token]);

  return (
    <ShareIssue
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
export default ShareIssueContainer;
