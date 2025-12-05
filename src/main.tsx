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
	let settings: Settings;
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
	root.render(
		<StrictMode>
			<ThemeProvider colorMode='auto' nightScheme='dark_dimmed' dayScheme='light'>
				<BaseStyles>
					<Routes />
				</BaseStyles>
			</ThemeProvider>
		</StrictMode>,
	);
})();