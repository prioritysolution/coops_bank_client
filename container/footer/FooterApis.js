import { doGetApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";

export const getFinancialYearAPI = async (orgId) => {
  let data = {
    url: endPoints.getFinancialYear(orgId),
  };

  let res = await doGetApiCall(data);
  return res;
};
