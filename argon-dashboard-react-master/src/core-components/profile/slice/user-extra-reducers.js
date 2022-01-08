import { userAdapter } from "../adapter/user-adapter";
import { getUserThunk, updateUserThunk } from "../api/user-thunk-api";

export const userExtraReducers = (builder) => {
  builder.addCase(getUserThunk.fulfilled, (state, { payload }) => {
    userAdapter.addOne(state.user, payload.data);
  });
  builder.addCase(updateUserThunk.fulfilled, (state, { payload }) => {
    userAdapter.updateOne(state.user, {
      id: payload.data.id,
      changes: payload.data,
    });
  });
};
