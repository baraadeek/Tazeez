import { axiosAPI } from "../../../axios";
import { END_POINTS } from "../../../endpoint";

export const contactAPI = async (data) => {
  console.log(data);

  const endpoint = { ...END_POINTS.contact };

  endpoint.data = data;

  const response = await axiosAPI(endpoint);

  return response;
};
