import { NativeModules, Platform } from 'react-native';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Database } from '../src/storage/database';
const db = new Database()
//languages
import en from './languages/en.json';
import tr from './languages/tr.json';
const resources = {
    'en_US':en,
    'tr_TR':tr
};

const lang = async () =>{
    let a = await db.getSettings()
    return a.data.language
}


export const deviceLanguage = Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;



i18n.use(initReactI18next).init({
    resources,
    compatibilityJSON: 'v3',
    lng: deviceLanguage,
});
export default i18n;
