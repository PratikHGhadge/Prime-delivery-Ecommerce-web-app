import { Navigate } from "react-router-dom";
import API from "../../services/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk("auth/user", async (user) => {
  console.log(user);
  const response = await API.post("/auth", user);
  return response.data;
});
export const checkUser = createAsyncThunk("auth/user", async (user) => {
  console.log(user);
  const response = await API.get("/auth", user);
  return response.data;
});
