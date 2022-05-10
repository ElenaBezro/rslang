import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
// import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../translations/en.json';
import ru from '../translations/ru.json';

const defaultNS = 'translations';

const resources = {
  en: {
    translations: en
  },
  ru: {
    translations: ru
  }
};

i18n
  // .use(Backend) // TODO: store locales on the server side
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    defaultNS,
    fallbackLng: 'ru',
    interpolation: {
      // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      escapeValue: false
    }
  });

export { defaultNS, resources };