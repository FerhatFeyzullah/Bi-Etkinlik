import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import defaultTR from './assets/locales/tr/default.json';
import { API_HOST } from './constants/api';

let language = 'tr';

i18n
  .use(initReactI18next)
  .use(Backend)
  .init({
    fallbackLng: 'tr',
    lng: language,
    ns: ['button', 'tooltip', 'text', 'input', 'alert', 'category', 'default'],
    // fallbackNS: 'default',
    // resources: {
    //     tr: { default: defaultTR },
    // },
    backend: {
      loadPath: `${API_HOST}/locales/{{lng}}/{{ns}}.json`,
    },
    react: {
      useSuspense: false, // async load için
    },
  });

export default i18n;
