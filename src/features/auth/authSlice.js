import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  userLogged: {},
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

    fetchUserByIdRequest(state, action) {
      state.isLoading = true;
    },
    fetchUserByIdSuccess(state, action) {
      state.isLoading = false;
      state.userLogged = action.payload;
    },
    fetchUserByIdFailed(state, action) {
      state.isLoading = false;
      state.userLogged = {};
    },

    logoutRequest(state, action) {},
  },
});

export const authActions = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
