import { questionAdapter } from "../adapter/question-adapter";

/**
 * @Selector questionSelectors
 * @description
 * @returns {state}
 **/

export const questionSelectors = questionAdapter.getSelectors(
  (state) => state.question.question
).selectAll;
