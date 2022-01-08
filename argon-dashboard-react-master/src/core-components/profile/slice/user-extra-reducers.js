import { userAdapter } from "../adapter/user-adapter";
import { getUserThunk } from "../api/user-thunk-api";

export const userExtraReducers = (builder) => {
  builder.addCase(getUserThunk.fulfilled, (state, { payload }) => {
    userAdapter.addOne(state.user, payload.data);
  });
};
