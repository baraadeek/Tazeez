import { createSlice } from "@reduxjs/toolkit";

import { templateAdapter } from "core-components/template/adapter/template-adapter";
import { templateExtraReducers } from "core-components/template/slice/template-extra-reducers";

export const initialState = {
  templateList: templateAdapter.getInitialState({}),
  isLoading: true,
};

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    updateIsLoading(state, { payload }) {
      state.isLoading = payload;
    },
  },
  extraReducers: templateExtraReducers,
});

export const { updateIsLoading } = templateSlice.actions;

export default templateSlice.reducer;
