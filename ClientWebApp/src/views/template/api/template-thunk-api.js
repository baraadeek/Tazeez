import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTemplateAPI, getTemplateListAPI } from "./template-api";

export const getTemplateListThunk = createAsyncThunk(
  "template/getTemplateList",
  async (data, { dispatch }) => {
    const response = await getTemplateListAPI(data);

    return response;
  }
);

export const addTemplateThunk = createAsyncThunk(
  "template/addTemplate",
  async (data, { dispatch }) => {
    const response = await addTemplateAPI(data);

    return response;
  }
);
