// Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";
import { pageDirectionReducers } from "./page-direction-reducers";

export const initialState = {
  pageDirection: "en",
};

const rtlLanguages = ["ar"];

const pageDirectionSlice = createSlice({
  name: "pageDirection",
  initialState,
  reducers: {
    setPageDirection(state, { payload }) {
      const dir = rtlLanguages.includes(payload) ? "rtl" : "ltr";
      document.documentElement.dir = dir;
      state.pageDirection = payload;
    },
  },
  extraReducers: pageDirectionReducers,
});

// Actions
export const { setPageDirection } = pageDirectionSlice.actions;

export default pageDirectionSlice.reducer;
