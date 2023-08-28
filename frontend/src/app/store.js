import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/product/ProductSlice";
import { authSlice } from "../features/auth/AuthSlice";
import { cartSlice } from "../features/cart/cartSlice";
export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  },
});
