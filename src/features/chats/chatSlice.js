import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  chatList: [],
  selectedChat: {},
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
      state.selectedChat = action.payload;
      // state.chatList = [action.payload, ...state.chatList];
    },
  },
});

export const chatActions = chatSlice.actions;

const chatReducer = chatSlice.reducer;
export default chatReducer;
