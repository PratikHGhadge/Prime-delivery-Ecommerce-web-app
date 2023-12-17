import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/product/ProductSlice";
import { authSlice } from "../features/auth/AuthSlice";
import { cartSlice } from "../features/cart/cartSlice";
import { userSlice } from "../features/user/userSlice";
import { orderSlice } from "../features/order/orderSlice";
export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    user: userSlice.reducer,
    order: orderSlice.reducer,
  },
});
