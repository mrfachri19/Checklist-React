import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import promiseMiddleware from "redux-promise-middleware";
import rootReducer from "./reducer";
import AsyncStorage from "@react-native-community/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  applyMiddleware(promiseMiddleware, logger)
);
const persistor = persistStore(store);

export { store, persistor };
