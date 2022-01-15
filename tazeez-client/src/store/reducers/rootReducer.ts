import { combineReducers } from "redux";
import doctorSlice from "views/doctor/slice/doctor-slice";
import user from "views/login/slice/login-slice";
import questionSlice from "views/question/slice/question-slice";
import templateSlice from "views/template/slice/template-slice";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user,
  template: templateSlice,
  question: questionSlice,
  doctor:doctorSlice


});

export type IRootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
