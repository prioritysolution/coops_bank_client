"use client";

import MembershipWithdrawn from "@/components/membership/membershipWithdrawn";
import { useMembershipWithdrawn } from "./Hooks";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useEffect } from "react";
import { useIssueMembership } from "../issueMembership/Hooks";

const MembershipWithdrawnContainer = () => {
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
  } = useMembershipWithdrawn();

  const { getNoteDenomApiCall } = useIssueMembership();

  useEffect(() => {
    if (token) {
      getNoteDenomApiCall();
    }
  }, [token]);

  return (
    <MembershipWithdrawn
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
export default MembershipWithdrawnContainer;
