// Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Adapter
import { questionAdapter } from "../adapter/question-adapter";
import { questionExtraReducers } from "./question-extra-reducers";

export const initialState = {
  question: questionAdapter.getInitialState(),
};

/**
 * @Slice questionSlice
 * @description
 * @returns {slice}
 **/
const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: questionExtraReducers,
});

// Actions
export const {} = questionSlice.actions;

export default questionSlice.reducer;
