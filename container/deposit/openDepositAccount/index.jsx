"use client";

import OpenDepositAccount from "@/components/deposit/openDepositAccount";
import { useOpenDepositAccount } from "./Hooks";
import { useEffect } from "react";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useIssueMembership } from "@/container/membership/issueMembership/Hooks";
import { useMemberProfile } from "@/container/membership/memberProfile/Hooks";

const OpenDepositAccountContainer = () => {
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
    getDepositAccountTypeDataApiCall,
    getDurationTypeDataApiCall,
    getMaturityInstructionDataApiCall,
    getOperationModeDataApiCall,
    getPayoutModeDataApiCall,
    form,
    handleSubmit,
    handleMemberFormSubmit,
    visibleBlock,
    admissionDisable,
    successMessage,
    handleJointAccountAdd,
    handleJointAccountDelete,
    jointMemberDialougeOpen,
    deleteJointMemberDialougeOpen,
    checkDepositAmountDisable,
    checkDepositAmountMessage,
    checkDepositDurationDisable,
    checkDepositDurationMessage,
  } = useOpenDepositAccount();

  const { getNoteDenomApiCall } = useIssueMembership();

  const { getRelationTypeDataApiCall } = useMemberProfile();

  useEffect(() => {
    if (token && orgId) {
      getNoteDenomApiCall();
      getDepositAccountTypeDataApiCall(orgId);
      getDurationTypeDataApiCall();
      getRelationTypeDataApiCall();
      getMaturityInstructionDataApiCall();
      getOperationModeDataApiCall();
      getPayoutModeDataApiCall();
    }
  }, [token, orgId]);

  return (
    <OpenDepositAccount
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
      admissionDisable={admissionDisable}
      successMessage={successMessage}
      handleJointAccountAdd={handleJointAccountAdd}
      handleJointAccountDelete={handleJointAccountDelete}
      jointMemberDialougeOpen={jointMemberDialougeOpen}
      deleteJointMemberDialougeOpen={deleteJointMemberDialougeOpen}
      checkDepositAmountDisable={checkDepositAmountDisable}
      checkDepositAmountMessage={checkDepositAmountMessage}
      checkDepositDurationDisable={checkDepositDurationDisable}
      checkDepositDurationMessage={checkDepositDurationMessage}
    />
  );
};
export default OpenDepositAccountContainer;
