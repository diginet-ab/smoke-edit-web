import polyglotI18nProvider from 'ra-i18n-polyglot';
import enOriginal from 'ra-language-english';
import svOriginal from 'ra-language-swedish';
import { TranslationMessages, resolveBrowserLocale } from 'react-admin';
import myEn from './locales/en'
import mySv from './locales/sv'

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

const translations = { en, sv } as { [index: string]: TranslationMessages };
export const i18nProvider = polyglotI18nProvider(
    locale => translations[locale] ? translations[locale] : translations.en,
    resolveBrowserLocale(),
    [
        { locale: 'en', name: 'English' },
        { locale: 'sv', name: 'Svenska' }
    ],
);