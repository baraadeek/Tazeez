import { loginAdapter } from "../adapter/login-adapter";
import { loginThunk } from "../api/login-thunk-api";

export const loginExtraReducers = (builder) => {
  builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
    loginAdapter.addOne(state.user, payload.data);
  });
};
