import { namespaces } from "i18n/i18n.constants";
import translationKeys from "../translationKeys";

 const arabicTranslation = {
  [namespaces.common]: {
    buttons: {
      ok: "حسنا",
      cancel: "الغاء",

     },
      [translationKeys.common.homePage]  : "الصفحة الرئيسية",
  },
  [namespaces.pages.home]: {
    welcome: "مرحبا",
  },
  [namespaces.pages.login]:{
    [translationKeys.pages.login.login]: "تسجيل دخول",
    [translationKeys.pages.login.createAccount]: "ألم تقم بحسابك بعد؟",
    [translationKeys.pages.login.signUp]: "سجل هنا",
    [translationKeys.pages.login.enterEmail]: "أدخل البريد الإلكتروني",
    [translationKeys.pages.login.enterPassword]: "أدخل الرقم السري"
  }
};

export default arabicTranslation;