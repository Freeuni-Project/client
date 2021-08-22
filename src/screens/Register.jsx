import React, { useState } from "react";
// hooks
import { HandleInputs } from "../hooks/HandleInputs";
// router methods
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Register = () => {
  const [inputValues, setInputValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    repeatPassword: "",
  });

  return (
    <>
      <div className="registerscreen">
        <div className="loginscreen__left">
          <div className="container">
            <h1>Register Now</h1>
            <input
              placeholder="Username"
              className="input"
              name="userName"
              value={inputValues.userName}
              onChange={(e) => HandleInputs(e, inputValues, setInputValues)}
            />
            <input
              placeholder="Firstname"
              className="input"
              name="firstName"
              value={inputValues.firstName}
              onChange={(e) => HandleInputs(e, inputValues, setInputValues)}
            />
            <input
              placeholder="Lastname"
              className="input"
              name="lastName"
              value={inputValues.lastName}
              onChange={(e) => HandleInputs(e, inputValues, setInputValues)}
            />
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
            <input
              placeholder="Repeat Password"
              type="password"
              className="input"
              name="repeatPassword"
              value={inputValues.repeatPassword}
              onChange={(e) => HandleInputs(e, inputValues, setInputValues)}
            />
            <div className="details">
              <a href="#"></a>
              <div>
                <input type="checkbox" name="logged" />{" "}
                <label htmlFor="logged"> Keep me logged in</label>
              </div>
            </div>
            <button className="button" onClick={() => console.log(inputValues)}>
              Register
            </button>
            <div className="borderline"></div>
            <div className="formbottom">
              If you are already registered <a href="/login">Log In</a>
            </div>
          </div>
        </div>
        <div className="loginscreen__right"></div>
      </div>
    </>
  );
};

export default Register;
