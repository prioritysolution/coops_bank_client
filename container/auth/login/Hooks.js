"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userLoginAPI } from "./LoginApis"; // API call for logging in

export const useLogin = () => {
  const [os, setOS] = useState("Unknown");
  const [IP, setIP] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // Form validation schema
  const formSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  // Initialize the form with react-hook-form and yup resolver
  const loginForm = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const getOS = () => {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes("win")) return "Windows";
    if (platform.includes("mac")) return "MacOS";
    if (platform.includes("linux")) return "Linux";
    if (/iphone|ipod|ipad/.test(platform)) return "iOS";
    if (/android/.test(platform)) return "Android";
    return "Unknown";
  };

  // Handle form submission
  const handleLoginSubmit = (values) => {
    let data = {
      ...values,
      user_device: os,
      user_ip: IP,
    };
    userLoginApiCall(data);
  };

  // Function to call the login API
  const userLoginApiCall = async (item) => {
    setLoading(true);
    try {
      const res = await userLoginAPI(item);
      if (res.message === "Login Successful") {
        // Reset form and navigate on success
        loginForm.reset();
        toast.success("Logged In Successfully");

        sessionStorage.setItem("userToken", res.token);
        sessionStorage.setItem("orgId", res.org_id);
        sessionStorage.setItem("userName", res.User_Name);
        sessionStorage.setItem("userOrgName", res.org_name);
        sessionStorage.setItem("userBranchId", res.branch_id);
        sessionStorage.setItem("userBranchName", res.branch_name);
        router.push("/dashboard");
      } else {
        toast.error(res.details);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setOS(getOS());
    fetch("https://api-bdc.net/data/client-ip")
      .then((response) => response.json())
      .then((data) => setIP(data.ipString))
      .catch((error) => console.error("Error fetching IP address:", error));
  }, []);

  return {
    loginForm,
    loading,
    handleLoginSubmit,
  };
};
