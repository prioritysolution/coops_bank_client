import { doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";

export const userLoginAPI = async (body) => {
  let url = endPoints.login;
  let data = {
    url,
    bodyData: body,
  };
  let res = await doPostApiCall(data);
  return res;
};
