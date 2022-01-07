import React from "react";

import Questions from "./components/question-list-view";
/**
 * @function QuestionsListView
 * @description
 * @param {Object} props
 */
function QuestionList() {
  return (
    <React.Fragment>
      <Questions />
    </React.Fragment>
  );
}

export default QuestionList;
