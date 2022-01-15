import { HttpMethods } from "common/constants/httpMethods";

export const END_POINTS= {
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
    method: HTTP_METHOD_GET,
  },
  updateDoctor: {
    url: "api/v1/doctor",
    method: HTTP_METHOD_PUT,
  },
};
