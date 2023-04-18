import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { i18nextPlugin } from 'translation-check'
import Backend from 'i18next-http-backend';
export const languages = ['en', 'uk']
i18n.use(LanguageDetector)
    .use(Backend)
    .use(initReactI18next)
    .use(i18nextPlugin)
    .init({
        initImmediate: false,
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        }
    });

export default i18n;