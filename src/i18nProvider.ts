import polyglotI18nProvider from 'ra-i18n-polyglot';
import enOriginal from 'ra-language-english';
import svOriginal from 'ra-language-swedish';
import { TranslationMessages } from 'react-admin';
import myEn from './i18n/en'
import mySv from './i18n/sv'

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
    locale => translations[locale],
    'en', // default locale
    [
        { locale: 'en', name: 'English' },
        { locale: 'sv', name: 'Svenska' }
    ],
);