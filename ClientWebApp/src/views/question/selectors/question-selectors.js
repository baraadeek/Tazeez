import {
  questionAdapter,
  groupScoreAdapter,
} from "../adapter/question-adapter";

export const questionSelectors = questionAdapter.getSelectors(
  (state) => state.question.questionList
).selectAll;

export const groupScoreAdapterSelectors = groupScoreAdapter.getSelectors(
  (state) => state.groupScore.groupScoreList
).selectAll;
