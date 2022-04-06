import { AppActionTypesEnum, MessageTypesEnum } from "./appActionTypes";
// import { MESSAGE_TYPES } from "constants/constants";
import { AxiosPromise, AxiosResponse } from "axios";
import { Dispatch } from "react";
import { HttpMethods } from "common/constants/httpMethods";
import { axiosAPI } from "../../../axiosAPI";
import { store } from "store/configureStore";

export function purgeApp() {
  return { type: AppActionTypesEnum.PURGE };
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

export type IAPICaller = {
  method: "put" | "get" | "delete" | "options" | "post" | "head";
  url: string;
  data?: any;
  actionType: string;
  onStart?: () => void;
  onSuccess?: (res: any) => void;
  onFailure?: (err: any) => void;
};

export function showSuccessMessage(message: string, timeout?: number) {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: AppActionTypesEnum.SHOW_MESSAGE,
      payload: {
        snackbarMessageType: MessageTypesEnum.SUCCESS,
        snackbarMessage: message,
        snackbarTimeout: timeout,
      },
    });
  };
}

export function showErrorMessage(message: string | any) {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: AppActionTypesEnum.SHOW_MESSAGE,
      payload: {
        snackbarMessageType: MessageTypesEnum.ERROR,
        snackbarMessage: message,
      },
    });
  };
}

const dispatchWhenSuccess = (actionType: string, data?: any, rest?: any) => {
  return {
    type: actionType + "_SUCCESS",
    payload: data,
    ...rest,
  };
};

const dispatchWhenFailure = (
  dispatch: Dispatch<any>,
  actionType: string,
  err?: IHttpError,
  rest?: any
) => {
  const errMsg = `${err?.message} (${err?.status})` || "Something went wrong";

  dispatch(showErrorMessage(errMsg));

  return {
    type: actionType + "_FAILURE",
    ...rest,
  };
};

interface IHttpError {
  status: number;
  message: string;
}

interface IApiCallerParams {
  method: HttpMethods;
  url: string;
  data?: any;
  actionType: string;
  successMsg?: string;
  // onStart?: Function;
  // onSuccess?: Function;
  // onFailure?: Function;
}

export function apiCaller<Type = any>(
  apiCallerParam: IApiCallerParams,
  rest?: any
) {
  return store.dispatch(
    apiCallerDis(apiCallerParam, rest)
  ) as AxiosPromise<Type>;
}

export function apiCallerDis(apiCallerParam: IApiCallerParams, rest?: any) {
  const { method, url, data, actionType, successMsg } = apiCallerParam;

  return async (dispatch: Dispatch<any>): Promise<any> => {
    try {
      const response: AxiosResponse = await axiosAPI[method](url, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      !!successMsg && dispatch(showSuccessMessage(successMsg));
      dispatch(dispatchWhenSuccess(actionType, response.data, { ...rest }));

      return response;
    } catch (error: any) {
      const errorObj: IHttpError = error?.message;
      dispatch(dispatchWhenFailure(dispatch, actionType, errorObj));
      throw errorObj;
    }
  };
}
