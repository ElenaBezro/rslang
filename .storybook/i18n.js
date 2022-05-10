const { initReactI18next } = require('react-i18next');
const i18n = require('i18next');

const en = require('../src/translations/en.json');
const ru = require('../src/translations/ru.json');

const defaultNS = 'translations';

const resources = {
  en: {
    translations: en,
  },
  ru: {
    translations: ru,
  },
};

i18n.use(initReactI18next).init({
  resources,
  defaultNS,
  fallbackLng: 'ru',
  interpolation: {
    // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    escapeValue: false,
  },
});

export { defaultNS, resources };
