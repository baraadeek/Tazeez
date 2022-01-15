import axios from "axios";


export const axiosAPI = axios.create({
  baseURL: "https://localhost:5001/",
  headers : {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization:`${localStorage.getItem("token")}`
  }
});

