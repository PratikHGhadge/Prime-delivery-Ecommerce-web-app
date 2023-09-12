import { createSlice } from "@reduxjs/toolkit";
import { addToCart } from "./cartAPI";

const initialState = {
  cartItems: [],
  status: "idle",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // user slice action
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems.push(action.payload);
      });
    // .addCase(checkUser.pending, (state) => {
    //   state.status = "loading";
    // })
    // .addCase(checkUser.fulfilled, (state, action) => {
    //   state.status = "idle";
    //   state.isLoggedIn = action.payload;
    // });
  },
});

export default cartSlice;
