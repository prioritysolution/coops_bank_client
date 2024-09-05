import { doGetApiCall, doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";

export const getBankAccountTypeAPI = async () => {
  let data = {
    url: endPoints.getBankAccountType,
  };

  let res = await doGetApiCall(data);
  return res;
};

export const getBankGlAPI = async () => {
  let data = {
    url: endPoints.getBankGl,
  };

  let res = await doGetApiCall(data);
  return res;
};

export const postOpenBankAccountAPI = async (bodyData) => {
  let data = {
    url: endPoints.addOpenBankAccount,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};
