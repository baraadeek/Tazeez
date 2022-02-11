import { childrenAdapter } from "../adapter/children-adapter";

export const childrenSelectors = childrenAdapter.getSelectors(
  (state) => state.children.childrenList
).selectAll;
