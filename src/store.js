import { configureStore } from "@reduxjs/toolkit";
// reducers
import authReducer from "./actions/authSlice";
import globalReducer from "./actions/globalSlice";
import currentProjectReducer from "./actions/currentProjectSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    global: globalReducer,
    current: currentProjectReducer,
  },
});
