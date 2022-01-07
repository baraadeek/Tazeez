export const HTTP_METHOD_GET = "get";
export const HTTP_METHOD_POST = "post";
export const HTTP_METHOD_DELETE = "delete";
export const HTTP_METHOD_PUT = "put";

export const END_POINTS = {
  login: {
    url: "api/v1/user/login",
    method: HTTP_METHOD_POST,
  },
  signUp: {
    url: "api/v1/user/signup",
    method: HTTP_METHOD_POST,
  },
  contact: {
    url: "api/v1/common/contactwithus",
    method: HTTP_METHOD_POST,
  },
  user: {
    url: "api/v1/user/{id}",
    method: HTTP_METHOD_GET,
  },
  addQuestion: {
    url: "api/v1/questionnairetemplate",
    method: HTTP_METHOD_PUT,
  },
  getTemplateList: {
    url: "api/v1/questionnairetemplate",
    method: HTTP_METHOD_GET,
  },
};
