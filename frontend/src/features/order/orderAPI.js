import API from "../../services/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    try {
      console.log(order);
      const response = await API.post("/orders", order);
      for (let i = 0; i < order.products.length; i++) {}
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  "order/fetchAllOrders",
  async (pagination) => {
    let queryString = "";
    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`;
    }
    const response = await API.get(`/orders/all?${queryString}`);
    return {
      data: response.data.data,
      totalCount: response.data.totalCount,
    };
  }
);

export const updateOrderStatus = createAsyncThunk(
  "products/updateOrderStatus",
  async (order) => {
    const response = await API.patch(`/orders/${order.id}`, order);
    return response.data;
  }
);
