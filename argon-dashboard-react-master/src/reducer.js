import { combineReducers } from "redux";

import pageDirection from "core-components/page-direction/slice/page-direction.js";
import questionSlice from "core-components/question/slice/question-slice";

export default combineReducers({
  pageDirection,
  questionSlice,
});
