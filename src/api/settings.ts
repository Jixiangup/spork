import { GeneralSettings, Settings, ThemeScheme } from "@/stores/core.ts";
import { invoke } from "@tauri-apps/api/core";

interface ThemeOptions {
	onlyAvailableSchemes?: boolean;
}

const defaultThemeOptions: ThemeOptions = {
	onlyAvailableSchemes: false,
};

export class SettingsApi {
	async settings(): Promise<Settings> {
		return await invoke<Settings>('settings');
	}

	async generalSettings(): Promise<GeneralSettings> {
		const settings = await this.settings();
		return settings.general;
	}

	async updateSettings(newSettings: Settings): Promise<void> {
		await invoke<void>('save_settings', { settings: newSettings });
	}

	async schemes(options?: ThemeOptions): Promise<ThemeScheme[]> {
		const opts = { ...defaultThemeOptions, ...options };
		return await invoke<ThemeScheme[]>('schemes', { options: { only_available_schemes: opts.onlyAvailableSchemes } });
	}
}