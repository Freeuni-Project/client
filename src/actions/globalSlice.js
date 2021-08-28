import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerData: {},
  currentProject: {},
  createProject: { show: false },
  navControl: { board: false, backlog: true },
  projectEdit: { show: false, project: {} },
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
    setRegisterData: (state, action) => {
      state.registerData = action.payload;
    },
    setProjectEdit: (state, action) => {
      state.projectEdit.show = action.payload.show;
      state.projectEdit.project = action.payload.project;
    },
  },
});

export const {
  setCreateProject,
  setNavControl,
  setCurrentProject,
  setRegisterData,
  setProjectEdit,
} = globalSlice.actions;

export default globalSlice.reducer;
