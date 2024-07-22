
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const getCookie = (name) => Cookies.get(name) === 'true';
const setCookie = (name, value) => Cookies.set(name, value, { expires: 7 });

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