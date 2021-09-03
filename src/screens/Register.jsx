import React, { useState } from "react";
/* axios base url */
import axios from "axios";
/* redux hooks */
import { useDispatch } from "react-redux";
/* redux actions */
import { setRegisterData } from "../actions/globalSlice";
/* hooks */
import { HandleInputs } from "../hooks/HandleInputs";
import { ValidateEmail } from "../hooks/ValidateEmail";
import { useHistory } from "react-router";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  /* states */
  const [validationError, setValidationError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    repeatPassword: "",
  });

  const [inputValues, setInputValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    repeatPassword: "",
  });

  const registration = async () => {
    const formIsValid = handleValidation();

    if (formIsValid) {
      const resp = await axios.post("http://localhost:5005/api/user/create", {
        first_name: inputValues.firstName,
        last_name: inputValues.lastName,
        email: inputValues.email,
        username: inputValues.userName,
        password: inputValues.password,
      });
      if (resp.data.message === "User added") {
        dispatch(setRegisterData(resp.data));
        history.push("/login");
      }
    }
  };

  /* validation function */
  const handleValidation = () => {
    let formIsValid = true;

    if (inputValues.userName.length < 6) {
      formIsValid = false;
      setValidationError((val) => {
        return { ...val, userName: "The username must be 6 letters long" };
      });
    } else {
      setValidationError((val) => {
        return { ...val, userName: "" };
      });
    }
    if (inputValues.firstName.length < 2) {
      formIsValid = false;
      setValidationError((val) => {
        return { ...val, firstName: "The Firstname must be 2 letters long" };
      });
    } else {
      setValidationError((val) => {
        return { ...val, firstName: "" };
      });
    }
    if (inputValues.lastName.length < 2) {
      formIsValid = false;
      setValidationError((val) => {
        return { ...val, lastName: "The lastName must be 2 letters long" };
      });
    } else {
      setValidationError((val) => {
        return { ...val, lastName: "" };
      });
    }
    /* email validation */
    const validateEmail = ValidateEmail(inputValues.email);
    if (validateEmail) {
      setValidationError((val) => {
        return { ...val, email: "" };
      });
    }
    if (!validateEmail) {
      formIsValid = false;
      setValidationError((val) => {
        return { ...val, email: "Email must be valid" };
      });
    }
    if (inputValues.password.length < 6) {
      setValidationError((val) => {
        return { ...val, password: "The Password must be 6 letters long" };
      });
    }

    /* password validation */
    if (inputValues.password !== inputValues.repeatPassword) {
      setValidationError((val) => {
        return { ...val, passwordRepeat: "Passwords must be same" };
      });
    } else {
      setValidationError((val) => {
        return { ...val, passwordRepeat: "" };
      });
    }

    return formIsValid;
  };

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
              onChange={(e) => {
                HandleInputs(e, inputValues, setInputValues);
              }}
            />
            {validationError.userName && (
              <div className="validation">{validationError.userName}</div>
            )}
            <input
              placeholder="Firstname"
              className="input"
              name="firstName"
              value={inputValues.firstName}
              onChange={(e) => {
                HandleInputs(e, inputValues, setInputValues);
              }}
            />
            {validationError.firstName && (
              <div className="validation">{validationError.firstName}</div>
            )}
            <input
              placeholder="Lastname"
              className="input"
              name="lastName"
              value={inputValues.lastName}
              onChange={(e) => {
                HandleInputs(e, inputValues, setInputValues);
              }}
            />
            {validationError.lastName && (
              <div className="validation">{validationError.lastName}</div>
            )}
            <input
              placeholder="Email"
              className="input"
              name="email"
              value={inputValues.email}
              onChange={(e) => {
                HandleInputs(e, inputValues, setInputValues);
              }}
            />
            {validationError.email && (
              <div className="validation">{validationError.email}</div>
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
            <input
              placeholder="Repeat Password"
              type="password"
              className="input"
              name="repeatPassword"
              value={inputValues.repeatPassword}
              onChange={(e) => HandleInputs(e, inputValues, setInputValues)}
            />
            {validationError.passwordRepeat && (
              <div className="validation">{validationError.passwordRepeat}</div>
            )}
            <button className="button" onClick={() => registration()}>
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
