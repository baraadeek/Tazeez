import { formatParameterizedURL } from "views/examples/profile/api/user-api";
import { axiosAPI } from "../../../axios";
import { END_POINTS } from "../../../endpoint";

export const getUserAPI = async (data) => {
  console.log("🚀 ~ file: user-api.js ~ line 6 ~ getUserAPI ~ data", data);
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
