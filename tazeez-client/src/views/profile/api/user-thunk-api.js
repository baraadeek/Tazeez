import { createAsyncThunk } from "@reduxjs/toolkit";

import { getUserAPI, updateUserAPI, uploadImageAPI } from "./user-api";

export const getUserThunk = createAsyncThunk(
  "user/getUser",
  async (data, { dispatch }) => {
    const response = await getUserAPI(data);

    return response;
  }
);
export const updateUserThunk = createAsyncThunk(
  "user/updateUser",
  async (data, { dispatch }) => {
    const response = await updateUserAPI(data);

    return response;
  }
);

export const uploadImageThunk = createAsyncThunk(
  "user/uploadImage",
  async (data, { dispatch }) => {
    const response = await uploadImageAPI(data);

    return response;
  }
);
