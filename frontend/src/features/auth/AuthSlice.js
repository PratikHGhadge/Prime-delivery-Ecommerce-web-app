import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCount } from "./authAPI";

const initialState = {
  value: 0,
  status: "idle",
};

export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount) => {
    const response = await fetchCount(amount);
    // The values we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const couterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // counter slice action
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value += action.payload;
      });
  },
});

export const { increment } = couterSlice.actions;
export const selectCount = (state) => state.counter.value;
export default couterSlice.reducer;
