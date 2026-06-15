import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import App from "./App";
import { getConfig } from "./features/settings/api";
import i18n, { initializeI18n } from "./locales";
import { ErrorBoundary } from "./components/ErrorBoundary";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Missing root element");
}

const mountTarget = rootElement;

async function bootstrap() {
  let locale: string | undefined;

  try {
    const config = await getConfig();
    locale = config.locale;
  } catch {
    locale = undefined;
  }

  await initializeI18n(locale);

  ReactDOM.createRoot(mountTarget).render(
    <React.StrictMode>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ErrorBoundary>
    </React.StrictMode>,
  );
}

void bootstrap();
