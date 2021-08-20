import React from "react";
// redux hooks
import { useDispatch } from "react-redux";
// redux action
import { setToken } from "../actions/authSlice";
// components
import MainNavbar from "../components/MainNavbar.jsx";

const Main = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setToken(""));
  };
  return (
    <div>
      <MainNavbar />
    </div>
  );
};

export default Main;
