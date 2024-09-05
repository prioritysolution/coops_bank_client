"use client";

import { useIssueMembership } from "@/container/membership/issueMembership/Hooks";
import { useMature } from "./Hooks";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useEffect } from "react";
import Mature from "@/components/deposit/mature";
import { useBankDeposit } from "@/container/banking/bankDeposit/Hooks";

const MatureContainer = () => {
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
    handleAccountFormSubmit,
    visibleBlock,
    successMessage,
    showLedger,
    handleSeeSpecimen,
    photoLink,
    signatureLink,
    optionForm,
    handleOptionFormSubmit,
    showSearchAccountForm,
    disableOperationTypeForm,
    transMode,
    handleSearchAccountListByMemberNo,
    handleSearchAccountListByName,
    handleSelectClick,
    dialougeOpen,
    setDialougeOpen,
    handleFetchData,
    savingsAccountFullName,
    savingsAccountBalance,
  } = useMature();

  const { getNoteDenomApiCall } = useIssueMembership();

  const { getBankAccountApiCall } = useBankDeposit();

  useEffect(() => {
    if (token && orgId) {
      getNoteDenomApiCall();
      getBankAccountApiCall(orgId);
    }
  }, [token]);

  return (
    <Mature
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
      optionForm={optionForm}
      handleOptionFormSubmit={handleOptionFormSubmit}
      showSearchAccountForm={showSearchAccountForm}
      disableOperationTypeForm={disableOperationTypeForm}
      transMode={transMode}
      handleSearchAccountListByMemberNo={handleSearchAccountListByMemberNo}
      handleSearchAccountListByName={handleSearchAccountListByName}
      handleSelectClick={handleSelectClick}
      dialougeOpen={dialougeOpen}
      setDialougeOpen={setDialougeOpen}
      handleFetchData={handleFetchData}
      savingsAccountFullName={savingsAccountFullName}
      savingsAccountBalance={savingsAccountBalance}
    />
  );
};
export default MatureContainer;
