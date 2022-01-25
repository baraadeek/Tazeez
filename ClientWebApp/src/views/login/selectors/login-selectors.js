import { loginAdapter } from "../adapter/login-adapter";

export const loginSelectors = loginAdapter.getSelectors(
  (state) => state.user
).selectAll;
