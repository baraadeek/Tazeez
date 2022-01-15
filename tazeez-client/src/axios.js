import axios from "axios";
import { LOCAL_STORAGE_KEYS } from "common/constants/constants";

export const axiosAPI = axios.create({
  baseURL: "http://localhost:59717/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `${localStorage.getItem(LOCAL_STORAGE_KEYS.token)}`,
  },
});
