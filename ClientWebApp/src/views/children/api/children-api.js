import { formatParameterizedURL } from "views/examples/profile/api/user-api";
import { axiosAPI } from "../../../axiosAPI";
import { END_POINTS } from "../../../endpoint";

export const addChildrenAPI = async (data) => {
  const endpoint = { ...END_POINTS.updateChildren };

  endpoint.data = data;

  const response = await axiosAPI(endpoint);

  return response;
};

export const getChildrenListAPI = async (data) => {
  const endpoint = { ...END_POINTS.getChildrenList };
  endpoint.url = formatParameterizedURL(endpoint.url, data);
  endpoint.data = data;
  const response = await axiosAPI(endpoint);

  return response;
};

export const deleteChildrenAPI = async (data) => {
  const endpoint = { ...END_POINTS.deleteChildren };
  endpoint.url = formatParameterizedURL(endpoint.url, data);

  const response = await axiosAPI(endpoint);

  return response;
};
