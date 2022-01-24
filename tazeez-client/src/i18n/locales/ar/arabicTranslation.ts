import { namespaces } from "i18n/i18n.constants";
import translationKeys from "../translationKeys";

const arabicTranslation = {
  [namespaces.common]: {
    buttons: {
      ok: "حسنا",
      cancel: "الغاء",
    },
    [translationKeys.common.homePage]: "الصفحة الرئيسية",
    [translationKeys.common.about]: "حول",
  },
  [namespaces.pages.home]: {
    welcome: "مرحبا",
  },
  [namespaces.pages.login]: {
    [translationKeys.pages.login.login]: "تسجيل دخول",
    [translationKeys.pages.login.createAccount]: "ألم تقم بحسابك بعد؟",
    [translationKeys.pages.login.signUp]: "سجل هنا",
    [translationKeys.pages.login.enterEmail]: "أدخل البريد الإلكتروني",
    [translationKeys.pages.login.enterPassword]: "أدخل الرقم السري",
    [translationKeys.pages.login.enterFirstName]: "الاسم الاول",
    [translationKeys.pages.login.enterLastName]: "الاسم الاخير",
    [translationKeys.pages.login.alreadyAccount]: "هل لديك حساب؟",
    [translationKeys.pages.login.homePage]: "الصفحة الرئيسية",
  },
  [namespaces.pages.authNavbar]: {
    [translationKeys.pages.authNavbar.login]: "تسجيل دخول",
    [translationKeys.pages.authNavbar.homePage]: "الصفحة الرئيسية",
    [translationKeys.pages.authNavbar.about]: "حول",
    [translationKeys.pages.authNavbar.blog]: "مدونة",
    [translationKeys.pages.authNavbar.contact]: "تواصل",
    [translationKeys.pages.authNavbar.doctors]: "الدكاترة",
    [translationKeys.pages.authNavbar.services]: "الخدمات",
  },
  [namespaces.routes.authRoutes]:{
    [translationKeys.authRoutes.doctors]:"الأطباء",
    [translationKeys.authRoutes.profile]:"الملف الشخصي",
    [translationKeys.authRoutes.questionsTemplate]:"نموذج الاسئلة",
    [translationKeys.authRoutes.questionsTemplatesList]:"قائمة نماذج الأسئلة",
  }
};

export default arabicTranslation;
