"use client";
import { useState } from "react";
import { postLogoutAPI } from "./NavbarApis";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const postLogoutApiCall = async () => {
    setLogoutLoading(true);
    try {
      const res = await postLogoutAPI();
      if (res.message === "Success") {
        sessionStorage.clear();
        toast.success("Logged out successfully");
      } else {
        sessionStorage.clear();
        toast.error(res.message);
      }
      router.push("/login");
    } catch (error) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLogoutLoading(false);
    }
  };
  return {
    postLogoutApiCall,
  };
};
