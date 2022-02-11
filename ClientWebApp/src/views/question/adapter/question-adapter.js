// Redux Toolkit
import { createEntityAdapter } from "@reduxjs/toolkit";

export const questionAdapter = createEntityAdapter({
  selectId: (question) => question.id,
});

export const groupScoreAdapter = createEntityAdapter({
  selectId: (groupScore) => groupScore.id,
});
