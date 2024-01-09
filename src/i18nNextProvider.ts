import i18n from 'i18next';
import { useI18nextProvider, convertRaTranslationsToI18next } from 'ra-i18n-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import enOriginal from 'ra-language-english';
import svOriginal from 'ra-language-swedish';
import { TranslationMessages, resolveBrowserLocale } from 'react-admin';
import myEn from './locales/en.json'
import mySv from './locales/sv.json'

enOriginal.ra.page.dashboard = 'Start'
svOriginal.ra.page.dashboard = 'Starta'
const en = {
    ...enOriginal,
    ...myEn
}

const sv = {
    ...svOriginal,
    ...mySv,
};

const i18nextInstance = i18n.use(
    resourcesToBackend((language: string) => {
        if (language === 'sv') {
            return convertRaTranslationsToI18next(sv)
        }
        return convertRaTranslationsToI18next(en)
    })
);

export const useMyI18nProvider = () => useI18nextProvider({
    i18nextInstance,
    availableLocales: [
        { locale: 'en', name: 'English' },
        { locale: 'sv', name: 'Swedish' },
    ],
});