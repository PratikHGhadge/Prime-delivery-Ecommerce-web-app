import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/product/ProductSlice";
import { authSlice } from "../features/auth/AuthSlice";

export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    auth: authSlice.reducer,
  },
});
