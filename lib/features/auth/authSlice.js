
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// Helper functions to get and set cookies
const getCookie = (name) => Cookies.get(name) === 'true';
const setCookie = (name, value) => Cookies.set(name, value, { expires: 7 }); // Expires in 7 days

const initialState = {
  isLoggedIn: getCookie('user'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
      setCookie('user', true);
      console.log("The Login state is ", state.isLoggedIn);
    },
    logout(state) {
      state.isLoggedIn = false;
      setCookie('user', false);
      console.log("The Logout state is ", state.isLoggedIn);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;