// Redux Toolkit
import { createEntityAdapter } from "@reduxjs/toolkit";
/**
 * @Adapter questionAdapter
 * @description A set of question reducers and selectors instances of an question type of data object.
 * @returns {questionId}
 **/
export const questionAdapter = createEntityAdapter({
  selectId: (question) => question.id,
});
