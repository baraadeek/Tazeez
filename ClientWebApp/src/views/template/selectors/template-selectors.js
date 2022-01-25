import { templateAdapter } from "../adapter/template-adapter";

export const templateSelectors = templateAdapter.getSelectors(
  (state) => state.template.templateList
).selectAll;
