import { createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, signOutAsync } from "./authAPI";
const initialState = {
  isLoggedIn: null,
  status: "idle",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.isLoggedIn = action.payload;
      })
      .addCase(checkUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.isLoggedIn = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.isLoggedIn = null;
      });
  },
});
export default authSlice;
