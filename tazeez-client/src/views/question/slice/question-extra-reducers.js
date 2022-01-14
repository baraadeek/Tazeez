import {
  addQuestionThunk,
  getQuestionListThunk,
} from "../api/question-thunk-api";
import { questionAdapter } from "../adapter/question-adapter";

export const questionExtraReducers = (builder) => {
  builder.addCase(addQuestionThunk.fulfilled, (state, { payload }) => {});

  builder.addCase(getQuestionListThunk.fulfilled, (state, { payload }) => {
    questionAdapter.addMany(state.questionList, payload.data);
  });
};
