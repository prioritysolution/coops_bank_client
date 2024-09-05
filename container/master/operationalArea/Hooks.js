"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import {
  getMasterBlockUnderDistrictAPI,
  getMasterDistrictUnderStateAPI,
  getMasterOperationalAPI,
  getMasterPoliceStationUnderDistrictAPI,
  getMasterPostOfficeUnderDistrictAPI,
  getMasterVillageUnderBlockAPI,
  postMasterOperationalAPI,
  updateMasterOperationalAPI,
} from "./OperationalAreaApis";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useDispatch } from "react-redux";
import {
  getBlockData,
  getBlockUnderDistrictData,
  getDistrictData,
  getDistrictUnderStateData,
  getPoliceStationData,
  getPoliceStationUnderDistrictData,
  getPostOfficeData,
  getPostOfficeUnderDistrictData,
  getStateData,
  getUnitData,
  getVillageData,
  getVillageUnderBlockData,
} from "./OperationalAreaReducer";

export const useOperationalArea = () => {
  const dispatch = useDispatch();
  const orgId = getSessionStorageData("orgId");

  const [activeForm, setActiveForm] = useState(0);

  const [postStateLoading, setPostStateLoading] = useState(false);
  const [openDialouge, setOpenDialouge] = useState(false);

  // * ============== EDIT DATA STATE AND HANDLE FUNCTIONS ============== *

  const [editStateData, setEditStateData] = useState(null);
  const [editDistrictData, setEditDistrictData] = useState(null);
  const [editBlockData, setEditBlockData] = useState(null);
  const [editPoliceStationData, setEditPoliceStationData] = useState(null);
  const [editPostOfficeData, setEditPostOfficeData] = useState(null);
  const [editVillageData, setEditVillageData] = useState(null);
  const [editUnitData, setEditUnitData] = useState(null);

  const handleEditStateData = (data) => {
    setEditStateData(data);
    setOpenDialouge(true);
  };

  const handleEditDistrictData = (data) => {
    setEditDistrictData(data);
    setOpenDialouge(true);
  };

  const handleEditBlockData = (data) => {
    setEditBlockData(data);
    setOpenDialouge(true);
  };

  const handleEditPoliceStationData = (data) => {
    setEditPoliceStationData(data);
    setOpenDialouge(true);
  };

  const handleEditPostOfficeData = (data) => {
    setEditPostOfficeData(data);
    setOpenDialouge(true);
  };

  const handleEditVillageData = (data) => {
    setEditVillageData(data);
    setOpenDialouge(true);
  };

  const handleEditUnitData = (data) => {
    setEditUnitData(data);
    setOpenDialouge(true);
  };

  // * ============== STATE FORM ============== *

  const stateFormSchema = yup.object({
    name: yup.string().required("State name is required"),
  });

  const masterOperationStateForm = useForm({
    resolver: yupResolver(stateFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleMasterOperationStateSubmit = (values) => {
    if (editStateData && Object.keys(editStateData).length > 0) {
      putMasterOperationalStateApiCall(editStateData.Id, orgId, values);
    } else {
      postMasterOperationalStateApiCall(orgId, values);
    }
  };

  const postMasterOperationalStateApiCall = async (orgId, item) => {
    let data = {
      state_name: item.name,
      org_id: orgId,
    };
    setPostStateLoading(true);
    try {
      const res = await postMasterOperationalAPI(data, "STATE");
      if (res.message === "Success") {
        toast.success(res.details);
        masterOperationStateForm.reset();
        setOpenDialouge(false);
        getMasterOperationalStateDataApiCall(orgId);
      } else toast.error(res.details);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setPostStateLoading(false);
    }
  };

  const putMasterOperationalStateApiCall = async (stateId, orgId, item) => {
    let data = {
      state_id: stateId,
      state_name: item.name,
      org_id: orgId,
    };
    setPostStateLoading(true);
    try {
      const res = await updateMasterOperationalAPI(data, "STATE");
      if (res.message === "Success") {
        toast.success(res.details);
        masterOperationStateForm.reset();
        setOpenDialouge(false);
        getMasterOperationalStateDataApiCall(orgId);
      } else toast.error(res.details);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setPostStateLoading(false);
    }
  };

  const getMasterOperationalStateDataApiCall = async (orgId) => {
    try {
      const res = await getMasterOperationalAPI(orgId, "STATE");
      if (res.message === "Data Found") {
        dispatch(getStateData(res.details));
      } else {
        dispatch(getStateData([]));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      dispatch(getStateData([]));
    }
  };

  // * ============== DISTRICT FORM ============== *

  const districtFormSchema = yup.object({
    name: yup.string().required("District name is required"),
    stateId: yup.string().required("State is required"),
  });

  const masterOperationDistrictForm = useForm({
    resolver: yupResolver(districtFormSchema),
    defaultValues: {
      name: "",
      stateId: "",
    },
  });

  const handleMasterOperationDistrictSubmit = (values) => {
    if (editDistrictData && Object.keys(editDistrictData).length > 0) {
      putMasterOperationalDistrictApiCall(editDistrictData.Id, orgId, values);
    } else {
      postMasterOperationalDistrictApiCall(orgId, values);
    }
  };

  const postMasterOperationalDistrictApiCall = async (orgId, item) => {
    let data = {
      state_id: item.stateId,
      dist_name: item.name,
      org_id: orgId,
    };
    setPostStateLoading(true);
    try {
      const res = await postMasterOperationalAPI(data, "DISTRICT");
      if (res.message === "Success") {
        toast.success(res.details);
        masterOperationDistrictForm.reset();
        setOpenDialouge(false);
        getMasterOperationalDistrictDataApiCall(orgId);
      } else toast.error(res.details);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setPostStateLoading(false);
    }
  };

  const putMasterOperationalDistrictApiCall = async (
    districtId,
    orgId,
    item
  ) => {
    let data = {
      dist_id: districtId,
      state_id: item.stateId,
      dist_name: item.name,
      org_id: orgId,
    };
    setPostStateLoading(true);
    try {
      const res = await updateMasterOperationalAPI(data, "DISTRICT");
      if (res.message === "Success") {
        toast.success(res.details);
        masterOperationDistrictForm.reset();
        setOpenDialouge(false);
        getMasterOperationalDistrictDataApiCall(orgId);
      } else toast.error(res.details);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setPostStateLoading(false);
    }
  };

  const getMasterOperationalDistrictDataApiCall = async (orgId) => {
    try {
      const res = await getMasterOperationalAPI(orgId, "DISTRICT");
      if (res.message === "Data Found") {
        dispatch(getDistrictData(res.details));
      } else {
        dispatch(getDistrictData([]));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      dispatch(getDistrictData([]));
    }
  };

  // * ============== BLOCK FORM ============== *

  const blockFormSchema = yup.object({
    name: yup.string().required("Block name is required"),
    stateId: yup.string().required("State is required"),
    districtId: yup.string().required("District is required"),
  });

  const masterOperationBlockForm = useForm({
    resolver: yupResolver(blockFormSchema),
    defaultValues: {
      name: "",
      stateId: "",
      districtId: "",
    },
  });

  let control = masterOperationBlockForm.control;

  let stateId = useWatch({ control }).stateId;

  const handleMasterOperationBlockSubmit = (values) => {
    if (editBlockData && Object.keys(editBlockData).length > 0) {
      putMasterOperationalBlockApiCall(editBlockData.Id, orgId, values);
    } else {
      postMasterOperationalBlockApiCall(orgId, values);
    }
  };

  const postMasterOperationalBlockApiCall = async (orgId, item) => {
    let data = {
      dist_id: item.districtId,
      state_id: item.stateId,
      block_name: item.name,
      org_id: orgId,
    };
    setPostStateLoading(true);
    try {
      const res = await postMasterOperationalAPI(data, "BLOCK");
      if (res.message === "Success") {
        toast.success(res.details);
        masterOperationBlockForm.reset();
        setOpenDialouge(false);
        getMasterOperationalBlockDataApiCall(orgId);
      } else toast.error(res.details);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setPostStateLoading(false);
    }
  };

  const putMasterOperationalBlockApiCall = async (blockId, orgId, item) => {
    let data = {
      block_id: blockId,
      dist_id: item.districtId,
      state_id: item.stateId,
      block_name: item.name,
      org_id: orgId,
    };
    setPostStateLoading(true);
    try {
      const res = await updateMasterOperationalAPI(data, "BLOCK");
      if (res.message === "Success") {
        toast.success(res.details);
        masterOperationBlockForm.reset();
        setOpenDialouge(false);
        getMasterOperationalBlockDataApiCall(orgId);
      } else toast.error(res.details);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setPostStateLoading(false);
    }
  };

  const getMasterOperationalBlockDataApiCall = async (orgId) => {
    try {
      const res = await getMasterOperationalAPI(orgId, "BLOCK");
      if (res.message === "Data Found") {
        dispatch(getBlockData(res.details));
      } else {
        dispatch(getBlockData([]));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      dispatch(getBlockData([]));
    }
  };

  const getMasterOperationalDistrictUnderStateDataApiCall = async (
    stateId,
    orgId
  ) => {
    try {
      const res = await getMasterDistrictUnderStateAPI(stateId, orgId);
      if (res.message === "Data Found") {
        dispatch(getDistrictUnderStateData(res.details));
      } else {
        dispatch(getDistrictUnderStateData([]));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      dispatch(getDistrictUnderStateData([]));
    }
  };

  // * ============== POLICE STATION FORM ============== *

  const policeStationFormSchema = yup.object({
    name: yup.string().required("Police station name is required"),
    stateId: yup.string().required("State is required"),
    districtId: yup.string().required("District is required"),
  });

  const masterOperationPoliceStationForm = useForm({
    resolver: yupResolver(policeStationFormSchema),
    defaultValues: {
      name: "",
      stateId: "",
      districtId: "",
    },
  });

  stateId = useWatch({
    control: masterOperationPoliceStationForm.control,
  }).stateId;

  const handleMasterOperationPoliceStationSubmit = (values) => {
    if (
      editPoliceStationData &&
      Object.keys(editPoliceStationData).length > 0
    ) {
      putMasterOperationalPoliceStationApiCall(
        editPoliceStationData.Id,
        orgId,
        values
      );
    } else {
      postMasterOperationalPoliceStationApiCall(orgId, values);
    }
  };

  const postMasterOperationalPoliceStationApiCall = async (orgId, item) => {
    let data = {
      dist_id: item.districtId,
      state_id: item.stateId,
      station_name: item.name,
      org_id: orgId,
    };
    setPostStateLoading(true);
    try {
      const res = await postMasterOperationalAPI(data, "POLICESTATION");
      if (res.message === "Success") {
        toast.success(res.details);
        masterOperationPoliceStationForm.reset();
        setOpenDialouge(false);
        getMasterOperationalPoliceStationApiCall(orgId);
      } else toast.error(res.details);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setPostStateLoading(false);
    }
  };

  const putMasterOperationalPoliceStationApiCall = async (
    policeId,
    orgId,
    item
  ) => {
    let data = {
      police_id: policeId,
      dist_id: item.districtId,
      state_id: item.stateId,
      station_name: item.name,
      org_id: orgId,
    };
    setPostStateLoading(true);
    try {
      const res = await updateMasterOperationalAPI(data, "POLICESTATION");
      if (res.message === "Success") {
        toast.success(res.details);
        masterOperationPoliceStationForm.reset();
        setOpenDialouge(false);
        getMasterOperationalPoliceStationApiCall(orgId);
      } else toast.error(res.details);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setPostStateLoading(false);
    }
  };

  const getMasterOperationalPoliceStationApiCall = async (orgId) => {
    try {
      const res = await getMasterOperationalAPI(orgId, "POLICESTATION");
      if (res.message === "Data Found") {
        dispatch(getPoliceStationData(res.details));
      } else {
        dispatch(getPoliceStationData([]));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      dispatch(getPoliceStationData([]));
    }
  };

  const getMasterOperationalPoliceStationUnderDistrictDataApiCall = async (
    orgId,
    distId
  ) => {
    try {
      const res = await getMasterPoliceStationUnderDistrictAPI(orgId, distId);
      if (res.message === "Data Found") {
        dispatch(getPoliceStationUnderDistrictData(res.details));
      } else {
        dispatch(getPoliceStationUnderDistrictData([]));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      dispatch(getPoliceStationUnderDistrictData([]));
    }
  };

  // * ============== POST STATION FORM ============== *

  const postOfficeFormSchema = yup.object({
    name: yup.string().required("Post office  name is required"),
    pin: yup
      .string()
      .matches(/^\d{6}$/, "Must be exactly 6 digits")
      .required("Pin Code is required"),
    stateId: yup.string().required("State is required"),
    districtId: yup.string().required("District is required"),
  });

  const masterOperationPostOfficeForm = useForm({
    resolver: yupResolver(postOfficeFormSchema),
    defaultValues: {
      name: "",
      pin: "",
      stateId: "",
      districtId: "",
    },
  });

  stateId = useWatch({
    control: masterOperationPostOfficeForm.control,
  }).stateId;

  const handleMasterOperationPostOfficeSubmit = (values) => {
    if (editPostOfficeData && Object.keys(editPostOfficeData).length > 0) {
      putMasterOperationalPostOfficeApiCall(
        editPostOfficeData.Id,
        orgId,
        values
      );
    } else {
      postMasterOperationalPostOfficeApiCall(orgId, values);
    }
  };

  const postMasterOperationalPostOfficeApiCall = async (orgId, item) => {
    let data = {
      dist_id: item.districtId,
      state_id: item.stateId,
      post_office_name: item.name,
      pin_code: item.pin,
      org_id: orgId,
    };
    setPostStateLoading(true);
    try {
      const res = await postMasterOperationalAPI(data, "POSTOFFICE");
      if (res.message === "Success") {
        toast.success(res.details);
        masterOperationPostOfficeForm.reset();
        setOpenDialouge(false);
        getMasterOperationalPostOfficeApiCall(orgId);
      } else toast.error(res.details);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setPostStateLoading(false);
    }
  };

  const putMasterOperationalPostOfficeApiCall = async (postId, orgId, item) => {
    let data = {
      post_id: postId,
      dist_id: item.districtId,
      state_id: item.stateId,
      post_office_name: item.name,
      pin_code: item.pin,
      org_id: orgId,
    };
    setPostStateLoading(true);
    try {
      const res = await updateMasterOperationalAPI(data, "POSTOFFICE");
      if (res.message === "Success") {
        toast.success(res.details);
        masterOperationPostOfficeForm.reset();
        setOpenDialouge(false);
        getMasterOperationalPostOfficeApiCall(orgId);
      } else toast.error(res.details);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setPostStateLoading(false);
    }
  };

  const getMasterOperationalPostOfficeApiCall = async (orgId) => {
    try {
      const res = await getMasterOperationalAPI(orgId, "POSTOFFICE");
      if (res.message === "Data Found") {
        dispatch(getPostOfficeData(res.details));
      } else {
        dispatch(getPostOfficeData([]));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      dispatch(getPostOfficeData([]));
    }
  };

  const getMasterOperationalPostOfficeUnderDistrictDataApiCall = async (
    orgId,
    distId
  ) => {
    try {
      const res = await getMasterPostOfficeUnderDistrictAPI(orgId, distId);
      if (res.message === "Data Found") {
        dispatch(getPostOfficeUnderDistrictData(res.details));
      } else {
        dispatch(getPostOfficeUnderDistrictData([]));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      dispatch(getPostOfficeUnderDistrictData([]));
    }
  };

  // * ============== VILLAGE FORM ============== *

  const villageFormSchema = yup.object({
    name: yup.string().required("Block name is required"),
    stateId: yup.string().required("State is required"),
    districtId: yup.string().required("District is required"),
    blockId: yup.string().required("Block is required"),
  });

  const masterOperationVillageForm = useForm({
    resolver: yupResolver(villageFormSchema),
    defaultValues: {
      name: "",
      stateId: "",
      districtId: "",
      blockId: "",
    },
  });

  stateId = useWatch({ control: masterOperationVillageForm.control }).stateId;

  let districtId = useWatch({
    control: masterOperationVillageForm.control,
  }).districtId;

  const handleMasterOperationVillageSubmit = (values) => {
    if (editVillageData && Object.keys(editVillageData).length > 0) {
      putMasterOperationalVillageApiCall(editVillageData.Id, orgId, values);
    } else {
      postMasterOperationalVillageApiCall(orgId, values);
    }
  };

  const postMasterOperationalVillageApiCall = async (orgId, item) => {
    let data = {
      dist_id: item.districtId,
      state_id: item.stateId,
      block_id: item.blockId,
      village_name: item.name,
      org_id: orgId,
    };
    setPostStateLoading(true);
    try {
      const res = await postMasterOperationalAPI(data, "VILLAGE");
      if (res.message === "Success") {
        toast.success(res.details);
        masterOperationVillageForm.reset();
        setOpenDialouge(false);
        getMasterOperationalVillageDataApiCall(orgId);
      } else toast.error(res.details);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setPostStateLoading(false);
    }
  };

  const putMasterOperationalVillageApiCall = async (villageId, orgId, item) => {
    let data = {
      vill_id: villageId,
      dist_id: item.districtId,
      state_id: item.stateId,
      block_name: item.name,
      org_id: orgId,
    };
    setPostStateLoading(true);
    try {
      const res = await updateMasterOperationalAPI(data, "VILLAGE");
      if (res.message === "Success") {
        toast.success(res.details);
        masterOperationVillageForm.reset();
        setOpenDialouge(false);
        getMasterOperationalVillageDataApiCall(orgId);
      } else toast.error(res.details);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setPostStateLoading(false);
    }
  };

  const getMasterOperationalVillageDataApiCall = async (orgId) => {
    try {
      const res = await getMasterOperationalAPI(orgId, "VILLAGE");
      if (res.message === "Data Found") {
        dispatch(getVillageData(res.details));
      } else {
        dispatch(getVillageData([]));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      dispatch(getVillageData([]));
    }
  };

  const getMasterOperationalBlockUnderDistrictDataApiCall = async (
    orgId,
    distId,
    stateId
  ) => {
    try {
      const res = await getMasterBlockUnderDistrictAPI(orgId, distId, stateId);
      if (res.message === "Data Found") {
        dispatch(getBlockUnderDistrictData(res.details));
      } else {
        dispatch(getBlockUnderDistrictData([]));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      dispatch(getBlockUnderDistrictData([]));
    }
  };

  const getMasterOperationalVillageUnderBlockDataApiCall = async (
    orgId,
    blockId
  ) => {
    try {
      const res = await getMasterVillageUnderBlockAPI(orgId, blockId);
      if (res.message === "Data Found") {
        dispatch(getVillageUnderBlockData(res.details));
      } else {
        dispatch(getVillageUnderBlockData([]));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      dispatch(getVillageUnderBlockData([]));
    }
  };

  // * ============== UNIT FORM ============== *

  const unitFormSchema = yup.object({
    name: yup.string().required("Unit name is required"),
    number: yup.number().required("Unit number is required"),
  });

  const masterOperationUnitForm = useForm({
    resolver: yupResolver(unitFormSchema),
    defaultValues: {
      name: "",
      number: "",
    },
  });

  const handleMasterOperationUnitSubmit = (values) => {
    if (editUnitData && Object.keys(editUnitData).length > 0) {
      putMasterOperationalUnitApiCall(editUnitData.Id, orgId, values);
    } else {
      postMasterOperationalUnitApiCall(orgId, values);
    }
  };

  const postMasterOperationalUnitApiCall = async (orgId, item) => {
    let data = {
      unit_name: item.name,
      unit_no: item.number,
      org_id: orgId,
    };
    setPostStateLoading(true);
    try {
      const res = await postMasterOperationalAPI(data, "UNIT");
      if (res.message === "Success") {
        toast.success(res.details);
        masterOperationUnitForm.reset();
        setOpenDialouge(false);
        getMasterOperationalUnitDataApiCall(orgId);
      } else toast.error(res.details);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setPostStateLoading(false);
    }
  };

  const putMasterOperationalUnitApiCall = async (unitId, orgId, item) => {
    let data = {
      unit_id: unitId,
      unit_name: item.name,
      unit_no: item.number,
      org_id: orgId,
    };
    setPostStateLoading(true);
    try {
      const res = await updateMasterOperationalAPI(data, "UNIT");
      if (res.message === "Success") {
        toast.success(res.details);
        masterOperationUnitForm.reset();
        setOpenDialouge(false);
        getMasterOperationalUnitDataApiCall(orgId);
      } else toast.error(res.details);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setPostStateLoading(false);
    }
  };

  const getMasterOperationalUnitDataApiCall = async (orgId) => {
    try {
      const res = await getMasterOperationalAPI(orgId, "UNIT");
      if (res.message === "Data Found") {
        dispatch(getUnitData(res.details));
      } else {
        dispatch(getUnitData([]));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      dispatch(getUnitData([]));
    }
  };

  // * ============== EDIT FORM STATE HANDLES ============== *

  useEffect(() => {
    if (editStateData && Object.keys(editStateData).length > 0) {
      masterOperationStateForm.reset({ name: editStateData.State_Name });
    } else {
      masterOperationStateForm.reset({ name: "" });
    }
  }, [editStateData, masterOperationStateForm.reset]);

  useEffect(() => {
    if (editDistrictData && Object.keys(editDistrictData).length > 0) {
      masterOperationDistrictForm.reset({
        name: editDistrictData.Dist_Name,
        stateId: editDistrictData.State_Id.toString(),
      });
    } else {
      masterOperationDistrictForm.reset({ name: "", stateId: "" });
    }
  }, [editDistrictData, masterOperationDistrictForm.reset]);

  useEffect(() => {
    if (editBlockData && Object.keys(editBlockData).length > 0) {
      masterOperationBlockForm.reset({
        name: editBlockData.Block_Name,
        stateId: editBlockData.State_Id.toString(),
        districtId: editBlockData.Dist_Id.toString(),
      });
    } else {
      masterOperationBlockForm.reset({
        name: "",
        stateId: "",
        districtId: "",
      });
    }
  }, [editBlockData, masterOperationBlockForm.reset]);

  useEffect(() => {
    if (
      editPoliceStationData &&
      Object.keys(editPoliceStationData).length > 0
    ) {
      masterOperationPoliceStationForm.reset({
        name: editPoliceStationData.STation_Name,
        stateId: editPoliceStationData.State_Id.toString(),
        districtId: editPoliceStationData.Dist_Id.toString(),
      });
    } else {
      masterOperationPoliceStationForm.reset({
        name: "",
        stateId: "",
        districtId: "",
      });
    }
  }, [editPoliceStationData, masterOperationPoliceStationForm.reset]);

  useEffect(() => {
    if (editPostOfficeData && Object.keys(editPostOfficeData).length > 0) {
      masterOperationPostOfficeForm.reset({
        name: editPostOfficeData.Post_Off_Name,
        pin: editPostOfficeData.Pin_Code,
        stateId: editPostOfficeData.State_Id.toString(),
        districtId: editPostOfficeData.Dist_Id.toString(),
      });
    } else {
      masterOperationPostOfficeForm.reset({
        name: "",
        pin: "",
        stateId: "",
        districtId: "",
      });
    }
  }, [editPostOfficeData, masterOperationPostOfficeForm.reset]);

  useEffect(() => {
    if (editVillageData && Object.keys(editVillageData).length > 0) {
      masterOperationVillageForm.reset({
        name: editVillageData.Vill_Name,
        stateId: editVillageData.State_Id.toString(),
        districtId: editVillageData.Dist_Id.toString(),
        blockId: editVillageData.Block_Id.toString(),
      });
    } else {
      masterOperationVillageForm.reset({
        name: "",
        stateId: "",
        districtId: "",
        blockId: "",
      });
    }
  }, [editVillageData, masterOperationVillageForm.reset]);

  useEffect(() => {
    if (editUnitData && Object.keys(editUnitData).length > 0) {
      masterOperationUnitForm.reset({
        name: editUnitData.Unit_Name,
        number: editUnitData.Unit_No,
      });
    } else {
      masterOperationUnitForm.reset({
        name: "",
        number: "",
      });
    }
  }, [editUnitData, masterOperationUnitForm.reset]);

  useEffect(() => {
    if (!openDialouge) {
      setEditStateData(null);
      setEditDistrictData(null);
      setEditBlockData(null);
      setEditPoliceStationData(null);
      setEditPostOfficeData(null);
      setEditVillageData(null);
      setEditUnitData(null);
      masterOperationStateForm.reset();
      masterOperationDistrictForm.reset();
      masterOperationBlockForm.reset();
      masterOperationPoliceStationForm.reset();
      masterOperationPostOfficeForm.reset();
      masterOperationVillageForm.reset();
      masterOperationUnitForm.reset();
    }
  }, [openDialouge]);

  return {
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
    getMasterOperationalPoliceStationUnderDistrictDataApiCall,
    getMasterOperationalPostOfficeUnderDistrictDataApiCall,
    getMasterOperationalVillageUnderBlockDataApiCall,
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
  };
};
