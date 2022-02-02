import { combineReducers } from "redux";
import doctorSlice from "views/doctor/slice/doctor-slice";
import userSlice from "views/profile/slice/user-slice";
import questionSlice from "views/question/slice/question-slice";
import templateSlice from "views/template/slice/template-slice";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import childrenSlice from "views/children/slice/children-slice";

const rootReducer = combineReducers({
  auth: authReducer,
  template: templateSlice,
  question: questionSlice,
  doctor: doctorSlice,
  user: userSlice,
  app: appReducer,
  children: childrenSlice,
});

export type IRootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
