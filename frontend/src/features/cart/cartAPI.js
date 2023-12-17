import { useDispatch } from "react-redux";
import API from "../../services/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk("cart/addToCart", async (item) => {
  console.log(item);
  const response = await API.post("/cart", item);
  return response.data;
});

export const fetchItemsByUserId = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async (userId) => {
    const response = await API.get(`/cart?userId=${userId}`);
    return response.data;
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (product) => {
    const response = await API.patch(`/cart/${product.id}`, product);
    return response.data;
  }
);

export const deleteItem = createAsyncThunk(
  "cart/deleteItem",
  async (ItemId) => {
    const response = await API.delete(`/cart/${ItemId}`);
    return { response, ItemId };
  }
);

export const resetCart = createAsyncThunk(
  "cart/resetCart",
  async (userId, { dispatch }) => {
    const response = await dispatch(fetchItemsByUserId(userId));
    console.log(response.payload);
    const items = response.payload;
    for (let item of items) {
      await dispatch(deleteItem(item.id));
    }
    // await Promise.all(items.map((item) => dispatch(deleteItem(item.id))));
    return { success: true };
  }
);
