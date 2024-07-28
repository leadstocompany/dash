import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token:null,
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuth = true;
    },
    setToken(state, action){
      state.token= action.payload;
      state.isAuth=true;
    },
    logout(state) {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, logout,setToken } = userSlice.actions;

export const userReducer = userSlice.reducer;
