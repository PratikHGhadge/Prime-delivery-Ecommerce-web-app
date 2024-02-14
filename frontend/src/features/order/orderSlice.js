import { createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchAllOrders, updateOrderStatus } from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder: null,
  totalOrders: 0,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.data;
        console.log(action.payload.totalCount);
        state.totalOrders = action.payload.totalCount;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.status = "idle";
        const orderId = action.payload.data.id;
        console.log(action.payload.data.id);
        state.orders[state.orders.findIndex((e) => e.id == orderId)] =
          action.payload.data;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice;
