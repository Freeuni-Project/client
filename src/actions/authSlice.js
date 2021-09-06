import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token-short");
const userId = localStorage.getItem("user-id");

const initialState = {
  userId: userId ? userId : "",
  token: token ? token : "",
  role: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    removeToken: (state) => {
      state.token = "";
      state.role = "";
      localStorage.setItem("token-short", "");
      localStorage.setItem("user-role", "");
      localStorage.setItem("user-id", "");
    },
  },
});

export const { setToken, removeToken, setUserId } = authSlice.actions;

export default authSlice.reducer;
