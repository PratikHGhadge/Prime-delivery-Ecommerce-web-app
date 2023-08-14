import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/product/ProductSlice";

export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
  },
});
