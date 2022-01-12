import { combineReducers } from "redux";
import user from "views/login/slice/login-slice";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    authReducer,
    user
});

export type IRootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
