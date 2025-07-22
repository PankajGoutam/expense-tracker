import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const getExpenses = createAsyncThunk(
  "expenses/getExpenses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/expenses"); // Adjust this endpoint to match backend
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch expenses");
    }
  }
);

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
      });
  },
});

export default expenseSlice.reducer;
