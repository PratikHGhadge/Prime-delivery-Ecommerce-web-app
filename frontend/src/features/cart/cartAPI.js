import API from "../../services/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk("cart/addToCart", async (item) => {
  console.log(item);
  const response = await API.post("/cart", item);
  return response.data;
});

// export const checkUser = createAsyncThunk("users/checkUser", async (user) => {
//   console.log(user);
//   const response = await API.get(`/users?email=${user.email}`, user);
//   return response.data;
// });
