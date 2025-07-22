import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

// GET expenses
export const getExpenses = createAsyncThunk(
  "expenses/getExpenses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("api/expenses");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch expenses");
    }
  }
);

// POST (Add) expense
export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (expenseData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("user", expenseData.user);
      formData.append("amount", expenseData.amount);
      formData.append("category", expenseData.category);
      formData.append("date", expenseData.date);
      formData.append("notes", expenseData.notes);
      if (expenseData.receipt) {
        formData.append("receipt", expenseData.receipt); // Image file
      }

      const res = await axios.post("api/expenses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add expense");
    }
  }
);

// PUT (Update) expense status
export const updateExpenseStatus = createAsyncThunk(
  "expenses/updateExpenseStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`api/expenses/${id}/status`, { status });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update status");
    }
  }
);

// Slice
const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // POST handler
      .addCase(addExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload); // add new expense to list
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // PUT expense status
      .addCase(updateExpenseStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpenseStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(exp => exp._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateExpenseStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default expenseSlice.reducer;
