import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  fetchItemsByUserId,
  updateCart,
  deleteItem,
  resetCart,
} from "./cartAPI";

const initialState = {
  cartItems: [],
  status: "idle",
  cartLoaded: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems.push(action.payload);
      })
      .addCase(fetchItemsByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserId.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems = action.payload;
        state.cartLoaded = true;
      })
      .addCase(fetchItemsByUserId.rejected, (state, action) => {
        state.status = "idle";
        state.cartLoaded = true;
      })
      .addCase(updateCart.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        const cartItemsId = action.payload.id;
        state.cartItems[state.cartItems.findIndex((e) => e.id == cartItemsId)] =
          action.payload;
      })
      .addCase(deleteItem.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload);
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.ItemId
        );
        state.cartLoaded = true;
      })
      .addCase(resetCart.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(resetCart.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload);
        state.cartItems = [];
      });
  },
});

export default cartSlice;
