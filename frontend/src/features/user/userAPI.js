import API from "../../services/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLoggedInUser = createAsyncThunk(
  "users/fetchLoggedInUser",
  async (userId) => {
    const response = await API.get(`/users/${userId}`);
    console.log(response.data);
    return response.data;
  }
);

export const fetchLoggedInUserOrders = createAsyncThunk(
  "users/fetchLoggedInUserOrders",
  async (userId) => {
    const response = await API.get(`/orders/?user=${userId}`);
    return response.data;
  }
);

export const updateUser = createAsyncThunk("users/updateUser", async (user) => {
  const response = await API.patch(`/users/${user.id}`, user);
  return response.data;
});
