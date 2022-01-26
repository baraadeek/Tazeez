import { axiosAPI } from "../../../../axiosAPI";
import { END_POINTS } from "../../../../endpoint";

export const loginAPI = async (data) => {
  const endpoint = { ...END_POINTS.login };

  endpoint.data = data;

  const response = await axiosAPI(endpoint);

  return response;
};
