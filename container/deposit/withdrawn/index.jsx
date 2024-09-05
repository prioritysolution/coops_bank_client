"use client";

import Withdrawn from "@/components/deposit/withdrawn";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useWithdrawn } from "./Hooks";
import { useIssueMembership } from "@/container/membership/issueMembership/Hooks";
import { useEffect } from "react";

const WithdrawnContainer = () => {
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
    handleSeeSpecimen,
    photoLink,
    signatureLink,
  } = useWithdrawn();

  const { getNoteDenomApiCall } = useIssueMembership();

  useEffect(() => {
    if (token) getNoteDenomApiCall();
  }, [token]);

  return (
    <Withdrawn
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
      handleSeeSpecimen={handleSeeSpecimen}
      photoLink={photoLink}
      signatureLink={signatureLink}
    />
  );
};
export default WithdrawnContainer;
