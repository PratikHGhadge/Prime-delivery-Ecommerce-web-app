import { configureStore } from "@reduxjs/toolkit";
import { couterReducer } from "../features/counter/CounterSlice";

export const store = configureStore({
  reducer: {
    conunter: couterReducer,
  },
});
