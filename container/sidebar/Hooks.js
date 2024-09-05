"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { getSidebarDataAPI } from "./SidebarApis";
import { useDispatch } from "react-redux";
import { getSidebarData } from "./SidebarReducer";

export const useSidebar = () => {
  const dispatch = useDispatch();

  const getSidebarDataApiCall = async (orgId) => {
    try {
      const res = await getSidebarDataAPI(orgId);
      if (res.message === "Data Found") {
        dispatch(getSidebarData(res.Data));
      } else {
        dispatch(getSidebarData([]));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      dispatch(getSidebarData([]));
    }
  };

  return {
    getSidebarDataApiCall,
  };
};
