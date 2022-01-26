// Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Adapter
import { loginAdapter } from "../adapter/login-adapter";
import { loginExtraReducers } from "./login-extra-reducers";

export const initialState = {
  user: loginAdapter.getInitialState(),
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: loginExtraReducers,
});

export const {} = loginSlice.actions;

export default loginSlice.reducer;
