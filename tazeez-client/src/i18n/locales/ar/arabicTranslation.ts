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
    [translationKeys.pages.authNavbar.doctors]: "الأطباء",
    [translationKeys.pages.authNavbar.services]: "الخدمات",
  },
  [namespaces.routes.authRoutes]:{
    [translationKeys.authRoutes.doctors]:"الأطباء",
    [translationKeys.authRoutes.profile]:"الملف الشخصي",
    [translationKeys.authRoutes.questionsTemplate]:"نموذج الاسئلة",
    [translationKeys.authRoutes.questionsTemplatesList]:"قائمة نماذج الأسئلة",
    [translationKeys.authRoutes.createQuestionnaire]:"إنشاء إستبيان",
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
    [translationKeys.question.optional]: "اختياري",
    [translationKeys.question.lastUpdated]: "التحديث الاخير ",
    [translationKeys.question.created]: "الأنشاء",
    [translationKeys.question.questionType]: "نوع السؤال",
  },
  [namespaces.profile]: {
    [translationKeys.profile.firstName]: "الأسم الأول",
    [translationKeys.profile.lastName]: "الأسم الأخير",
    [translationKeys.profile.email]: "البريد الالكتروني",
    [translationKeys.profile.city]: "المدينة",
    [translationKeys.profile.phoneNumber]: "رقم الهاتف",
    [translationKeys.profile.contactInformation]: "معلومات التواصل",
    [translationKeys.profile.editProfile]: "تعديل الملف الشخصي",
    [translationKeys.profile.userInformation]: "معلومات المستخدم ",
    [translationKeys.profile.myProfile]: "ملف التعريف الخاص بي ",
    [translationKeys.profile.logOut]: "تسجيل الخروج",
  },
  [namespaces.doctor]: {
    [translationKeys.doctor.name]: "الأسم",
    [translationKeys.doctor.save]: "حفظ",
    [translationKeys.doctor.close]: "أغلق",
    [translationKeys.doctor.lastUpdated]: "التحديث الاخير ",
    [translationKeys.doctor.created]: "الأنشاء",
    [translationKeys.doctor.email]: "البريد الالكتروني",
    [translationKeys.doctor.description]: "وصف",
    [translationKeys.doctor.users]: "المستخدمون",
    [translationKeys.doctor.specialist]: "التخصص",
    [translationKeys.doctor.phoneNumber]: "رقم الهاتف",
    [translationKeys.doctor.city]: "المدينة",
    [translationKeys.doctor.available]: "لا توجد اطباء متاحة!",
    [translationKeys.doctor.doctors]: "الأطباء",
    [translationKeys.doctor.delete]: "حذف",
    [translationKeys.doctor.deleteMassage]: "هل تريد حذف هذا الطبيب؟",
    [translationKeys.doctor.deleteDoctor]: "حذف الطبيب",
    [translationKeys.doctor.addDoctor]: "إضافة طبيب",
    [translationKeys.doctor.editDoctor]: "تعديل طبيب",
  },
  [namespaces.pages.createQuestionnaire]:{
    [translationKeys.pages.createQuestionnaire.questionnaireTitle]:"عنوان الإستبيان"
  }
};

export default arabicTranslation;
