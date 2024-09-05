"use client";

import ShareProduct from "@/components/master/shareProduct";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useEffect } from "react";
import { useShareProduct } from "./Hooks";

const ShareProductContainer = () => {
  const token = getSessionStorageData("userToken");

  const { getMemberTypeDataApiCall, loading, form, handleSubmit } =
    useShareProduct();

  useEffect(() => {
    if (token) {
      getMemberTypeDataApiCall();
    }
  }, [token]);

  return (
    <ShareProduct loading={loading} form={form} handleSubmit={handleSubmit} />
  );
};
export default ShareProductContainer;
