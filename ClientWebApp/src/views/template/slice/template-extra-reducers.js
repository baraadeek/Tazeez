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
    console.log(
      "🚀 ~ file: template-extra-reducers.js ~ line 15 ~ builder.addCase ~ payload",
      payload.data.isEdit
    );
    if (payload.isEdit) {
      templateAdapter.upsertOne(state.templateList, payload.data);
    } else {
      templateAdapter.addOne(state.templateList, payload.data);
    }
  });
};
