import { addQuestionThunk } from "../api/question-thunk-api";

export const questionExtraReducers = (builder) => {
  builder.addCase(addQuestionThunk.fulfilled, (state, { payload }) => {});
};
