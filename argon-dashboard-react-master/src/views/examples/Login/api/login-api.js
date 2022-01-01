import { axiosAPI } from "../../../../axios";
import { END_POINTS } from "../../../../endpoint";

export const loginAPI = async (data) => {
  console.log(data);

  const endpoint = { ...END_POINTS.login };

  endpoint.data = data;

  const response = await axiosAPI(endpoint);

  return response;
};
