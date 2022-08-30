import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  chatList: [],
  selectedChatId: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    accessChat() {},
    fetchAllChatRequest(state, action) {
      state.isLoading = true;
    },
    fetchAllChatSuccess(state, action) {
      state.isLoading = false;
      state.chatList = action.payload;
    },
    fetchAllChatFailed(state, action) {
      state.isLoading = false;
      state.chatList = {};
    },
    selectChat(state, action) {
      state.selectedChatId = action.payload;
    },
  },
});

export const chatActions = chatSlice.actions;

const chatReducer = chatSlice.reducer;
export default chatReducer;
