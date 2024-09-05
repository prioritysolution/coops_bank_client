"use client";

import MemberProfile from "@/components/membership/memberProfile";
import { useMemberProfile } from "./Hooks";
import { useEffect } from "react";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useOperationalArea } from "@/container/master/operationalArea/Hooks";
import { useFooter } from "@/container/footer/Hooks";

const MemberProfileContainer = () => {
  const token = getSessionStorageData("userToken");
  const orgId = getSessionStorageData("orgId");

  const {
    stateId,
    districtId,
    blockId,
    getRelationTypeDataApiCall,
    getGenderDataApiCall,
    getCasteDataApiCall,
    getReligionDataApiCall,
    form,
    handleSubmit,
    successMessage,
    memberNo,
    handleDeleteSuccessMessage,
  } = useMemberProfile();

  const {
    getMasterOperationalStateDataApiCall,
    getMasterOperationalDistrictUnderStateDataApiCall,
    getMasterOperationalBlockUnderDistrictDataApiCall,
    getMasterOperationalPoliceStationUnderDistrictDataApiCall,
    getMasterOperationalPostOfficeUnderDistrictDataApiCall,
    getMasterOperationalVillageUnderBlockDataApiCall,
    getMasterOperationalUnitDataApiCall,
  } = useOperationalArea();

  useEffect(() => {
    if (token && orgId) {
      getRelationTypeDataApiCall();
      getGenderDataApiCall();
      getCasteDataApiCall();
      getReligionDataApiCall();
      getMasterOperationalStateDataApiCall(orgId);
      if (stateId.length > 0) {
        getMasterOperationalDistrictUnderStateDataApiCall(stateId, orgId);
        if (districtId.length > 0) {
          getMasterOperationalBlockUnderDistrictDataApiCall(
            orgId,
            districtId,
            stateId
          );
          getMasterOperationalPoliceStationUnderDistrictDataApiCall(
            orgId,
            districtId
          );
          getMasterOperationalPostOfficeUnderDistrictDataApiCall(
            orgId,
            districtId
          );
          if (blockId.length > 0) {
            getMasterOperationalVillageUnderBlockDataApiCall(orgId, blockId);
          }
        }
      }
      getMasterOperationalUnitDataApiCall(orgId);
    }
  }, [token, orgId, stateId, districtId, blockId]);

  return (
    <MemberProfile
      form={form}
      handleSubmit={handleSubmit}
      successMessage={successMessage}
      memberNo={memberNo}
      handleDeleteSuccessMessage={handleDeleteSuccessMessage}
    />
  );
};
export default MemberProfileContainer;
