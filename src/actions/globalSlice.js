import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createProject: { show: false },
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setCreateProject: (state, action) => {
      state.createProject.show = action.payload.show;
    },
  },
});

export const { setCreateProject } = globalSlice.actions;

export default globalSlice.reducer;
