import { doGetApiCall, doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";

export const getDepositInterestProductAPI = async (orgId, typeId) => {
  let data = {
    url: endPoints.getDepositInterestProduct(orgId, typeId),
  };

  let res = await doGetApiCall(data);
  return res;
};

export const postDepositInterestSetupAPI = async (bodyData) => {
  let data = {
    url: endPoints.addDepositInterestSetup,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};
