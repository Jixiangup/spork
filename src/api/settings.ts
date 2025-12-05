import {GeneralSettings, Settings} from "@/stores/core.ts";
import {invoke} from "@tauri-apps/api/core";

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
}