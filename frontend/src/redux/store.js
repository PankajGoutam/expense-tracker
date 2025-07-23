import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Reducers
import authReducer from "./Slices/authSlice";
import expenseReducer from "./Slices/expenseSlice";
import uiReducer from "./Slices/uiSlice";
import logReducer from "./Slices/logSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expenseReducer,
  ui: uiReducer,
  logs: logReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
