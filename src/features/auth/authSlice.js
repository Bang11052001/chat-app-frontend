import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
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
    },
    loginFailed(state) {
      state.isLoading = false;
    },
    logoutRequest(state, action) {
      state.isLoading = false;
    },
  },
});

export const authActions = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
