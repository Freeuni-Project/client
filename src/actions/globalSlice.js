import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createProject: { show: false },
  navControl: { board: false, backlog: true },
  currentProject: {},
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
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
  },
});

export const { setCreateProject, setNavControl, setCurrentProject } =
  globalSlice.actions;

export default globalSlice.reducer;
