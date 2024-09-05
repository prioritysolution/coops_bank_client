"use client";

import { useDispatch } from "react-redux";
import * as yup from "yup";
import { getMemberProfileAPI, postMemberProfileAPI } from "./MemberProfileApis";
import {
  getCasteData,
  getGenderData,
  getRelationTypeData,
  getReligionData,
} from "./MemberProfileReducer";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import getSessionStorageData from "@/utils/getSessionStorageData";
import toast from "react-hot-toast";

export const useMemberProfile = () => {
  const dispatch = useDispatch();

  const orgId = getSessionStorageData("orgId");
  const finId = getSessionStorageData("finId");

  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [memberNo, setMemberNo] = useState("");

  const formSchema = yup.object({
    memberNo: yup.number().required("Member no. is required"),
    firstName: yup.string().required("State is required"),
    middleName: yup.string(),
    lastName: yup.string().required("Last name is required"),
    relationName: yup.string().required("Relation name is required"),
    relationType: yup.string().required("Relation type is required"),
    dob: yup.date().required("DOB is required"),
    gender: yup.string().required("Gender is required"),
    caste: yup.string().required("Caste is required"),
    religion: yup.string().required("Religion is required"),
    mobile: yup.string(),
    email: yup.string().email("Invalid email"),
    address: yup.string().required("Address is required"),
    stateId: yup.string().required("State is required"),
    districtId: yup.string().required("District is required"),
    blockId: yup.string().required("Block is required"),
    villageId: yup.string().required("Village is required"),
    policeStationId: yup.string().required("Police station is required"),
    postOfficeId: yup.string().required("Post office is required"),
    unitId: yup.string(),
    aadhaarNo: yup.string(),
    voterId: yup.string(),
    rationNo: yup.string(),
    panNo: yup.string(),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      memberNo: 0,
      firstName: "",
      middleName: "",
      lastName: "",
      relationName: "",
      relationType: "",
      dob: null,
      gender: "",
      caste: "",
      religion: "",
      mobile: "",
      email: "",
      address: "",
      stateId: "",
      districtId: "",
      blockId: "",
      villageId: "",
      policeStationId: "",
      postOfficeId: "",
      unitId: "",
      aadhaarNo: "",
      voterId: "",
      rationNo: "",
      panNo: "",
    },
  });

  const { control } = form;
  const { stateId, districtId, blockId } = useWatch({ control });

  const handleSubmit = (values) => {
    postMemberProfileApiCall(values);
  };

  const postMemberProfileApiCall = async (item) => {
    let data = {
      member_no: item.memberNo,
      mem_fst_name: item.firstName,
      mem_mid_name: item.middleName,
      mem_lst_name: item.lastName,
      mem_rela_name: item.relationName,
      mem_rel_type: item.relationType,
      mem_dob: item.dob.toISOString().slice(0, 10),
      mem_gend: item.gender,
      mem_caste: item.caste,
      mem_relig: item.religion,
      mem_mob: item.mobile,
      mem_mail: item.email,
      mem_add: item.address,
      mem_state: item.stateId,
      mem_dist: item.districtId,
      mem_block: item.blockId,
      mem_village: item.villageId,
      mem_police: item.policeStationId,
      mem_post: item.postOfficeId,
      mem_unit: item.unitId,
      mem_aadhar: item.aadhaarNo,
      mem_voter: item.voterId,
      mem_ration: item.rationNo,
      mem_pan: item.panNo,
      fin_id: finId,
      org_id: orgId,
    };
    setLoading(true);
    try {
      const res = await postMemberProfileAPI(data);
      if (res.message === "Success") {
        toast.success(res.details);
        setSuccessMessage(res.details);
        setMemberNo(item.memberNo);
        form.reset();
      } else toast.error(res.message);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getRelationTypeDataApiCall = async () => {
    try {
      const res = await getMemberProfileAPI("RELATIONTYPE");
      if (res.message === "Data Found") {
        dispatch(getRelationTypeData(res.details));
      } else {
        dispatch(getRelationTypeData([]));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      dispatch(getRelationTypeData([]));
    }
  };

  const getGenderDataApiCall = async () => {
    try {
      const res = await getMemberProfileAPI("GENDER");
      if (res.message === "Data Found") {
        dispatch(getGenderData(res.details));
      } else {
        dispatch(getGenderData([]));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      dispatch(getGenderData([]));
    }
  };

  const getCasteDataApiCall = async () => {
    try {
      const res = await getMemberProfileAPI("CASTE");
      if (res.message === "Data Found") {
        dispatch(getCasteData(res.details));
      } else {
        dispatch(getCasteData([]));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      dispatch(getCasteData([]));
    }
  };

  const getReligionDataApiCall = async () => {
    try {
      const res = await getMemberProfileAPI("RELIGION");
      if (res.message === "Data Found") {
        dispatch(getReligionData(res.details));
      } else {
        dispatch(getReligionData([]));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      dispatch(getReligionData([]));
    }
  };

  const handleDeleteSuccessMessage = () => {
    setSuccessMessage("");
    setMemberNo("");
  };

  return {
    stateId,
    districtId,
    blockId,
    getRelationTypeDataApiCall,
    getGenderDataApiCall,
    getCasteDataApiCall,
    getReligionDataApiCall,
    handleSubmit,
    form,
    successMessage,
    memberNo,
    handleDeleteSuccessMessage,
  };
};
