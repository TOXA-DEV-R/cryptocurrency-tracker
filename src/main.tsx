/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProviderProvider } from "react-redux";
import store from "./app/store";
import { GlobalContextProvider } from "./context/context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProviderProvider store={store}>
        <GlobalContextProvider>
          <App />
        </GlobalContextProvider>
      </ReduxProviderProvider>
    </BrowserRouter>
  </React.StrictMode>
);
