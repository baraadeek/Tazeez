import { Dictionary } from "@reduxjs/toolkit";
import { IQuestion, IUser } from "common/sharedInterfaces/modelsInterfaces";
import { END_POINTS } from "endpoint";
import { apiCaller } from "../app/appActionCreators";
import { QuestionsActionTypes } from "./questionsActionTypes";

export type IGetQuestionnaireQuestionsRes = {
  questions: { data: IQuestion[] };
  assignedUsers: Dictionary<IUser>;
  questionnaireTemplateName: string;
  questionnaireTitle: string;
  questionnaireTemplate: number;
};

export function getQuestionnaireQuestionsAction({
  questionnaireId,
}: {
  questionnaireId: number;
}) {
  return apiCaller<IGetQuestionnaireQuestionsRes>({
    actionType: QuestionsActionTypes.GetQuestions,
    data: {
      searchText: "",
    },
    method: END_POINTS.getQuestionnaireQuestions.method,
    url: END_POINTS.getQuestionnaireQuestions.url.replace(
      "{id}",
      questionnaireId.toString()
    ),
  });
}

export function saveMultiChoiceAnswerAction({
  assessmentQuestionAnswerChoiceIds,
  questionId,
  questionnaireId,
}: {
  assessmentQuestionAnswerChoiceIds: number[];
  questionId: number | string;
  questionnaireId: number | string;
}) {
  return apiCaller<IGetQuestionnaireQuestionsRes>({
    actionType: QuestionsActionTypes.GetQuestions,
    data: {
      assessmentQuestionAnswerChoiceIds,
    },
    method: END_POINTS.saveMultiChoiceAnswer.method,
    url: END_POINTS.saveMultiChoiceAnswer.url
      .replace("{id}", questionnaireId.toString())
      .replace("{questionId}", questionId.toString()),
  });
}

export function saveTextAnswerAction({
  textAnswer,
  questionId,
  questionnaireId,
}: {
  textAnswer: string;
  questionId: number | string;
  questionnaireId: number | string;
}) {
  return apiCaller<IGetQuestionnaireQuestionsRes>({
    actionType: QuestionsActionTypes.GetQuestions,
    data: {
      text: textAnswer,
    },
    method: END_POINTS.saveTextAnswer.method,
    url: END_POINTS.saveTextAnswer.url
      .replace("{id}", questionnaireId.toString())
      .replace("{questionId}", questionId.toString()),
  });
}

export function saveAdditionalTextAnswerAction({
  textAnswer,
  questionId,
  questionnaireId,
}: {
  textAnswer: string;
  questionId: number | string;
  questionnaireId: number | string;
}) {
  return apiCaller<IGetQuestionnaireQuestionsRes>({
    actionType: QuestionsActionTypes.GetQuestions,
    data: {
      text: textAnswer,
    },
    method: END_POINTS.saveAdditionalTextAnswer.method,
    url: END_POINTS.saveAdditionalTextAnswer.url
      .replace("{id}", questionnaireId.toString())
      .replace("{questionId}", questionId.toString()),
  });
}
