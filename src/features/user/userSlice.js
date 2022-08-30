import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  userLogged: {},
  list: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserByIdRequest(state, action) {
      state.isLoading = true;
    },
    fetchUserByIdSuccess(state, action) {
      state.isLoading = false;
      state.userLogged = action.payload;
    },
    fetchUserByIdFailed(state, action) {
      state.isLoggedIn = false;
      state.userLogged = {};
    },

    searchWithDebouce(state, action) {},
  },
});

export const userActions = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
