import React, { useState } from "react";
/* axios base url */
import base from "../axios/axiosBase";
/* redux hooks */
import { useDispatch, useSelector } from "react-redux";
// redux actions
import { setToken } from "../actions/authSlice";
// hooks
import { HandleInputs } from "../hooks/HandleInputs";
import { useHistory } from "react-router";
const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  /* states */
  const [validationError, setValidationError] = useState({
    username: "",
    password: "",
  });
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });
  /* redux states */
  const registerData = useSelector((state) => state.global.registerData);

  /* login function */
  const handleLogin = async () => {
    const formIsValid = handleValidation();
    if (formIsValid) {
      if (
        inputValues.username === "administrator" &&
        inputValues.password === "administrator"
      ) {
        dispatch(setToken({ token: "tokenadmin", role: "admin" }));
      } else {
        try {
          const resp = await base.post("/user/login", {
            username: inputValues.username,
            password: inputValues.password,
          });
          dispatch(setToken({ token: resp.data.data.api_key, role: "member" }));
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const handleValidation = () => {
    let formIsValid = true;
    if (inputValues.username.length < 6) {
      formIsValid = false;
      setValidationError((val) => {
        return { ...val, username: "User name must be 6 character long" };
      });
    } else {
      setValidationError((val) => {
        return { ...val, username: "" };
      });
    }
    if (inputValues.password.length < 6) {
      formIsValid = false;
      setValidationError((val) => {
        return { ...val, password: "Password name must be 6 character long" };
      });
    } else {
      setValidationError((val) => {
        return { ...val, password: "" };
      });
    }
    return formIsValid;
  };

  return (
    <>
      <div className="loginscreen">
        <div className="loginscreen__left">
          <div className="container">
            <h1>Welcome Back</h1>
            <h5>
              {registerData &&
                registerData.message &&
                `User  ${registerData.result.username} registered`}
            </h5>
            <input
              placeholder="Username"
              className="input"
              name="username"
              value={inputValues.username}
              onChange={(e) => HandleInputs(e, inputValues, setInputValues)}
            />
            {validationError.username && (
              <div className="validation">{validationError.username}</div>
            )}
            <input
              placeholder="Password"
              type="password"
              className="input"
              name="password"
              value={inputValues.password}
              onChange={(e) => HandleInputs(e, inputValues, setInputValues)}
            />
            {validationError.password && (
              <div className="validation">{validationError.password}</div>
            )}
            <div className="details">
              <div>
                <input type="checkbox" name="logged" />{" "}
                <label htmlFor="logged"> Keep me logged in</label>
              </div>
              <a href="#">Forgot Password</a>
            </div>
            <button className="button" onClick={handleLogin}>
              Log In
            </button>
            <div className="borderline"></div>
            <div className="formbottom">
              Don't have an account yet ? <a href="/register">Sign Up</a>
            </div>
          </div>
        </div>
        <div className="loginscreen__right"></div>
      </div>
    </>
  );
};

export default Login;
