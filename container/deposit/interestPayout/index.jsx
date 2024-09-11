"use client";

import InterestPayout from "@/components/deposit/interestPayout";
import { useBankDeposit } from "@/container/banking/bankDeposit/Hooks";
import { useIssueMembership } from "@/container/membership/issueMembership/Hooks";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useEffect } from "react";
import { useInterestPayout } from "./Hooks";

const InterestPayoutContainer = () => {
  const token = getSessionStorageData("userToken");
  const orgId = getSessionStorageData("orgId");

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
    handleBulkAccountSubmit,
    handleAccountFormSubmit,
    visibleBlock,
    successMessage,
    optionForm,
    handleOptionFormSubmit,
    showSearchAccountForm,
    showBulkAccountTable,
    disablePayoutTypeForm,
    transMode,
    postingType,
  } = useInterestPayout();

  const { getNoteDenomApiCall } = useIssueMembership();

  const { getBankAccountApiCall } = useBankDeposit();

  useEffect(() => {
    if (token && orgId) {
      getNoteDenomApiCall();
      getBankAccountApiCall(orgId);
    }
  }, [token]);

  return (
    <InterestPayout
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
      handleBulkAccountSubmit={handleBulkAccountSubmit}
      handleAccountFormSubmit={handleAccountFormSubmit}
      visibleBlock={visibleBlock}
      successMessage={successMessage}
      optionForm={optionForm}
      handleOptionFormSubmit={handleOptionFormSubmit}
      showSearchAccountForm={showSearchAccountForm}
      showBulkAccountTable={showBulkAccountTable}
      disablePayoutTypeForm={disablePayoutTypeForm}
      transMode={transMode}
      postingType={postingType}
    />
  );
};
export default InterestPayoutContainer;
