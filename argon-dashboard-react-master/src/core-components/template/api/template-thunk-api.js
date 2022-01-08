import { createAsyncThunk } from "@reduxjs/toolkit";

import { getTemplateListAPI } from "core-components/template/api/template-api";
import { addTemplateAPI } from "core-components/template/api/template-api";

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
