import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { languages, namespaces } from "./i18n.constants";
import englishTranslation from "./locales/en/englishTranslation";
import arabicTranslation from "./locales/ar/arabicTranslation";
import i18next, { i18n as i18nInstance } from "i18next";
import { LOCAL_STORAGE_KEYS } from "common/constants/constants";
// import i18n from "i18next";

// const fallbackLng = ["en"];
// const availableLanguages = ["en", "ar"];
const resources = {
  [languages.ar]: arabicTranslation,
  [languages.en]: englishTranslation,
} as const;

const createI18n = (language: string): i18nInstance => {
  const i18n = i18next
    .createInstance()
    .use(initReactI18next)
    .use(LanguageDetector);

  i18n.init({
    lng: language,
    ns: [namespaces.common, namespaces.pages.home],
    fallbackLng: language,
    resources,
  });

  return i18n;
};

export default createI18n(
  localStorage.getItem(LOCAL_STORAGE_KEYS.i18nextLng) || languages.en
);

// //@ts-ignore
// i18n
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     resources,
//     fallbackLng,

//     detection: {
//       checkWhitelist: true
//     },

//     debug: false,

//     whitelist: availableLanguages,

//     interpolation: {
//       escapeValue: false
//     }
//   });

// export default i18n;
