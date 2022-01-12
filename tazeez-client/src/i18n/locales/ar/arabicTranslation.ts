import { namespaces } from "i18n/i18n.constants";

 const arabicTranslation = {
  [namespaces.common]: {
    buttons: {
      ok: "حسنا",
      cancel: "الغاء",
    },
  },
  [namespaces.pages.home]: {
    welcome: "مرحبا",
  },
  [namespaces.pages.login]:{
    signIn: "تسجيل دخول",
    home: "الصفحة الرئيسية",
    createAccount: "ألم تقم بحسابك بعد؟",
    signUp: "سجل هنا",
    enterEmail: "أدخل البريد الإلكتروني",
    enterPassword: "أدخل الرقم السري"
  }
};

export default arabicTranslation;