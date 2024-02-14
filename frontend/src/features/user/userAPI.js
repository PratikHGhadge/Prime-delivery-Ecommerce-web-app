import API from "../../services/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLoggedInUser = createAsyncThunk(
  "users/fetchLoggedInUser",
  async () => {
    const response = await API.get(`/users`);
    return response.data;
  }
);

export const fetchLoggedInUserOrders = createAsyncThunk(
  "users/fetchLoggedInUserOrders",
  async () => {
    const response = await API.get(`/orders`);
    return response.data;
  }
);

export const updateUser = createAsyncThunk("users/updateUser", async (user) => {
  const response = await API.patch(`/users`, user);
  return response.data;
});
