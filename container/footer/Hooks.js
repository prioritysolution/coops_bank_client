"use client";
import toast from "react-hot-toast";
import { getFinancialYearAPI } from "./FooterApis";
import { getFooterData } from "./FooterReducer";
import { useDispatch } from "react-redux";

export const useFooter = () => {
  const dispatch = useDispatch();

  const getFinancialYearApiCall = async (orgId) => {
    try {
      const res = await getFinancialYearAPI(orgId);
      if (res.message === "Data Found") {
        dispatch(getFooterData(res.details[0]));
        sessionStorage.setItem("finId", res.details[0].Id);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return {
    getFinancialYearApiCall,
  };
};
