import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTemplateAPI,
  deleteTemplateAPI,
  getTemplateListAPI,
} from "./template-api";

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

    return { ...response, isEdit: data.isEdit };
  }
);

export const deleteTemplateThunk = createAsyncThunk(
  "template/deleteTemplate",
  async (data, { dispatch }) => {
    await deleteTemplateAPI(data);

    return data;
  }
);
