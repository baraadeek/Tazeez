import { axiosAPI } from "../../../axios";
import { END_POINTS } from "../../../endpoint";
import { formatParameterizedURL } from "views/examples/profile/api/user-api";

export const SignUpAPI = async (data) => {
  const endpoint = { ...END_POINTS.signUp };

  endpoint.url = formatParameterizedURL(endpoint.url, data);

  endpoint.data = data;

  const response = await axiosAPI(endpoint);

  return response;
};
