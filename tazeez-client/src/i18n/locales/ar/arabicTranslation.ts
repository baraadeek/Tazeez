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
  [namespaces.template]: {
    [translationKeys.template.add]: "أضف قالب جديد",
    [translationKeys.template.save]: "حفظ",
    [translationKeys.template.close]: "أغلق",
    [translationKeys.template.title]: "العنوان",
    [translationKeys.template.q]: "س",
  },

  [namespaces.question]: {
    [translationKeys.question.add]: "أضف قالب جديد",
    [translationKeys.question.save]: "حفظ",
    [translationKeys.question.close]: "أغلق",
    [translationKeys.question.delete]: "حذف",
    [translationKeys.question.choice]: "الاختيار",
    [translationKeys.question.questionName]: "أسم السؤال",
    [translationKeys.question.score]: "مجموع النقاط",
    [translationKeys.question.order]: "الترتيب",
    [translationKeys.question.yes]: "نعم",
    [translationKeys.question.no]: "لا",
    [translationKeys.question.isOptional]: "هل تريد هذا السؤال اختياري",
    [translationKeys.question.mustChoice]: "يجب عليك إضافة اختيارات",
    [translationKeys.question.questions]: "الاسئلة",
    [translationKeys.question.available]: "لا توجد أسئلة متاحة!",
  },
};

export default arabicTranslation;
