import { groupScoreAdapter } from "../adapter/question-adapter";
import {
  addGroupScoreThunk,
  getGroupScoreThunk,
} from "../api/question-thunk-api";

export const groupScoreExtraReducers = (builder) => {
  builder.addCase(getGroupScoreThunk.fulfilled, (state, { payload }) => {
    groupScoreAdapter.addMany(state.groupScoreList, payload.data);
  });
  builder.addCase(addGroupScoreThunk.fulfilled, (state, { payload }) => {
    groupScoreAdapter.upsertOne(state.groupScoreList, payload.data);
  });
};
