import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Function to get the value of a cookie and parse it as JSON
const getCookie = (name) => {
  const cookieValue = Cookies.get(name);
  try {
    return cookieValue ? JSON.parse(cookieValue) : {};
  } catch (e) {
    console.error("Error parsing cookie:", e);
    return {};
  }
};

// Function to set a cookie with a JSON value
const setCookie = (name, value) => {
  Cookies.set(name, JSON.stringify(value), { expires: 7 });
};

// Initial state with a default value
const initialState = {
  userData: getCookie("userData"), 
};

export const UserSlice = createSlice({
  name: "UserData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      setCookie("userData", action.payload);

      console.log(
        "SetUserData: User data stored in Redux store:",
        action.payload
      );
    },
    clearUserData: (state) => {
      state.userData = {};
      Cookies.remove("userData");
      console.log("ClearUserData: User data cleared from Redux store");
    },
  },
});

export const { setUserData, clearUserData } = UserSlice.actions;

export default UserSlice.reducer;
