// src/redux/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isModalOpen: false,
    isAddExpenseFormOpen: false,
  },
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    openAddExpenseForm: (state) => {
      state.isAddExpenseFormOpen = true;
    },
    closeAddExpenseForm: (state) => {
      state.isAddExpenseFormOpen = false;
    },
  },
});

export const {
  openModal,
  closeModal,
  openAddExpenseForm,
  closeAddExpenseForm,
} = uiSlice.actions;

export default uiSlice.reducer;
