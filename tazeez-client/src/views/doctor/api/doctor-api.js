import { formatParameterizedURL } from "views/examples/profile/api/user-api";
import { axiosAPI } from "../../../axios";
import { END_POINTS } from "../../../endpoint";

export const addDoctorAPI = async (data) => {
  const endpoint = { ...END_POINTS.updateDoctor };

  endpoint.data = data;

  const response = await axiosAPI(endpoint);

  return response;
};

export const getDoctorListAPI = async (data) => {
  const endpoint = { ...END_POINTS.getDoctorList };
  endpoint.url = formatParameterizedURL(endpoint.url, data);
  endpoint.data = data;
  const response = await axiosAPI(endpoint);

  return response;
};

export const deleteDoctorAPI = async (data) => {
  const endpoint = { ...END_POINTS.deleteDoctor };
  endpoint.url = formatParameterizedURL(endpoint.url, data);

  const response = await axiosAPI(endpoint);

  return response;
};

export const getUsersAPI = async (data) => {
  const endpoint = { ...END_POINTS.getUsers };
  endpoint.url = formatParameterizedURL(endpoint.url, data);
  endpoint.data = data;
  const response = await axiosAPI(endpoint);

  return response;
};

export const getUserAPI = async (data) => {
  const endpoint = { ...END_POINTS.user };
  endpoint.url = formatParameterizedURL(endpoint.url, data);
  endpoint.data = data;
  const response = await axiosAPI(endpoint);

  return response;
};
