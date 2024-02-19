import { Navigate } from "react-router-dom";
import API from "../../services/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk("users/createUser", async (user) => {
  const response = await API.post("/auth/signup", user);
  return response.data;
});

// google authentication
export const createUserWithGoogle = createAsyncThunk(
  "users/createUserWithGoogle",
  async () => {
    const response = await API.get("/auth/login/sucess", {
      withCredentials: true,
    });
    return response;
  }
);

export const checkUser = createAsyncThunk("users/checkUser", async () => {
  try {
    const response = await API.get("/auth/check");
    // save the user in redux state
    return response.data.token;
  } catch (error) {
    // Use rejectWithValue to pass a custom payload for the rejected action
    return rejectWithValue({
      message: "Error during user check",
      errorDetails: error.response.data, // or any other relevant error information
    });
  }
});

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/login", user);
      return response.data;
    } catch (error) {
      // Use rejectWithValue to pass a custom payload for the rejected action
      alert("User is Unauthorized");
      return rejectWithValue({
        message: "Error during user logging user",
        errorDetails: error.response.data,
      });
    }
  }
);

export const signOutAsync = createAsyncThunk(
  "users/signOutAsync",
  async (user) => {
    try {
      // TO Do : on server we will remove user session
      const response = await API.get("/auth/logout");
      // Navigate("/login");
      return { success: true };
    } catch (error) {}
  }
);
