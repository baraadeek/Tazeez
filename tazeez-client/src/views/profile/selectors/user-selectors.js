import { userAdapter } from "../adapter/user-adapter";

export const userSelectors = userAdapter.getSelectors(
  (state) => state.user.user
).selectAll;
