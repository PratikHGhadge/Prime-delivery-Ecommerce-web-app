import API from "../../services/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    try {
      const response = await API.post("/orders", order);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
