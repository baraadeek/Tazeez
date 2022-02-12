import { HttpMethods } from "common/constants/httpMethods";

export const END_POINTS = {
  login: {
    url: "api/v1/user/login",
    method: HttpMethods.POST,
  },
  signUp: {
    url: "api/v1/user/signup",
    method: HttpMethods.POST,
  },
  contact: {
    url: "api/v1/common/contactwithus",
    method: HttpMethods.POST,
  },
  user: {
    url: "api/v1/user/{id}",
    method: HttpMethods.GET,
  },
  addQuestion: {
    url: "/api/v1/questionnairetemplate/{id}",
    method: HttpMethods.PUT,
  },
  getTemplateList: {
    url: "api/v1/questionnairetemplate",
    method: HttpMethods.GET,
  },
  getQuestionList: {
    url: "api/v1/questionnairetemplate/{id}",
    method: HttpMethods.GET,
  },
  addQuestionnaire: {
    url: "/api/v1/questionnaire",
    method: HttpMethods.PUT,
  },
  getProfile: {
    url: "api/v1/user/{id}",
    method: HttpMethods.GET,
  },
  updateProfile: {
    url: "api/v1/user/profile/me",
    method: HttpMethods.PUT,
  },
  uploadImage: {
    url: "api/v1/user/fileretrive/profilepic",
    method: HttpMethods.GET,
  },
  getDoctorList: {
    url: "api/v1/doctor?page=1&pageSize=10",
    method: HttpMethods.GET,
  },
  updateDoctor: {
    url: "api/v1/doctor",
    method: HttpMethods.PUT,
  },
  deleteDoctor: {
    url: "api/v1/doctor/{id}",
    method: HttpMethods.DELETE,
  },
  getDoctor: {
    url: "api/v1/doctor/{id}",
    method: HttpMethods.GET,
  },
  getUsers: {
    url: "api/v1/users?page=1&pageSize=50",
    method: HttpMethods.GET,
  },
  getQuestionnaire: {
    url: "api/v1/questionnaire",
    method: HttpMethods.GET,
  },
  getQuestionnaireQuestions: {
    url: "api/v1/questionnaire/{id}/Questions",
    method: HttpMethods.POST,
  },
  getChildrenList: {
    url: "api/v1/children",
    method: HttpMethods.GET,
  },
  updateChildren: {
    url: "/api/v1/children",
    method: HttpMethods.PUT,
  },
  deleteChildren: {
    url: "",
    method: HttpMethods.DELETE,
  },
  deleteTemplate: {
    url: "/api/v1/questionnairetemplate/{id}",
    method: HttpMethods.DELETE,
  },
  addQuestionnaireGroup: {
    url: "/api/v1/questionnairegrouptemplatequestion",
    method: HttpMethods.PUT,
  },
  addGroupScore: {
    url: "api/v1/questionnairetemplategroup/groupscore",
    method: HttpMethods.PUT,
  },
  getGroupScore: {
    url: "/api/v1/questionnairetemplategroup/{id}/groupscore",
    method: HttpMethods.GET,
  },
};
