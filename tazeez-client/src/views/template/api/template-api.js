import { formatParameterizedURL } from "views/examples/profile/api/user-api";
import { axiosAPI } from "../../../axios";
import { END_POINTS } from "../../../endpoint";

export const getTemplateListAPI = async (data) => {
  const endpoint = { ...END_POINTS.getTemplateList };
  endpoint.url = formatParameterizedURL(endpoint.url, data);
  endpoint.data = data;
  const response = await axiosAPI(endpoint);

  return response;
};

export const addTemplateAPI = async (data) => {
  const endpoint = { ...END_POINTS.addQuestion };
  endpoint.url = formatParameterizedURL(endpoint.url, data);
  endpoint.data = data;
  const response = await axiosAPI(endpoint);

  return response;
};
