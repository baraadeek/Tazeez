// Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Adapter
import { questionAdapter } from "../adapter/question-adapter";
import { questionExtraReducers } from "./question-extra-reducers";

export const initialState = {
  questionList: questionAdapter.getInitialState(),
};

/**
 * @Slice questionSlice
 * @description
 * @returns {slice}
 **/
const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: { purge: () => initialState },
  extraReducers: questionExtraReducers,
});

// Actions
export const { purge } = questionSlice.actions;

export default questionSlice.reducer;
