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

export const QUESTION_TYPE_ID = {
  1: "Single Answer",
  2: "Multiple Answer",
  3: "Open Ended",
  4: "Attachment Only Answer",
  5: "Number Answer",
  6: "Date Time Answer",
};
export const COLUMNS_GROUP_SCORE = ["name", "score", "description", ""];

export const QUESTION_TYPE = [
  { title: "Multiple Choice Question Single Answer", type: 1 },
  { title: "Multiple Choice Question Multiple Answer", type: 2 },
  { title: "Open Ended", type: 3 },
  { title: "Attachment Only Answer", type: 4 },
  { title: "Number Answer", type: 5 },
  { title: "Date Time Answer", type: 6 },
];
