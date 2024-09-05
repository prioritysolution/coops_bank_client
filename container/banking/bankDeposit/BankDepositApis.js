import { doGetApiCall, doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";

export const getBankAccountAPI = async (orgId) => {
  let data = {
    url: endPoints.getBankAccount(orgId),
  };

  let res = await doGetApiCall(data);
  return res;
};

export const getBankBalanceAPI = async (bodyData) => {
  let data = {
    url: endPoints.getBankBalance,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};

export const postBankDepositAPI = async (bodyData) => {
  let data = {
    url: endPoints.addBankDeposit,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};
