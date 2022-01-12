import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI } from "./login-api";

export const loginThunk = createAsyncThunk(
  "login/login",
  async (data, { dispatch }) => {
    const response = await loginAPI(data);

    return response;
  }
);
