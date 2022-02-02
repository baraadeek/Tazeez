// Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Adapter
import { childrenAdapter } from "../adapter/children-adapter";
import { childrenExtraReducers } from "./children-extra-reducers";

export const initialState = {
  childrenList: childrenAdapter.getInitialState(),
};

const ChildrenSlice = createSlice({
  name: "children",
  initialState,
  reducers: { purge: () => initialState },
  extraReducers: childrenExtraReducers,
});

// Actions
export const { purge } = ChildrenSlice.actions;

export default ChildrenSlice.reducer;
