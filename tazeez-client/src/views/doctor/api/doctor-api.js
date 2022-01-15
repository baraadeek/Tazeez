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
  console.log(
    "🚀 ~ file: doctor-api.js ~ line 25 ~ deleteDoctorAPI ~ data",
    data
  );
  const endpoint = { ...END_POINTS.deleteDoctor };
  endpoint.url = formatParameterizedURL(endpoint.url, data);
  console.log(
    "🚀 ~ file: doctor-api.js ~ line 27 ~ deleteDoctorAPI ~ endpoint",
    endpoint
  );
  const response = await axiosAPI(endpoint);

  return response;
};
