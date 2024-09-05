"use client";

import LoginContainer from "@/container/auth/login";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const token = getSessionStorageData("userToken");
  const router = useRouter();

  useEffect(() => {
    if (token) router.push("/dashboard");
  }, [token, router]);

  return <LoginContainer />;
};

export default page;
