export const COLUMNS = ["name"];

export const COLUMNS_ITEM = [
  "order",
  "questionName",
  "questionType",
  "lastUpdated",
  "score",
  "choice",
  "optional",
];

export const SINGLE_ANSWER_QUESTION_TYPE_ID = 1;
export const MULTIPLE_ANSWER_QUESTION_TYPE_ID = 2;
export const OPEN_ENDED_QUESTION_TYPE_ID = 3;

export const QUESTION_TYPE_ID = {
  [SINGLE_ANSWER_QUESTION_TYPE_ID]: "Single Answer",
  [MULTIPLE_ANSWER_QUESTION_TYPE_ID]: "Multiple Answer",
  [OPEN_ENDED_QUESTION_TYPE_ID]: "Open Ended",
};
export const COLUMNS_GROUP_SCORE = ["name", "score", "description", ""];

export const QUESTION_TYPE = [
  { title: "Multiple Choice Question Single Answer", type: 1 },
  { title: "Multiple Choice Question Multiple Answer", type: 2 },
  { title: "Open Ended", type: 3 },
];
