import axios from "axios";
import { LOCAL_STORAGE_KEYS } from "common/constants/constants";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const token = localStorage.getItem(LOCAL_STORAGE_KEYS.token);

if (token) {
  headers.Authorization = token;
}

export const axiosAPI = axios.create({
  baseURL: "http://localhost:59717/",
  headers,
});
