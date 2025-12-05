import i18n from "i18next";
import Fluent from "i18next-fluent";
import FluentBackend from "i18next-fluent-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";
import {fetchSettings} from "@/init.ts";
import {defaultSettings, Settings} from "@/stores/core.ts";

export const DEFAULT_LANGUAGE = 'zh-Hans';

export type SupportedLanguages = 'zh-Hans' | 'en-US';


export const initI18n = async () => {
  let settings: Settings;
  try {
    settings = await fetchSettings();
  } catch (e) {
    console.error('Failed to fetch settings for i18n initialization:', e);
    settings = defaultSettings();
  }
  await i18n
    .use(Fluent)
    .use(FluentBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: DEFAULT_LANGUAGE,
      ns: ['core', 'settings', 'layout'],
      defaultNS: 'core',
      interpolation: { escapeValue: false },
      lng: settings.general.language,
      backend: { loadPath: '/locales/{{lng}}/{{ns}}.ftl' },
    });
}

export default i18n;