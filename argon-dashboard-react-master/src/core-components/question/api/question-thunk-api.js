import { createAsyncThunk } from "@reduxjs/toolkit";
import { addQuestionAPI } from "./question-api";

export const addQuestionThunk = createAsyncThunk(
  "question/addQuestion",
  async (data, { dispatch }) => {
    const response = await addQuestionAPI(data);

    return response;
  }
);
