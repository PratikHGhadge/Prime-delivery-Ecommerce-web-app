import { createSlice } from "@reduxjs/toolkit";
import {
  fetchLoggedInUser,
  updateUser,
  fetchLoggedInUserOrders,
} from "./userAPI";

const initialState = {
  status: "idle",
  userInfo: null,
  orders: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUser.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload);
        state.userInfo = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "idle";
        // console.log(action.payload);
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrders.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload;
      });
  },
});
export default userSlice;
