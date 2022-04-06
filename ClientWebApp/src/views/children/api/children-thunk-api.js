import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  addChildrenAPI,
  getChildrenListAPI,
  deleteChildrenAPI,
} from "./children-api";

export const addChildrenThunk = createAsyncThunk(
  "children/addChildren",
  async (data, { dispatch }) => {
    await addChildrenAPI(data);

    return { ...data, fullName: data.firstName + " " + data.lastName };
  }
);

export const getChildrenListThunk = createAsyncThunk(
  "children/getChildrenList",
  async (data, { dispatch }) => {
    const response = await getChildrenListAPI(data);

    return response;
  }
);

export const deleteChildrenThunk = createAsyncThunk(
  "children/deleteChildren",
  async (data, { dispatch }) => {
    await deleteChildrenAPI(data);

    return data;
  }
);
