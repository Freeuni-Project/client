import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token-short");

const initialState = {
  token: token ? token : "",
  role: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem("token-short", action.payload);
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    removeToken: (state) => {
      state.token = "";
      state.role = "";
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
