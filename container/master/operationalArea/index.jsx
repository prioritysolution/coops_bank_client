"use client";

import OperationalArea from "@/components/master/operationalArea";
import { useOperationalArea } from "./Hooks";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useEffect } from "react";

const OperationalAreaContainer = () => {
  const token = getSessionStorageData("userToken");
  const orgId = getSessionStorageData("orgId");

  const {
    stateId,
    districtId,
    activeForm,
    setActiveForm,
    postStateLoading,
    openDialouge,
    setOpenDialouge,
    masterOperationStateForm,
    masterOperationDistrictForm,
    masterOperationBlockForm,
    masterOperationPoliceStationForm,
    masterOperationPostOfficeForm,
    masterOperationVillageForm,
    masterOperationUnitForm,
    handleMasterOperationStateSubmit,
    handleMasterOperationDistrictSubmit,
    handleMasterOperationBlockSubmit,
    handleMasterOperationPoliceStationSubmit,
    handleMasterOperationPostOfficeSubmit,
    handleMasterOperationVillageSubmit,
    handleMasterOperationUnitSubmit,
    getMasterOperationalStateDataApiCall,
    getMasterOperationalDistrictDataApiCall,
    getMasterOperationalBlockDataApiCall,
    getMasterOperationalPoliceStationApiCall,
    getMasterOperationalPostOfficeApiCall,
    getMasterOperationalVillageDataApiCall,
    getMasterOperationalUnitDataApiCall,
    getMasterOperationalDistrictUnderStateDataApiCall,
    getMasterOperationalBlockUnderDistrictDataApiCall,
    editStateData,
    editDistrictData,
    editBlockData,
    editPoliceStationData,
    editPostOfficeData,
    editVillageData,
    editUnitData,
    handleEditStateData,
    handleEditDistrictData,
    handleEditBlockData,
    handleEditPoliceStationData,
    handleEditPostOfficeData,
    handleEditVillageData,
    handleEditUnitData,
  } = useOperationalArea();

  useEffect(() => {
    if (token && orgId) {
      switch (activeForm) {
        case 0:
          getMasterOperationalStateDataApiCall(orgId);
          break;
        case 1:
          getMasterOperationalStateDataApiCall(orgId);
          getMasterOperationalDistrictDataApiCall(orgId);
          break;
        case 2:
          getMasterOperationalStateDataApiCall(orgId);
          getMasterOperationalBlockDataApiCall(orgId);
          if (stateId.length > 0)
            getMasterOperationalDistrictUnderStateDataApiCall(stateId, orgId);
          break;
        case 3:
          getMasterOperationalStateDataApiCall(orgId);
          getMasterOperationalPoliceStationApiCall(orgId);
          if (stateId.length > 0)
            getMasterOperationalDistrictUnderStateDataApiCall(stateId, orgId);
          break;
        case 4:
          getMasterOperationalStateDataApiCall(orgId);
          getMasterOperationalPostOfficeApiCall(orgId);
          if (stateId.length > 0)
            getMasterOperationalDistrictUnderStateDataApiCall(stateId, orgId);
          break;
        case 5:
          getMasterOperationalStateDataApiCall(orgId);
          getMasterOperationalVillageDataApiCall(orgId);
          if (stateId.length > 0)
            getMasterOperationalDistrictUnderStateDataApiCall(stateId, orgId);
          if (districtId.length > 0) {
            getMasterOperationalBlockUnderDistrictDataApiCall(
              orgId,
              districtId,
              stateId
            );
          }
          break;
        case 6:
          getMasterOperationalUnitDataApiCall(orgId);
          break;
      }
    }
  }, [token, orgId, activeForm, stateId, districtId]);

  return (
    <OperationalArea
      activeForm={activeForm}
      setActiveForm={setActiveForm}
      postStateLoading={postStateLoading}
      openDialouge={openDialouge}
      setOpenDialouge={setOpenDialouge}
      masterOperationStateForm={masterOperationStateForm}
      masterOperationDistrictForm={masterOperationDistrictForm}
      masterOperationBlockForm={masterOperationBlockForm}
      masterOperationPoliceStationForm={masterOperationPoliceStationForm}
      masterOperationPostOfficeForm={masterOperationPostOfficeForm}
      masterOperationVillageForm={masterOperationVillageForm}
      masterOperationUnitForm={masterOperationUnitForm}
      handleMasterOperationStateSubmit={handleMasterOperationStateSubmit}
      handleMasterOperationDistrictSubmit={handleMasterOperationDistrictSubmit}
      handleMasterOperationBlockSubmit={handleMasterOperationBlockSubmit}
      handleMasterOperationPoliceStationSubmit={
        handleMasterOperationPoliceStationSubmit
      }
      handleMasterOperationPostOfficeSubmit={
        handleMasterOperationPostOfficeSubmit
      }
      handleMasterOperationVillageSubmit={handleMasterOperationVillageSubmit}
      handleMasterOperationUnitSubmit={handleMasterOperationUnitSubmit}
      editStateData={editStateData}
      editDistrictData={editDistrictData}
      editBlockData={editBlockData}
      editPoliceStationData={editPoliceStationData}
      editPostOfficeData={editPostOfficeData}
      editVillageData={editVillageData}
      editUnitData={editUnitData}
      handleEditStateData={handleEditStateData}
      handleEditDistrictData={handleEditDistrictData}
      handleEditBlockData={handleEditBlockData}
      handleEditPoliceStationData={handleEditPoliceStationData}
      handleEditPostOfficeData={handleEditPostOfficeData}
      handleEditVillageData={handleEditVillageData}
      handleEditUnitData={handleEditUnitData}
    />
  );
};
export default OperationalAreaContainer;
