import { namespaces } from "../../i18n.constants";
import translationKeys from "../translationKeys";

const englishTranslation = {
  [namespaces.common]: {
    buttons: {
      ok: "Ok",
      cancel: "Cancel",
    },
    [translationKeys.common.homePage]: "Home Page",
    [translationKeys.common.about]: "About",
  },
  [namespaces.pages.home]: {
    welcome: "Welcome",
  },
  [namespaces.pages.login]: {
    signIn: "Sign In",
    home: "Home",
    createAccount: "Didn't you account yet?",
    signUp: "Sign Up Here",
    enterEmail: "Enter email",
    enterPassword: "Enter Password",
    [translationKeys.pages.login.homePage]: "Home",
    [translationKeys.pages.login.enterFirstName]: "Last Name",
    [translationKeys.pages.login.enterLastName]: "First Name",
    [translationKeys.pages.login.alreadyAccount]: "Already have an account?",
  },
  [namespaces.pages.authNavbar]: {
    [translationKeys.pages.authNavbar.homePage]: "Home Page",
    [translationKeys.pages.authNavbar.about]: "About",
    [translationKeys.pages.authNavbar.blog]: "Blog",
    [translationKeys.pages.authNavbar.contact]: "Contact",
    [translationKeys.pages.authNavbar.doctors]: "Doctors",
    [translationKeys.pages.authNavbar.services]: "Services",
  },
  [namespaces.template]: {
    [translationKeys.template.add]: "Add New Template",
    [translationKeys.template.save]: "Save",
    [translationKeys.template.close]: "Close",
    [translationKeys.template.title]: "Title",
    [translationKeys.template.q]: "Q",
  },
  [namespaces.question]: {
    [translationKeys.question.add]: "Add New Question",
    [translationKeys.question.save]: "Save",
    [translationKeys.question.close]: "Close",
    [translationKeys.question.delete]: "Delete",
    [translationKeys.question.choice]: "Choice",
    [translationKeys.question.questionName]: "Question Name",
    [translationKeys.question.score]: "Score",
    [translationKeys.question.order]: "Order",
    [translationKeys.question.yes]: "Yes",
    [translationKeys.question.no]: "No",
    [translationKeys.question.isOptional]: "Is Optional",
    [translationKeys.question.mustChoice]: "You must add choices",
    [translationKeys.question.questions]: "Questions",
    [translationKeys.question.available]: "No Questions available!",
  },
};

export default englishTranslation;
