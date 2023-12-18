import API from "../../services/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk("users/createUser", async (user) => {
  console.log(user);
  const response = await API.post("/users", user);
  return response.data;
});
export const checkUser = createAsyncThunk("users/checkUser", async (user) => {
  console.log(user);
  const response = await API.get(`/users?email=${user.email}`);
  return response.data[0];
});

export const signOutAsync = createAsyncThunk(
  "users/signOutAsync",
  async (user) => {
    // TO Do : on server we will remove user session
    return { success: true };
  }
);
