import {Settings} from "@/stores/core.ts";
import {Api} from "@/api";

export const fetchSettings = async (): Promise<Settings> => {
  return await Api.getSettingsApi().settings();
}