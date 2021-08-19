import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token-short");

const initialState = {
  token: token ? token : "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem("token-short", action.payload);
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = "";
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
