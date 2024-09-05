import Footer from "@/components/footer";
import { useFooter } from "./Hooks";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useEffect } from "react";

const FooterContainer = () => {
  const token = getSessionStorageData("userToken");
  const orgId = getSessionStorageData("orgId");

  const { getFinancialYearApiCall } = useFooter();

  useEffect(() => {
    if (token && orgId) {
      getFinancialYearApiCall(orgId);
    }
  }, [token, orgId]);

  return <Footer />;
};

export default FooterContainer;
