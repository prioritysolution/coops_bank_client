"use client";

import OperationalAreaCard from "@/common/cards/OperationalAreaCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import StateForm from "./state/StateForm";
import StateTable from "./state/StateTable";
import DistrictForm from "./district/DistrictForm";
import BlockForm from "./block/BlockForm";
import PoliceStationForm from "./policeStation/PoliceStationForm";
import PostOfficeForm from "./postOffice/PostOfficeForm";
import VillageForm from "./village/VillageForm";
import UnitForm from "./unit/UnitForm";
import { useSelector } from "react-redux";
import DistrictTable from "./district/DistrictTable";
import BlockTable from "./block/BlockTable";
import PoliceStationTable from "./policeStation/PoliceStationTable";
import PostOfficeTable from "./postOffice/PostOfficeTable";
import UnitTable from "./unit/UnitTable";

const OperationalArea = ({
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
}) => {
  const stateListData = useSelector(
    (state) =>
      state.operationalArea.stateData && state.operationalArea.stateData
  );

  const districtListData = useSelector(
    (state) =>
      state.operationalArea.districtData && state.operationalArea.districtData
  );

  const blockListData = useSelector(
    (state) =>
      state.operationalArea.blockData && state.operationalArea.blockData
  );

  const policeStationListData = useSelector(
    (state) =>
      state.operationalArea.policeStationData &&
      state.operationalArea.policeStationData
  );

  const postOfficeListData = useSelector(
    (state) =>
      state.operationalArea.postOfficeData &&
      state.operationalArea.postOfficeData
  );

  const unitListData = useSelector(
    (state) => state.operationalArea.unitData && state.operationalArea.unitData
  );

  const districtListUnderStateData = useSelector(
    (state) =>
      state.operationalArea.districtUnderStateData &&
      state.operationalArea.districtUnderStateData
  );

  const blockListUnderDistrictData = useSelector(
    (state) =>
      state.operationalArea.blockUnderDistrict &&
      state.operationalArea.blockUnderDistrict
  );

  const formList = [
    {
      label: "State",
      form: (
        <StateForm
          loading={postStateLoading}
          form={masterOperationStateForm}
          handleSubmit={handleMasterOperationStateSubmit}
          editData={editStateData}
        />
      ),
      table: (
        <StateTable
          data={stateListData ? stateListData : []}
          handleEditData={handleEditStateData}
        />
      ),
    },
    {
      label: "District",
      form: (
        <DistrictForm
          loading={postStateLoading}
          form={masterOperationDistrictForm}
          handleSubmit={handleMasterOperationDistrictSubmit}
          editData={editDistrictData}
          stateData={stateListData}
        />
      ),
      table: (
        <DistrictTable
          data={districtListData ? districtListData : []}
          handleEditData={handleEditDistrictData}
        />
      ),
    },
    {
      label: "Block",
      form: (
        <BlockForm
          loading={postStateLoading}
          form={masterOperationBlockForm}
          handleSubmit={handleMasterOperationBlockSubmit}
          editData={editBlockData}
          stateData={stateListData}
          districtData={districtListUnderStateData}
        />
      ),
      table: (
        <BlockTable
          data={blockListData ? blockListData : []}
          handleEditData={handleEditBlockData}
        />
      ),
    },
    {
      label: "Police Station",
      form: (
        <PoliceStationForm
          loading={postStateLoading}
          form={masterOperationPoliceStationForm}
          handleSubmit={handleMasterOperationPoliceStationSubmit}
          editData={editPoliceStationData}
          stateData={stateListData}
          districtData={districtListUnderStateData}
        />
      ),
      table: (
        <PoliceStationTable
          data={policeStationListData ? policeStationListData : []}
          handleEditData={handleEditPoliceStationData}
        />
      ),
    },
    {
      label: "Post Office",
      form: (
        <PostOfficeForm
          loading={postStateLoading}
          form={masterOperationPostOfficeForm}
          handleSubmit={handleMasterOperationPostOfficeSubmit}
          editData={editPostOfficeData}
          stateData={stateListData}
          districtData={districtListUnderStateData}
        />
      ),
      table: (
        <PostOfficeTable
          data={postOfficeListData ? postOfficeListData : []}
          handleEditData={handleEditPostOfficeData}
        />
      ),
    },
    {
      label: "Village",
      form: (
        <VillageForm
          loading={postStateLoading}
          form={masterOperationVillageForm}
          handleSubmit={handleMasterOperationVillageSubmit}
          editData={editVillageData}
          stateData={stateListData}
          districtData={districtListUnderStateData}
          blockData={blockListUnderDistrictData}
        />
      ),
      table: (
        <UnitTable
          data={unitListData ? unitListData : []}
          handleEditData={handleEditUnitData}
        />
      ),
    },
    {
      label: "Unit",
      form: (
        <UnitForm
          loading={postStateLoading}
          form={masterOperationUnitForm}
          handleSubmit={handleMasterOperationUnitSubmit}
          editData={editUnitData}
        />
      ),
      table: (
        <UnitTable
          data={unitListData ? unitListData : []}
          handleEditData={handleEditUnitData}
        />
      ),
    },
  ];

  const handleFormClick = (id) => {
    setActiveForm(id);
  };

  return (
    <div className="w-full h-full flex justify-between p-5 bg-[#fefefe] rounded-lg ">
      <div className=" h-full flex flex-col lg:flex-row items-center lg:items-start justify-center border-primary rounded-lg border-[2px] p-5 w-full gap-5 xl:gap-20 overflow-hidden">
        <div
          className="h-fit lg:h-full w-full lg:w-1/5 flex  flex-wrap lg:flex-nowrap lg:flex-col lg:items-stretch gap-5 lg:gap-2
         lg:justify-between"
        >
          {formList.map((item, id) => (
            <div key={id} onClick={() => handleFormClick(id)}>
              <OperationalAreaCard
                label={item.label}
                active={id === activeForm}
              />
            </div>
          ))}
        </div>
        <div className="h-full w-full text-center flex flex-col items-center gap-5 overflow-y-scroll">
          <h2 className="text-lg sm:text-2xl font-semibold">
            Operational Area {formList[activeForm].label}
          </h2>
          <div className="w-full flex items-center justify-end">
            <Dialog open={openDialouge} onOpenChange={setOpenDialouge}>
              <DialogTrigger asChild>
                <Button className="px-10 py-7 text-lg">
                  Add {formList[activeForm].label}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] py-5">
                <DialogHeader>
                  <DialogTitle>Add {formList[activeForm].label}</DialogTitle>
                </DialogHeader>
                {formList[activeForm].form}
              </DialogContent>
            </Dialog>
          </div>
          <div className=" w-[300px] sm:w-full h-full sm:overflow-y-scroll">
            {formList[activeForm].table && formList[activeForm].table}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OperationalArea;
