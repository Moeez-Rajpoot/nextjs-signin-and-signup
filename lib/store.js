// lib/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import UserReducer from './features/auth/userSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      UserData: UserReducer,
    },
  });
};
