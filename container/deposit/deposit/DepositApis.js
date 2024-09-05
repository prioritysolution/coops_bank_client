import { doGetApiCall, doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";

export const getAccountListAPI = async (orgId, type, value) => {
  let data = {
    url: endPoints.getAccountList(orgId, type, value),
  };

  let res = await doGetApiCall(data);
  return res;
};

export const getAccountDetailsByAccountNoAPI = async (bodyData) => {
  let data = {
    url: endPoints.getAccountDetailsByAccountNo,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};

export const postDepositAPI = async (bodyData) => {
  let data = {
    url: endPoints.addDeposit,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};
