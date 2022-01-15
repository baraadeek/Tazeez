import { AxiosPromise } from "axios";
import { END_POINTS } from "endpoint";
import { apiCaller } from "store/actions/app/appActionCreators";
import { AuthActionTypesEnum } from "store/actions/auth/authActionsTypes";

export type ILogInActionData = {
  password: string;
  email: string;
};

export type ILoginActionResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  token: string;
  isAdmin: boolean;
};

export function logInAction(data: ILogInActionData) {
  return apiCaller<ILoginActionResponse>({
    data,
    actionType: AuthActionTypesEnum.AUTH_LOG_IN,
    method: END_POINTS.login.method,
    url: END_POINTS.login.url,
  });
}

export type ISignUpActionData = {
  name: string;
  dateOfBirth: string;
  password: string;
  email: string;
};

//  export function signUpAction(data: ISignUpActionData) {
//     return apiCaller({
//        data,
//        actionType: AuthActionTypesEnum.AUTH_SIGN_UP,
//        method: APIS.auth.signUp.method,
//        url: APIS.auth.signUp.url,
//     });
//  }
