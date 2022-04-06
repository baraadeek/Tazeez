import { formatParameterizedURL } from "views/examples/profile/api/user-api";
import { axiosAPI } from "../../../axiosAPI";
import { END_POINTS } from "../../../endpoint";

export const getUserAPI = async (data) => {
  const endpoint = { ...END_POINTS.getProfile };
  endpoint.url = formatParameterizedURL(endpoint.url, data);
  endpoint.data = data;
  const response = await axiosAPI(endpoint);

  return response;
};

export const updateUserAPI = async (data) => {
  const endpoint = { ...END_POINTS.updateProfile };
  endpoint.url = formatParameterizedURL(endpoint.url, data);
  endpoint.data = data;
  const response = await axiosAPI(endpoint);

  return response;
};

export const uploadImageAPI = async (data) => {
  const endpoint = { ...END_POINTS.uploadImage };
  endpoint.url = formatParameterizedURL(endpoint.url, data);
  endpoint.data = data;
  const response = await axiosAPI(endpoint);

  return response;
};
