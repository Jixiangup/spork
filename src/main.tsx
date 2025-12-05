import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BaseStyles, ThemeProvider } from "@primer/react";
import { Routes } from '@generouted/react-router'
import { initI18n } from "@/i18n.ts";
import { fetchSettings } from "@/init";
import { defaultSettings, Settings } from "@/stores/core";

import '@/styles/global.css';

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = createRoot(rootElement);

(async () => {
	let settings: Settings = defaultSettings();
	try {
		try {
			settings = await fetchSettings();
		} catch (e) {
			console.error('Failed to fetch settings for i18n initialization:', e);
			settings = defaultSettings();
		}
		await initI18n(settings);
	} catch (error) {
		console.error("Failed to initialize i18n:", error);
	}
	console.log('Loaded settings:', settings);
	/* 设置主题 */
	document.documentElement.setAttribute('data-color-mode', settings.theme.mode);
	document.documentElement.setAttribute('data-light-theme', settings.theme.day_scheme);
	document.documentElement.setAttribute('data-dark-theme', settings.theme.night_scheme);
	root.render(
		<StrictMode>
			<ThemeProvider colorMode={settings.theme.mode} nightScheme={settings.theme.night_scheme} dayScheme={settings.theme.day_scheme}>
				<BaseStyles>
					<Routes />
				</BaseStyles>
			</ThemeProvider>
		</StrictMode>,
	);
})();