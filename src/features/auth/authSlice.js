import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    loginFailed(state) {
      state.isLoading = false;
    },
  },
});

export const authActions = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
