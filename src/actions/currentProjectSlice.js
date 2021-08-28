import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  projectUsers: [],
  addTicket: { show: false, data: {} },
};

const currentProjectSlice = createSlice({
  name: "current",
  initialState,
  reducers: {
    setProjectUsers: (state, action) => {
      state.projectUsers = action.payload;
    },
    setAddTicketShow: (state) => {
      state.addTicket.show = !state.addTicket.show;
    },
    setAddTicketData: (state, action) => {
      state.addTicket.data = action.payload;
    },
  },
});

export const { setProjectUsers, setAddTicketShow, setAddTicketData } =
  currentProjectSlice.actions;

export default currentProjectSlice.reducer;
