import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { LOCAL_STORAGE_KEYS } from "common/constants/constants";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import rootReducer from "store/reducers/rootReducer";
import { Action } from "redux";

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

const persistConfig:PersistConfig<any> = {
  key: LOCAL_STORAGE_KEYS.persistedRoot,
  storage,
whitelist:["auth", "app"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);
