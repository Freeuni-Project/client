import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectUsers: [],
  addTicket: { show: false, data: {} },
  tickets: {},
  refetch: "",
  boardModal: { show: false, data: {} },
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
    setTickets: (state, action) => {
      state.tickets = action.payload;
    },
    setRefetch: (state, action) => {
      state.refetch = action.payload;
    },
    setBoardModalShow: (state) => {
      state.boardModal.show = !state.boardModal.show;
    },
    setBoardModalData: (state, action) => {
      state.boardModal.data = action.payload;
    },
  },
});

export const {
  setProjectUsers,
  setAddTicketShow,
  setAddTicketData,
  setTickets,
  setRefetch,
  setBoardModalShow,
  setBoardModalData,
} = currentProjectSlice.actions;

export default currentProjectSlice.reducer;
