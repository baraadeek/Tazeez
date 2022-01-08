import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { Action, applyMiddleware, createStore } from "redux";
import rootReducer from "store/reducers/rootReducer";
import thunk from "redux-thunk";
import "./i18n/i18n";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const logger = (store: any) => {
  return (next: any) => {
    return (action: Action) => {
      console.log("this is Logger (Middleware)", action);
      const result = next(action);
      console.log("Middleware next state", store.getState());
      return result;
    };
  };
};

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
