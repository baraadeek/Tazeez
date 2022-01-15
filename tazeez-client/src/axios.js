import axios from "axios";

// export const ADD_REQUEST_TOKEN = "ADD_REQUEST_TOKEN";
// export const REMOVE_REQUEST_TOKEN = "REMOVE_REQUEST_TOKEN";
// export const CANCEL_TOKEN_BY_TAG = "CANCEL_REQUEST_TOKEN";
// export const HTTP_PUT_FILE = "HTTP_PUT_FILE";

// export function isCanceledRequest(axios, error) {
//   return (
//     axios.isCancel(error) ||
//     error?.toString().toLowerCase().includes("error: request aborted")
//   );
// }

export const axiosAPI = axios.create({
  baseURL: "https://localhost:5001/",
  headers : {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization:`${localStorage.getItem("token")}`
  }
});

// axiosAPI.interceptors.request.use(
//   async function (config) {
//     let headers = {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     };
//     const token =
//       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBaG1hZCIsImVtYWlsIjoiYUBhLmNvbSIsIklkIjoiMSIsIkRhdGVPZkpvaW5nIjoiMjAyMi0wMS0xNCIsImp0aSI6IjMyMzkwNmYyLWViYjItNDlmNS05NGNhLWMzZjkyNjhkZmQ4NyIsImV4cCI6MTY0NDc4MjUzOCwiaXNzIjoiVGF6ZWV6LmNvbSIsImF1ZCI6IlRhemVlei5jb20ifQ.w3eGedAMMeYYclLNUhaest4s8EdS40Kcgx1WhQ3-JDc";

//     const accessToken = token;

//     config.headers = headers;

//     const CancelToken = axios.CancelToken;
//     const source = CancelToken.source();
//     config.cancelToken = source.token;

//     if (config.method === HTTP_PUT_FILE.toLowerCase()) {
//       config.headers["Content-Type"] = "binary/octet-stream";
//       config.method = "PUT";
//     } else {
//       headers.Authorization = accessToken?.length ? token : "";
//     }

//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// axiosAPI.interceptors.response.use(
//   function (response) {
//     console.log("🚀 ~ file: axios.tsx ~ line 52 ~ response", response);
//     return response;
//   },
//   function (error) {
//     if (isCanceledRequest(axios, error)) return Promise.reject(error);

//     return error?.response?.data;
//   }
// );
