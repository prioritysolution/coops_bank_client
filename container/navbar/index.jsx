"use client";

import Navbar from "@/components/navbar";
import { useLogout } from "./Hooks";
import { useEffect, useState } from "react";
import getSessionStorageData from "@/utils/getSessionStorageData";

const NavbarContainer = () => {
  const [orgName, setOrgName] = useState("");

  const { postLogoutApiCall } = useLogout();

  useEffect(() => {
    setOrgName(getSessionStorageData("userOrgName"));
  }, []);

  return <Navbar handleLogout={postLogoutApiCall} orgName={orgName} />;
};

export default NavbarContainer;
