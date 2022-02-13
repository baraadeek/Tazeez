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
