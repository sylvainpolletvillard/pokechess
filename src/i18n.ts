import i18next from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import en from "./locales/en/translation.json"
import fr from "./locales/fr/translation.json"

export const i18nLoadingPromise = i18next
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    debug: process.env.NODE_ENV !== "production",
    resources: {
      en: { translation: en },
      fr: { translation: fr }
    }
  })


export const t = i18next.t.bind(i18next)
export const i18n = i18next