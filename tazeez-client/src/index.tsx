import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import "./i18n/i18n";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// Soft UI Context Provider
import { MaterialUIControllerProvider } from "context";
import axios from "axios";
import { persistor, store } from "store/configureStore";
import { PersistGate } from "redux-persist/integration/react";

axios.create({
  baseURL: "https://localhost:5001/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    common: `bearer ${localStorage.getItem("token")}`,
  },
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <React.StrictMode>
          <MaterialUIControllerProvider>
            <App />
          </MaterialUIControllerProvider>
        </React.StrictMode>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
