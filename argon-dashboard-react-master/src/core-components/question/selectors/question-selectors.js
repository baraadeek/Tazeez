import { questionAdapter } from "../adapter/question-adapter";

export const questionSelectors = questionAdapter.getSelectors(
  (state) => state.question.questionList
).selectAll;
