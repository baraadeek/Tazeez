import {
  addChildrenThunk,
  getChildrenListThunk,
  deleteChildrenThunk,
} from "../api/children-thunk-api";
import { childrenAdapter } from "../adapter/children-adapter";

export const childrenExtraReducers = (builder) => {
  builder.addCase(addChildrenThunk.fulfilled, (state, { payload }) => {
    childrenAdapter.upsertOne(state.childrenList, payload);
  });

  builder.addCase(getChildrenListThunk.fulfilled, (state, { payload }) => {
    childrenAdapter.addMany(state.childrenList, payload.data.data);
  });
  builder.addCase(deleteChildrenThunk.fulfilled, (state, { payload }) => {
    childrenAdapter.removeOne(state.childrenList, payload.id);
  });
};
