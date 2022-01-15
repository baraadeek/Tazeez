import { templateAdapter } from "core-components/template/adapter/template-adapter";
import {
  addTemplateThunk,
  getTemplateListThunk,
} from "core-components/template/api/template-thunk-api";

export const templateExtraReducers = (builder) => {
  builder.addCase(getTemplateListThunk.fulfilled, (state, { payload }) => {
    templateAdapter.addMany(state.templateList, payload.data);
  });
  builder.addCase(addTemplateThunk.fulfilled, (state, { payload }) => {
    templateAdapter.addOne(state.templateList, payload.data);
  });
};
