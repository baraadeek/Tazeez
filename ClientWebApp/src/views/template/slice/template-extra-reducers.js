import { templateAdapter } from "../adapter/template-adapter";
import {
  addTemplateThunk,
  deleteTemplateThunk,
  getTemplateListThunk,
} from "../api/template-thunk-api";

export const templateExtraReducers = (builder) => {
  builder.addCase(getTemplateListThunk.fulfilled, (state, { payload }) => {
    templateAdapter.addMany(state.templateList, payload.data);
  });
  builder.addCase(addTemplateThunk.fulfilled, (state, { payload }) => {
    if (payload.isEdit) {
      templateAdapter.upsertOne(state.templateList, payload.data);
    } else {
      templateAdapter.addOne(state.templateList, payload.data);
    }
  });
  builder.addCase(deleteTemplateThunk.fulfilled, (state, { payload }) => {
    templateAdapter.removeOne(state.templateList, payload.id);
  });
};
