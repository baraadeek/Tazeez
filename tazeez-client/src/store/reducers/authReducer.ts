import { parseJwt } from "common/utils/utils";
import { PURGE } from "store/actions/app/appActionTypes";
import * as authActionTypes from "store/actions/auth/authActionsTypes";

export type IAuthReducerState = {
  token: null | string;
  expirationDate: null | string;
  userName: null | string;
};

const initialState: IAuthReducerState = {
  token: null,
  expirationDate: null,
  userName: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case authActionTypes.AUTH_START:
      return {
        ...state,
        message: null,
        loading: true,
      };
    case authActionTypes.AUTH_FAIL:
      return {
        ...state,
        token: null,
        expirationDate: null,
      };
    case authActionTypes.AUTH_SUCCESS:
      let userName = parseJwt(action.token).unique_name || "";
      return {
        ...state,
        token: action.token,
        expirationDate: action.expirationDate,
        userName,
      };

    case authActionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        expirationDate: null,
      };
    case PURGE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default authReducer;
