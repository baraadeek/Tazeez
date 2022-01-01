import { axiosAPI } from "../../../axios";
import { END_POINTS } from "../../../endpoint";

export const formatParameterizedString = (formattedURL, replacementsObj) => {
  return formattedURL.replace(
    /{\w+}/g,
    (placeholder) =>
      replacementsObj[placeholder.substring(1, placeholder.length - 1)] ??
      placeholder
  );
};

export const formatParameterizedURL = (
  formattedURL = "",
  replacementsObj = {},
  queryString = ""
) => {
  let encodeQueryString = queryString;

  return formatParameterizedString(
    formattedURL + encodeQueryString,
    replacementsObj
  );
};

export const getUserAPI = async (data) => {
  console.log(data);

  const endpoint = { ...END_POINTS.user };

  endpoint.url = formatParameterizedURL(endpoint.url, { id: data });

  const response = await axiosAPI(endpoint);

  return response;
};
