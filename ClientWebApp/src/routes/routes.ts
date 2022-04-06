import { uuidv4 } from "common/utils/utils";
import { namespaces } from "i18n/i18n.constants";
import translationKeys from "i18n/locales/translationKeys";
import Contact from "views/examples/contact/contact";
import DoctorsList from "views/examples/home/doctor/components/list-doctor";
import ProfileDoctor from "views/examples/home/doctor/components/Profile-doctor";
import Auth from "views/layouts/Auth";
import Overview from "views/profile";
import QuestionList from "views/question/components/question-list";
import AssignedQuestionnaire from "views/questionnaire/AssignedQuestionnaire/AssignedQuestionnaire";
import AssignedQuestionnairesList from "views/questionnaire/AssignedQuestionnairesList/AssignedQuestionnairesList";
import CreateQuestionnairePage from "views/questionnaire/CreateQuestionnairePage/CreateQuestionnairePage";
import Templates from "views/template";
import { ROUTES_NAME_ENUM } from "../common/constants/routesNameEnum";
import { ROUTES_PATH_ENUM } from "../common/constants/routesPathEnum";
import Login from "../views/login/Login";
import SignUp from "../views/signUp/signUp";

export type IRoute = {
  name: ROUTES_NAME_ENUM;
  path: ROUTES_PATH_ENUM;
  component: any;
  id: number | string;
  isMain?: boolean;
  icon?: any;
  isHidden?: boolean;
  translationKey: string;
  requireAdmin?: boolean;
  ns: string;
};

export const sharedRoutes: IRoute[] = [
  {
    name: ROUTES_NAME_ENUM.Home,
    path: ROUTES_PATH_ENUM.Home,
    component: Auth,
    isHidden: false,
    isMain: true,
    translationKey: translationKeys.pages.authNavbar.homePage,
    ns: namespaces.pages.authNavbar,
  },
  {
    name: ROUTES_NAME_ENUM.DoctorList,
    path: ROUTES_PATH_ENUM.DoctorList,
    component: DoctorsList,
    isHidden: false,
    ns: namespaces.pages.authNavbar,
    translationKey: translationKeys.pages.authNavbar.doctors,
  },

  {
    name: ROUTES_NAME_ENUM.Doctor,
    path: ROUTES_PATH_ENUM.Doctor,
    component: ProfileDoctor,
    ns: namespaces.doctor,
    isHidden: true,
    translationKey: translationKeys.doctor.doctors,
  },
  {
    name: ROUTES_NAME_ENUM.ContactUs,
    path: ROUTES_PATH_ENUM.ContactUs,
    component: Contact,
    ns: namespaces.pages.authNavbar,
    isHidden: false,
    translationKey: translationKeys.pages.authNavbar.contact,
  },
].map((r) => Object.assign(r, { id: uuidv4() }));

export const normalRoutes: IRoute[] = [
  {
    name: ROUTES_NAME_ENUM.Login,
    path: ROUTES_PATH_ENUM.Login,
    component: Login,
    isHidden: false,
    translationKey: translationKeys.pages.authNavbar.login,
    ns: namespaces.pages.login,
  },
  {
    name: ROUTES_NAME_ENUM.SignUp,
    path: ROUTES_PATH_ENUM.SignUp,
    component: SignUp,
    isHidden: false,
    ns: namespaces.pages.login,
    translationKey: translationKeys.pages.login.signUp,
  },
]
  .map((rout) => Object.assign(rout, { id: uuidv4() }))
  //@ts-ignore
  .concat(sharedRoutes);

export const authRoutes: IRoute[] = [
  {
    name: ROUTES_NAME_ENUM.AssignedQuestionnaire,
    path: ROUTES_PATH_ENUM.AssignedQuestionnaire,
    component: AssignedQuestionnaire,
    ns: namespaces.routes.authRoutes,
    isHidden: true,
    translationKey: translationKeys.authRoutes.assignedQuestionnaires,
  },
  {
    name: ROUTES_NAME_ENUM.AssignedQuestionnairesList,
    path: ROUTES_PATH_ENUM.AssignedQuestionnairesList,
    component: AssignedQuestionnairesList,
    ns: namespaces.routes.authRoutes,
    isHidden: false,
    translationKey: translationKeys.authRoutes.assignedQuestionnaires,
  },
  {
    name: ROUTES_NAME_ENUM.QuestionsTemplatesList,
    path: ROUTES_PATH_ENUM.QuestionsTemplatesList,
    component: Templates,
    ns: namespaces.routes.authRoutes,
    isHidden: false,
    translationKey: translationKeys.authRoutes.questionsTemplatesList,
  },
  {
    name: ROUTES_NAME_ENUM.QuestionsTemplate,
    path: ROUTES_PATH_ENUM.QuestionsTemplate,
    component: QuestionList,
    isHidden: true,
    ns: namespaces.routes.authRoutes,
    translationKey: translationKeys.authRoutes.questionsTemplate,
  },
  // {
  //   ns: namespaces.routes.authRoutes,
  //   name: ROUTES_NAME_ENUM.Doctors,
  //   path: ROUTES_PATH_ENUM.Doctors,
  //   component: Doctors,
  //   translationKey: translationKeys.authRoutes.doctors,
  // },
  {
    name: ROUTES_NAME_ENUM.Profile,
    path: ROUTES_PATH_ENUM.Profile,
    ns: namespaces.routes.authRoutes,
    component: Overview,
    translationKey: translationKeys.authRoutes.profile,
    isHidden: true,
  },
  {
    ns: namespaces.routes.authRoutes,
    name: ROUTES_NAME_ENUM.CreateQuestionnaire,
    path: ROUTES_PATH_ENUM.CreateQuestionnaire,
    component: CreateQuestionnairePage,
    requireAdmin: true,
    translationKey: translationKeys.authRoutes.createQuestionnaire,
  },
]
  .map((rout) => Object.assign(rout, { id: uuidv4() }))
  //@ts-ignore
  .concat(sharedRoutes);
