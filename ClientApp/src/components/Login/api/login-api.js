import { END_POINTS } from "../../../endpoint";

export const loginAPI = async (data) => {
  const endpoint = { ...END_POINTS.login };

  const { searchText, ...rest } = data;
  endpoint.url = formatParameterizedURL(endpoint.url, rest);

  endpoint.data = { searchText: stringToBase64(searchText) };

  const response = await fetcher(endpoint);
  return response;
};
