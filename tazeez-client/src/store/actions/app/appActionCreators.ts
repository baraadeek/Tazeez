import { PURGE } from "./appActionTypes";
// import { MESSAGE_TYPES } from "constants/constants";
import axios from "axios";
import { Dispatch } from "react";

export function purgeApp() {
  const payload = { type: PURGE };
  return (dispatch: Dispatch<typeof payload>) => {
    dispatch(payload);
  };
}

// export function showMessage(message) {
//   return (dispatch) => {
//     dispatch({
//       type: SHOW_MESSAGE,
//       message,
//     });
//   };
// }

// export function showErrorMessage(message) {
//   return (dispatch) => {
//     dispatch({
//       type: SHOW_MESSAGE,
//       message: {
//         type: MESSAGE_TYPES.error,
//         text: message,
//       },
//     });
//   };
// }

// export function showSuccessMessage(message: string) {
//   return (dispatch) => {
//     dispatch({
//       type: SHOW_MESSAGE,
//       message: {
//         type: MESSAGE_TYPES.success,
//         text: message,
//       },
//     });
//   };
// }

// export function deleteMessage() {
//   return (dispatch) => {
//     dispatch({
//       type: SHOW_MESSAGE,
//       message: null,
//     });
//   };
// }

export const dispatchWhenSuccess = (actionType: string, data: any) => {
  return {
    type: actionType + "_SUCCESS",
    data: data,
  };
};

export const dispatchWhenFailure = (actionType: string, err: any) => {
  return {
    type: actionType + "_FAILURE",
  };
};

export type IAPICaller = {
  method: "put" | "get" | "delete" | "options" | "post" | "head";
  url: string;
  data?: any;
  actionType: string;
  onStart?: () => void;
  onSuccess?: (res: any) => void;
  onFailure?: (err: any) => void;
};

export const apiCaller = (
  { method, url, data, actionType, onStart, onSuccess, onFailure }: IAPICaller,
  rest: any
) => {
  return async (dispatch: Dispatch<any>) => {
    onStart && onStart();

    return new Promise((resolve) => {
      return axios[method](url, data)
        .then((res) => {
          resolve(res);
          dispatch(dispatchWhenSuccess(actionType, res.data));
          onSuccess && onSuccess(res);
        })
        .catch((err: any) => {
          dispatch(dispatchWhenFailure(actionType, err));
          onFailure && onFailure(err);
        });
    });
  };
};
