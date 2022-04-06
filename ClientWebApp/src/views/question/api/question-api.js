import { formatParameterizedURL } from "views/examples/profile/api/user-api";
import { axiosAPI } from "../../../axiosAPI";
import { END_POINTS } from "../../../endpoint";

export const addQuestionAPI = async (data) => {
  const endpoint = { ...END_POINTS.addQuestion };
  endpoint.url = formatParameterizedURL(endpoint.url, { id: data.templateId });
  endpoint.data = data;
  const response = await axiosAPI(endpoint);

  return response;
};

export const addQuestionnaireGroupAPI = async (data) => {
  const endpoint = { ...END_POINTS.addQuestionnaireGroup };

  endpoint.data = data;

  const response = await axiosAPI(endpoint);

  return response;
};

export const getQuestionListAPI = async (data) => {
  const endpoint = { ...END_POINTS.getQuestionList };
  endpoint.url = formatParameterizedURL(endpoint.url, data);
  endpoint.data = data;
  const response = await axiosAPI(endpoint);

  return response;
};

export const addGroupScoreAPI = async (data) => {
  const endpoint = { ...END_POINTS.addGroupScore };

  endpoint.data = data;

  const response = await axiosAPI(endpoint);

  return response;
};

export const getGroupScoreAPI = async (data) => {
  const endpoint = { ...END_POINTS.getGroupScore };

  endpoint.url = formatParameterizedURL(endpoint.url, data);

  const response = await axiosAPI(endpoint);

  return response;
};
