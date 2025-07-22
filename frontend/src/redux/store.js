import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import expenseReducer from "./Slices/expenseSlice";
import uiReducer from "./Slices/uiSlice"
import logReducer from "./Slices/logSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses : expenseReducer,
    ui: uiReducer,
    logs:logReducer,
  },
});
