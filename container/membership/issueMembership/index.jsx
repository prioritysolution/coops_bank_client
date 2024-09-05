"use client";
import IssueMembership from "@/components/membership/issueMembership";
import { useIssueMembership } from "./Hooks";
import { useEffect } from "react";
import { useShareProduct } from "@/container/master/shareProduct/Hooks";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useMemberProfile } from "../memberProfile/Hooks";
import { useBankDeposit } from "@/container/banking/bankDeposit/Hooks";

const IssueMembershipContainer = () => {
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
    getNoteDenomApiCall,
    handleInDenominatorChange,
    handleOutDenominatorChange,
    form,
    handleSubmit,
    handleMemberFormSubmit,
    visibleBlock,
    admissionDisable,
    successMessage,
    transMode,
  } = useIssueMembership();

  const { getMemberTypeDataApiCall } = useShareProduct();

  const { getRelationTypeDataApiCall } = useMemberProfile();

  const { getBankAccountApiCall } = useBankDeposit();

  useEffect(() => {
    if (token && orgId) {
      getMemberTypeDataApiCall();
      getNoteDenomApiCall();
      getRelationTypeDataApiCall();
      getBankAccountApiCall(orgId);
    }
  }, [token, orgId]);

  return (
    <IssueMembership
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
      transMode={transMode}
    />
  );
};
export default IssueMembershipContainer;
