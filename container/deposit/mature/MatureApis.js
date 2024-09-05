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

export const postDepositCloseAccountAPI = async (bodyData) => {
  let data = {
    url: endPoints.addDepositCloseAccount,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};
