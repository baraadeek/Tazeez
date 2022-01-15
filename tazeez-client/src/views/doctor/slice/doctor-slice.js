// Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Adapter
import { doctorAdapter } from "../adapter/doctor-adapter";
import { doctorExtraReducers } from "./doctor-extra-reducers";

export const initialState = {
  doctorList: doctorAdapter.getInitialState(),
};

/**
 * @Slice questionSlice
 * @description
 * @returns {slice}
 **/
const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: { purge: () => initialState },
  extraReducers: doctorExtraReducers,
});

// Actions
export const { purge } = doctorSlice.actions;

export default doctorSlice.reducer;
