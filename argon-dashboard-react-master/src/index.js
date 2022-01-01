import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducer";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import PageLayout from "layouts/page.js";

export const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/auth" render={(props) => <PageLayout {...props} />} />
        <Route path="/" render={(props) => <AuthLayout {...props} />} />

        <Redirect from="/auth/home" to="/auth/home" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
