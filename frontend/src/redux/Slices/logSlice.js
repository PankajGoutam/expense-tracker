import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

// GET expenses
export const getAuditLogs = createAsyncThunk(
  "expenses/getAuditLogs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("api/logs");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch auditlogs");
    }
  }
);



// Slice
const logSlice = createSlice({
  name: "logs",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAuditLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAuditLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getAuditLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default logSlice.reducer;
