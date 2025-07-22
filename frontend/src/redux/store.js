import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import expenseReducer from "./Slices/expenseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses : expenseReducer,
  },
});
