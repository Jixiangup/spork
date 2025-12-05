import {SettingsApi} from "@/api/settings.ts";

const settingsApi = new SettingsApi();

export class Api {
  static getSettingsApi(): SettingsApi {
    return settingsApi;
  }
}