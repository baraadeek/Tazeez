export type IUser = {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  gender?: any;
  email: string;
  birthDay: Date;
};

export type IQuestion = {
  questionId: number;
  commentsCount: number;
  attachmentsCount: number;
  questionnaireId: number;
  displayOrder: number;
  questionType: string | number;
  questionText: string;
  answer: string | null;
  additionalAnswer: string;
  isReadOnly: boolean;
  isOptional: boolean;
  isQuestionAnswered: boolean;
  status: 0 | 1 | 2;
  questionnaireGroupTemplateQuestionName: string;
  questionnaireGroupTemplateQuestionId: number;
  assignedUserId: number;
  answeredByUserId: number | null;
  answerChoices: IChoice[];
};

export interface IChoice {
  id: number;
  score: number;
  choice: string;
  isChecked: boolean;
}
