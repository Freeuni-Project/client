import React, { useState } from "react";
// redux hooks
import { useDispatch } from "react-redux";
// redux actions
import { setToken } from "../actions/authSlice";
// hooks
import { HandleInputs } from "../hooks/HandleInputs";
// router methods
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // state that controls login error
  const [loginError, setLoginError] = useState("");
  // state where is store input values
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  // fucntion that control login
  const handleLogin = () => {
    if (inputValues.email === "admin" && inputValues.password === "admin") {
      dispatch(setToken("tokenAgile"));
    } else {
      setLoginError("Email or Password is incorect");
    }
  };
  console.log(inputValues);

  return (
    <>
      <div className="loginscreen">
        <div className="loginscreen__left">
          <div className="container">
            <h1>Welcome Back</h1>
            <input
              placeholder="Email"
              className="input"
              name="email"
              value={inputValues.email}
              onChange={(e) => HandleInputs(e, inputValues, setInputValues)}
            />
            <input
              placeholder="Password"
              type="password"
              className="input"
              name="password"
              value={inputValues.password}
              onChange={(e) => HandleInputs(e, inputValues, setInputValues)}
            />
            <div className="details">
              <div>
                <input type="checkbox" name="logged" />
                <label htmlFor="logged"> Keep me logged in</label>
              </div>
              <a href="#">Forgot Password</a>
            </div>
            <button className="button" onClick={handleLogin}>
              Log In
            </button>
            <div className="borderline"></div>
            <div className="formbottom">
              Don't have an account yet ? <a href="#">Sign Up</a>
            </div>
          </div>
        </div>
        <div className="loginscreen__right"></div>
      </div>
    </>
  );
};

export default Login;
