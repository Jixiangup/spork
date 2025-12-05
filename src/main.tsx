import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {BaseStyles, ThemeProvider} from "@primer/react";
import { Routes } from '@generouted/react-router'
import {initI18n} from "@/i18n.ts";

import '@/styles/reset.css';
import '@/styles/global.css';

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = createRoot(rootElement);

(async () => {
  try {
    await initI18n();
  } catch (error) {
    console.error("Failed to initialize i18n:", error);
  }
  root.render(
    <StrictMode>
      <ThemeProvider colorMode='auto' nightScheme='dark_dimmed' dayScheme='light'>
        <BaseStyles>
          <Routes/>
        </BaseStyles>
      </ThemeProvider>
    </StrictMode>,
  );
})();