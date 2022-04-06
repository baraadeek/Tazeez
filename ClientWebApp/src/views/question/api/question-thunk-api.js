import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addGroupScoreAPI,
  addQuestionAPI,
  addQuestionnaireGroupAPI,
  getGroupScoreAPI,
  getQuestionListAPI,
} from "./question-api";

export const addQuestionThunk = createAsyncThunk(
  "question/addQuestion",
  async (data, { dispatch }) => {
    const response = await addQuestionAPI(data);

    return {
      questions: response.data,
      id: data.questionnaireGroupTemplateQuestionId,
    };
  }
);
export const addQuestionnaireGroupThunk = createAsyncThunk(
  "question/addQuestionnaireGroup",
  async (data, { dispatch }) => {
    const response = await addQuestionnaireGroupAPI(data);

    return { ...response, isEdit: data.isEdit };
  }
);

export const getQuestionListThunk = createAsyncThunk(
  "question/getQuestionList",
  async (data, { dispatch }) => {
    const response = await getQuestionListAPI(data);

    return response;
  }
);

export const addGroupScoreThunk = createAsyncThunk(
  "question/addGroupScore",
  async (data, { dispatch }) => {
    const response = await addGroupScoreAPI(data);

    return response;
  }
);

export const getGroupScoreThunk = createAsyncThunk(
  "question/getGroupScore",
  async (data, { dispatch }) => {
    const response = await getGroupScoreAPI(data);

    return response;
  }
);
