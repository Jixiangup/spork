import {DEFAULT_LANGUAGE, type SupportedLanguages} from "@/i18n.ts";

interface GeneralSettingsSchema {
  language: SupportedLanguages;
}

interface SettingsSchema {
  general: GeneralSettingsSchema;
  theme: ThemeSettingsSchema;
}

interface ThemeSettingsSchema {
  mode: 'sync' | 'single';
}

export type GeneralSettings = GeneralSettingsSchema;

export type Settings = SettingsSchema;

export type ThemeSettings = ThemeSettingsSchema;

const defaultGeneralSettings = (): GeneralSettings => {
  return {
    language: DEFAULT_LANGUAGE,
  }
}

const defaultThemeSettings = (): ThemeSettings => {
  return {
    mode: 'sync',
  }
}

export const defaultSettings = (): Settings => {
  return {
    general: defaultGeneralSettings(),
    theme: defaultThemeSettings(),
  }
}