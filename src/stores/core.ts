import { DEFAULT_LANGUAGE, type SupportedLanguages } from "@/i18n.ts";

export type ThemeScheme = 'light' | 'light_colorblind' | 'light_tritanopia' | 'light_high_contrast' | 'dark' | 'dark_colorblind' | 'dark_tritanopia' | 'dark_dimmed';
export type ThemeMode = 'auto' | 'day' | 'night';

interface GeneralSettingsSchema {
	language: SupportedLanguages;
}

interface SettingsSchema {
	general: GeneralSettingsSchema;
	theme: ThemeSettingsSchema;
}

interface ThemeSettingsSchema {
	mode: ThemeMode;
	scheme: ThemeScheme;
	night_scheme: ThemeScheme;
	day_scheme: ThemeScheme;
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
		mode: 'auto',
		scheme: 'dark_dimmed',
		night_scheme: 'dark_dimmed',
		day_scheme: 'light',
	}
}

export const defaultSettings = (): Settings => {
	return {
		general: defaultGeneralSettings(),
		theme: defaultThemeSettings(),
	}
}