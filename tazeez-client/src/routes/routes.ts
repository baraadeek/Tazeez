import Doctors from "views/doctor";
import Auth from "views/layouts/Auth";
import QuestionList from "views/question/components/question-list";
import Templates from "views/template";
import { ROUTES_NAME_ENUM } from "../common/constants/routesNameEnum";
import { ROUTES_PATH_ENUM } from "../common/constants/routesPathEnum";
import Login from "../views/login/Login";
import SignUp from "../views/signUp/signUp";

export type IRoute = {
  name: string;
  path: string;
  component: any;
  id: number;
  isMain?: boolean;
  icon?: any;
  isHidden?: boolean;
  requireAdmin?: boolean;
};

export const normalRoutes: IRoute[] = [
  {
    name: ROUTES_NAME_ENUM.Home,
    path: ROUTES_PATH_ENUM.Home,
    component: Auth,
    isHidden: false,
  },
  {
    name: ROUTES_NAME_ENUM.Login,
    path: ROUTES_PATH_ENUM.Login,
    component: Login,
    isMain: true,
    isHidden: false,
  },
  {
    name: ROUTES_NAME_ENUM.SignUp,
    path: ROUTES_PATH_ENUM.SignUp,
    component: SignUp,
    isMain: true,
    isHidden: false,
  },
].map((rout, index) => Object.assign(rout, { id: index + 1 }));

export const authRoutes: IRoute[] = [
  {
    name: ROUTES_NAME_ENUM.QuestionsTemplatesList,
    path: ROUTES_PATH_ENUM.QuestionsTemplatesList,
    component: Templates,
    isMain: true,
    isHidden: false,
  },
  {
    name: ROUTES_NAME_ENUM.QuestionsTemplate,
    path: ROUTES_PATH_ENUM.QuestionsTemplate,
    component: QuestionList,
    isHidden: true,
  },
  {
    name: ROUTES_NAME_ENUM.Doctors,
    path: ROUTES_PATH_ENUM.Doctors,
    component: Doctors,
  }
].map((rout, index) => Object.assign(rout, { id: index + 1 }));
