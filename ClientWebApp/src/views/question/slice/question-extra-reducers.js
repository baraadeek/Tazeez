import {
  addQuestionnaireGroupThunk,
  addQuestionThunk,
  getQuestionListThunk,
} from "../api/question-thunk-api";
import { questionAdapter } from "../adapter/question-adapter";

export const questionExtraReducers = (builder) => {
  builder.addCase(addQuestionThunk.fulfilled, (state, { payload }) => {
    const questions = state.questionList.entities[payload.id].questions || [];

    questionAdapter.upsertOne(state.questionList, {
      ...state.questionList.entities[payload.id],
      questions: [payload.questions, ...questions],
    });
  });

  builder.addCase(getQuestionListThunk.fulfilled, (state, { payload }) => {
    questionAdapter.addMany(
      state.questionList,
      Object.keys(payload.data.questionsGroup).map((key) => ({
        id: key,
        ...payload.data.questionsGroup[key],
        questions: payload.data.questions[key],
      }))
    );
  });
  builder.addCase(
    addQuestionnaireGroupThunk.fulfilled,
    (state, { payload }) => {
      if (payload.isEdit) {
        questionAdapter.upsertOne(state.questionList, payload.data);
      } else {
        questionAdapter.addOne(state.questionList, {
          ...payload.data,
          questions: [],
        });
      }
    }
  );
};
