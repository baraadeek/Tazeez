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
  },
};

export default englishTranslation;
