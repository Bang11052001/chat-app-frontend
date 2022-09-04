import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  messages: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    fetchAllMessageRequest(state, action) {
      state.loading = true;
    },
    fetchAllMessageSuccess(state, action) {
      state.loading = false;
      state.messages = action.payload;
    },
    fetchAllMessageFailed(state, action) {
      state.loading = false;
      state.messages = [];
    },
  },
});

export const messageActions = messageSlice.actions;

const messageReducer = messageSlice.reducer;

export default messageReducer;
