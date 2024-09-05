import { doGetApiCall, doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";

export const getPaymentTypeAPI = async () => {
  let data = {
    url: endPoints.getAgentPayout,
  };

  let res = await doGetApiCall(data);
  return res;
};

export const postDepositAgentAPI = async (bodyData) => {
  let data = {
    url: endPoints.addDepositAgent,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};
