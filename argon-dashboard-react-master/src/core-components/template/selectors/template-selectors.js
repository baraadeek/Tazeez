import { templateAdapter } from "core-components/template/adapter/template-adapter";

export const templateSelectors = templateAdapter.getSelectors(
  (state) => state.template.templateList
).selectAll;
