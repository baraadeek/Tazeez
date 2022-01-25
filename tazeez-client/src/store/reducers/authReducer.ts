import { LOCAL_STORAGE_KEYS } from "common/constants/constants";
import { parseJwt } from "common/utils/utils";
import { Action } from "redux";
import { AppActionTypesEnum } from "store/actions/app/appActionTypes";
import { ILoginActionResponse } from "store/actions/auth/authActionsCreators";
import { AuthActionTypesEnum } from "store/actions/auth/authActionsTypes";

export interface IAppReducerAction extends Action {
  type: AppActionTypesEnum | AuthActionTypesEnum;
  payload: any;
}

export type IAuthReducerState = {
  snackbarMessage?: string;
  snackbarMessageType?: string;
  snackbarTimeout: number;
  isAuth: boolean;
  expirationDate?: number;
  token?: string | null;
  user: null | Omit<ILoginActionResponse, "token">;
};

const initialState: IAuthReducerState = {
  snackbarMessage: "",
  snackbarTimeout: 3000,
  snackbarMessageType: "",
  isAuth: false,
  expirationDate: undefined,
  token: null,
  user: null,
};

export default function authReducer(
  state = initialState,
  action: IAppReducerAction
): IAuthReducerState {
  switch (action.type) {
    case AppActionTypesEnum.SHOW_MESSAGE:
      return {
        ...state,
        snackbarMessage: action.payload.snackbarMessage,
        snackbarMessageType: action.payload.snackbarMessageType,
      };
    case AppActionTypesEnum.DELETE_MESSAGE:
      return {
        ...state,
        snackbarMessage: "",
        snackbarMessageType: "",
      };
    case AuthActionTypesEnum.AUTH_LOG_IN_SUCCESS:
      const { token, ...rest } = action.payload as ILoginActionResponse;
      const { exp }: any = parseJwt(token);
      localStorage.setItem(LOCAL_STORAGE_KEYS.token, token);
      return {
        ...state,
        isAuth: true,
        expirationDate: exp * 1000,
        token: token,
        user: rest,
      };
    case AuthActionTypesEnum.AUTH_LOG_OUT:
      localStorage.removeItem(LOCAL_STORAGE_KEYS.persistedRoot);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
      return initialState;

    case AppActionTypesEnum.PURGE:
      return state;
    default:
      return state;
  }
}
