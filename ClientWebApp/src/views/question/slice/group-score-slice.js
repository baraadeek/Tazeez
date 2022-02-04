// Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Adapter
import { groupScoreAdapter } from "../adapter/question-adapter";
import { groupScoreExtraReducers } from "./group-score-extra-reducers";

export const initialState = {
  groupScoreList: groupScoreAdapter.getInitialState(),
};

const groupScoreSlice = createSlice({
  name: "groupScore",
  initialState,
  reducers: { purge: () => initialState },
  extraReducers: groupScoreExtraReducers,
});

// Actions
export const { purge } = groupScoreSlice.actions;

export default groupScoreSlice.reducer;
