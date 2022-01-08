import { createAsyncThunk } from "@reduxjs/toolkit";
import { addQuestionAPI, getQuestionListAPI } from "./question-api";

export const addQuestionThunk = createAsyncThunk(
  "question/addQuestion",
  async (data, { dispatch }) => {
    const response = await addQuestionAPI(data);

    return response;
  }
);

export const getQuestionListThunk = createAsyncThunk(
  "question/getQuestionList",
  async (data, { dispatch }) => {
    const response = await getQuestionListAPI(data);

    return response;
  }
);
