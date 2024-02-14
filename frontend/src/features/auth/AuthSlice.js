import { createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, loginUser, signOutAsync } from "./authAPI";
const initialState = {
  loggedInUserToken: null,
  userChecked: false,
  error: "",
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
        state.loggedInUserToken = action.payload.token;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("hello" + action.payload);
        state.loggedInUserToken = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(checkUser.pending, (state) => {
        state.status = "loading";
        state.userChecked = false;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload.token;
        state.userChecked = true;
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.status = "idle";
        state.userChecked = true;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      });
  },
});
export default authSlice;
