import { useDispatch } from "react-redux";
import API from "../../services/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk("cart/addToCart", async (item) => {
  const response = await API.post("/cart", item);
  return response.data.response;
});

export const fetchItemsByUserId = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async () => {
    const response = await API.get(`/cart`);
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
  async ({ dispatch }) => {
    const response = await dispatch(fetchItemsByUserId());
    const items = response.payload.cartItems;
    for (let item of items) {
      await dispatch(deleteItem(item.id));
    }
    // await Promise.all(items.map((item) => dispatch(deleteItem(item.id))));
    return { success: true };
  }
);
