/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProviderProvider } from "react-redux";
import store from "./app/store";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0052cc",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProviderProvider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ReduxProviderProvider>
    </BrowserRouter>
  </React.StrictMode>
);
