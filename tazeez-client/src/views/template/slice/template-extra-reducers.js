import { templateAdapter } from "../adapter/template-adapter";
import {
  addTemplateThunk,
  getTemplateListThunk,
} from "../api/template-thunk-api";

export const templateExtraReducers = (builder) => {
  builder.addCase(getTemplateListThunk.fulfilled, (state, { payload }) => {
    templateAdapter.addMany(state.templateList, payload.data);
  });
  builder.addCase(addTemplateThunk.fulfilled, (state, { payload }) => {
    templateAdapter.addOne(state.templateList, payload.data);
  });
};
