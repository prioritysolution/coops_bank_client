"use client";

import DepositAgent from "@/components/master/depositAgent";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useEffect } from "react";
import { useDepositAgent } from "./Hooks";

const DepositAgentContainer = () => {
  const orgId = getSessionStorageData("orgId");

  const { form, handleSubmit, loading, getPaymentTypeDataApiCall } =
    useDepositAgent();

  useEffect(() => {
    if (orgId) {
      getPaymentTypeDataApiCall();
    }
  }, [orgId]);

  return (
    <DepositAgent form={form} handleSubmit={handleSubmit} loading={loading} />
  );
};
export default DepositAgentContainer;
