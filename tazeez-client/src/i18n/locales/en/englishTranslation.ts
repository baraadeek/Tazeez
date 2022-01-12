import { namespaces } from "../../i18n.constants";

 const englishTranslation = {
  [namespaces.common]: {
    buttons: {
      ok: "Ok",
      cancel: "Cancel",
    },
  },
  [namespaces.pages.home]: {
    welcome: "Welcome",
  },
  [namespaces.pages.login]:{
    signIn: "Sign In",
    home:"Home",
    createAccount: "Didn't you account yet?",
    signUp: "Sign Up Here",
    enterEmail: "Enter email",
    enterPassword:"Enter Password"
  }
};

export default englishTranslation;