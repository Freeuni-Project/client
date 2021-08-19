import React from "react";
// redux hooks
import { useDispatch } from "react-redux";
// redux action
import { setToken } from "../actions/authSlice";

const Main = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setToken(""));
  };
  return (
    <div>
      <h1>MAIN PAGE HERE</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Main;
