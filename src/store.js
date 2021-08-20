import { configureStore } from "@reduxjs/toolkit";
// reducers
import authReducer from "./actions/authSlice";
import globalReducer from "./actions/globalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    global: globalReducer,
  },
});
