import Sidebar from "@/components/sidebar";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useEffect } from "react";
import { useSidebar } from "./Hooks";

const SidebarContainer = () => {
  const token = getSessionStorageData("userToken");
  const orgId = getSessionStorageData("orgId");

  const { getSidebarDataApiCall } = useSidebar();

  useEffect(() => {
    if (token && orgId) {
      getSidebarDataApiCall(orgId);
    }
  }, [token, orgId]);

  return <Sidebar />;
};

export default SidebarContainer;
