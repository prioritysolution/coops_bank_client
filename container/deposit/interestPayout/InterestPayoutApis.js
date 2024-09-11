import { doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";

export const getDepositPayoutAccountAPI = async (bodyData) => {
  let data = {
    url: endPoints.getDepositPayoutAccount,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};

export const postDepositSinglePayoutAccountAPI = async (bodyData) => {
  let data = {
    url: endPoints.addDepositSinglePayoutAccount,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};

export const postDepositBulkPayoutAccountAPI = async (bodyData) => {
  let data = {
    url: endPoints.addDepositBulkPayoutAccount,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};
