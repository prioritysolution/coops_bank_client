import { doGetApiCall, doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";

export const getDepositAccountTypeDataAPI = async (orgId) => {
  let data = {
    url: endPoints.getDepositAccountTypeData(orgId),
  };

  let res = await doGetApiCall(data);
  return res;
};

export const getDepositProductDataAPI = async (orgId, typeId) => {
  let data = {
    url: endPoints.getDepositProductData(orgId, typeId),
  };

  let res = await doGetApiCall(data);
  return res;
};

export const getOpenDepositAccountDataAPI = async (type) => {
  let url = null;

  switch (type) {
    case "DURATIONTYPE":
      url = endPoints.getDurationTypeData;
      break;
    case "MATURITYINSTRUCTION":
      url = endPoints.getMaturityInstructionData;
      break;
    case "OPERATIONMODE":
      url = endPoints.getOperationModeData;
      break;
    case "PAYOUTMODE":
      url = endPoints.getPayoutModeData;
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

export const checkDepositAmountAPI = async (bodyData) => {
  let data = {
    url: endPoints.checkDepositAmount,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};

export const checkDepositDurationAPI = async (bodyData) => {
  let data = {
    url: endPoints.checkDepositDuration,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};

export const getDepositInterestRateAPI = async (bodyData) => {
  let data = {
    url: endPoints.getDepositInterestRate,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};

export const getDepositMaturityAmountAPI = async (bodyData) => {
  let data = {
    url: endPoints.getDepositMaturityAmount,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};

export const getDepositPayoutAmountAPI = async (bodyData) => {
  let data = {
    url: endPoints.getDepositPayoutAmount,
    bodyData,
  };

  let res = await doPostApiCall(data);
  return res;
};

export const getDepositAgentDataAPI = async (orgId) => {
  let data = {
    url: endPoints.getDepositAgentData(orgId),
  };

  let res = await doGetApiCall(data);
  return res;
};

export const getDepositEcsAccountAPI = async (orgId, memberId) => {
  let data = {
    url: endPoints.getDepositEcsAccount(orgId, memberId),
  };

  let res = await doGetApiCall(data);
  return res;
};

export const postOpenDepositAccountAPI = async (bodyData, content) => {
  let data = {
    url: endPoints.addDepositAccount,
    bodyData,
  };

  let res = await doPostApiCall(data, content);
  return res;
};
