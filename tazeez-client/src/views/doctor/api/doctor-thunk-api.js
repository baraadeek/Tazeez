import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoctorAPI, getDoctorListAPI } from "./doctor-api";

export const addDoctorThunk = createAsyncThunk(
  "question/addDoctor",
  async (data, { dispatch }) => {
    const response = await addDoctorAPI(data);

    return response;
  }
);

export const getDoctorListThunk = createAsyncThunk(
  "question/getDoctorList",
  async (data, { dispatch }) => {
    const response = await getDoctorListAPI(data);

    return response;
  }
);
