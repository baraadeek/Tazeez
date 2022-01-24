import { createSlice } from "@reduxjs/toolkit";

import { userAdapter } from "../adapter/user-adapter";
import { userExtraReducers } from "./user-extra-reducers";

export const initialState = {
  user: userAdapter.getInitialState({}),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: userExtraReducers,
});

export const {} = userSlice.actions;

export default userSlice.reducer;
