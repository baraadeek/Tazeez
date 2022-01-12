import { axiosAPI } from "../../../../axios";
import { END_POINTS } from "../../../../endpoint";

export const SiginUpAPI = async (data) => {
  console.log(data);

  const endpoint = { ...END_POINTS.signUp };

  endpoint.data = data;

  const response = await axiosAPI(endpoint);

  return response;
};
