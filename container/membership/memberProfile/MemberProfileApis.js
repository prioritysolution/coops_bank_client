import { doGetApiCall, doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";

export const getMemberProfileAPI = async (type) => {
  let url = null;
  switch (type) {
    case "RELATIONTYPE":
      url = endPoints.getRelationTypeData;
      break;
    case "GENDER":
      url = endPoints.getGenderData;
      break;
    case "CASTE":
      url = endPoints.getCasteData;
      break;
    case "RELIGION":
      url = endPoints.getReligionData;
      break;
    default:
      url = null;
  }

  let data = {
    url,
  };

  let res = await doGetApiCall(data);
  return res;
};

export const postMemberProfileAPI = async (bodyData) => {
  let data = {
    url: endPoints.postMemberProfile,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};
