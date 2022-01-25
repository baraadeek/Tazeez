import { axiosAPI } from "../../../axiosAPI";
import { END_POINTS } from "../../../endpoint";
import { formatParameterizedURL } from "views/examples/profile/api/user-api";

export const loginAPI = async (data) => {
  const endpoint = { ...END_POINTS.login };

  endpoint.url = formatParameterizedURL(endpoint.url, data);

  endpoint.data = data;

  const response = await axiosAPI(endpoint);

  return response;
};
