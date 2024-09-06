import { doGetApiCall, doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";

export const getDepositCloseAccountAPI = async (bodyData) => {
  let data = {
    url: endPoints.getDepositCloseAccount,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};

export const getDepositMatureAccountAPI = async (bodyData) => {
  let data = {
    url: endPoints.getDepositMatureAccount,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};

export const getDepositMaturityInterestAPI = async (bodyData) => {
  let data = {
    url: endPoints.getDepositMaturityInterest,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};

export const getDepositMaturityBonusInterestAPI = async (bodyData) => {
  let data = {
    url: endPoints.getDepositMaturityBonusInterest,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};

export const postDepositCloseAccountAPI = async (bodyData) => {
  let data = {
    url: endPoints.addDepositCloseAccount,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};

export const postDepositMatureAccountAPI = async (bodyData) => {
  let data = {
    url: endPoints.addDepositMatureAccount,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};
