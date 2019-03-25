import { AsyncStorage } from "react-native";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "rootsexy",
  storage: AsyncStorage
};

const middleware: [any] = [thunk];

if (__DEV__) {
  middleware.push(logger);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistedStore = persistStore(store);
