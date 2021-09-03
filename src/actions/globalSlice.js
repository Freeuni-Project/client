import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerData: {},
  currentProject: {},
  createProject: { show: false },
  navControl: { board: false, backlog: true },
  projectEdit: { show: false, project: {} },
  allUsers: [],
  addMember: { show: false, data: {} },
  removeMember: { show: false, id: 0 },
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
    setProjectShow: (state, action) => {
      state.projectEdit.show = action.payload;
    },
    setProjectData: (state, action) => {
      state.projectEdit.project = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setAddMemberShow: (state) => {
      state.addMember.show = !state.addMember.show;
    },
    setAddMemberData: (state, action) => {
      state.addMember.data = action.payload;
    },
    setRemoveMemberShow: (state) => {
      state.removeMember.show = !state.removeMember.show;
    },
    setRemoveMemberData: (state, action) => {
      state.removeMember.id = action.payload;
    },
  },
});

export const {
  setCreateProject,
  setNavControl,
  setCurrentProject,
  setRegisterData,
  // edit project
  setProjectShow,
  setProjectData,
  // all users
  setAllUsers,
  // add member
  setAddMemberShow,
  setAddMemberData,
  // remove member
  setRemoveMemberShow,
  setRemoveMemberData,
} = globalSlice.actions;

export default globalSlice.reducer;
