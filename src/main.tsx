import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { HashRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundaryFallBack } from "./components/";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./mui/theme.ts";
import { Provider } from "react-redux";
import { store } from "../src/redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallBack}>
        <HelmetProvider>
          <HashRouter>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </HashRouter>
        </HelmetProvider>
      </ErrorBoundary>
    </Provider>
  </StrictMode>,
);
