import { combineReducers } from "redux";
import user from "views/login/slice/login-slice";
import templateSlice from "views/template/slice/template-slice";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    authReducer,
    user,
      template: templateSlice

});

export type IRootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
