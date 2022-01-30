import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDoctorAPI, getUserAPI } from "views/examples/profile/api/user-api";

import {
  addDoctorAPI,
  getDoctorListAPI,
  deleteDoctorAPI,
  getUsersAPI,
} from "./doctor-api";

export const addDoctorThunk = createAsyncThunk(
  "doctor/addDoctor",
  async (data, { dispatch }) => {
    const response = await addDoctorAPI(data);

    return response;
  }
);

export const getDoctorListThunk = createAsyncThunk(
  "doctor/getDoctorList",
  async (data, { dispatch }) => {
    const response = await getDoctorListAPI(data);

    return response;
  }
);

export const deleteDoctorThunk = createAsyncThunk(
  "doctor/deleteDoctor",
  async (data, { dispatch }) => {
    await deleteDoctorAPI(data);

    return data;
  }
);

export const getUsersThunk = createAsyncThunk(
  "doctor/getUsers",
  async (data, { dispatch }) => {
    const response = await getUsersAPI(data);

    return response;
  }
);

export const getUserThunk = createAsyncThunk(
  "doctor/getUser",
  async (data, { dispatch }) => {
    const response = await getUserAPI(data);

    return response;
  }
);

export const getDoctorThunk = createAsyncThunk(
  "doctor/getDoctor",
  async (data, { dispatch }) => {
    const response = await getDoctorAPI(data);

    return response;
  }
);
