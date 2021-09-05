import React, { useState } from "react";
/* axios base url */
import axios from "axios";
/* redux hooks */
import { useDispatch, useSelector } from "react-redux";
// redux actions
import { setToken } from "../actions/authSlice";
// hooks
import { HandleInputs } from "../hooks/HandleInputs";

const Login = () => {
  const dispatch = useDispatch();

  const [requestData, setRequestData] = useState({
    success: "",
    loading: false,
    error: "",
  });
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
      setRequestData({ ...requestData, loading: true });
      try {
        const resp = await axios.post("http://localhost:5005/api/user/login", {
          username: inputValues.username,
          password: inputValues.password,
        });
        setRequestData({ ...requestData, loading: false, success: resp.data });
      } catch (error) {
        setRequestData({ ...requestData, loading: false, error: error });
        console.error(error);
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

  if (!requestData.loading && !requestData.error) {
    if (requestData.success.data) {
      localStorage.setItem("user-role", requestData.success.data.is_admin);
      localStorage.setItem("token-short", requestData.success.data.api_key);

      console.log(requestData.success.data.is_admin);

      dispatch(
        setToken({
          token: requestData.success.data.api_key,
        })
      );
    }
  }

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
