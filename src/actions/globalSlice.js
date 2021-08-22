import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createProject: { show: false },
  navControl: { board: false, backlog: true },
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setCreateProject: (state, action) => {
      state.createProject.show = action.payload.show;
    },
    setNavControl: (state, action) => {
      state.navControl.backlog = action.payload.backlog;
      state.navControl.board = action.payload.board;
    },
  },
});

export const { setCreateProject, setNavControl } = globalSlice.actions;

export default globalSlice.reducer;
