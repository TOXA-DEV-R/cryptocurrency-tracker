/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProviderProvider } from "react-redux";
import store from "./app/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProviderProvider store={store}>
        <App />
      </ReduxProviderProvider>
    </BrowserRouter>
  </React.StrictMode>
);
