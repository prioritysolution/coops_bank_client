import { doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";

export const getShareIssueDataByIdAPI = async (bodyData) => {
  let data = {
    url: endPoints.getShareIssueDataById,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};

export const postShareIssueAPI = async (bodyData) => {
  let data = {
    url: endPoints.addShareIssue,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};
