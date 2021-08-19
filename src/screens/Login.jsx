import React, { useState } from "react";
// redux hooks
import { useDispatch } from "react-redux";
// redux actions
import { setToken } from "../actions/authSlice";
// hooks
import { HandleInputs } from "../hooks/HandleInputs";
// bootstrap components
import { InputGroup, FormControl, Button, Alert } from "react-bootstrap";
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

  return (
    <>
      <div className="loginscreen">
        <div className="loginform w-100">
          <h3 className="bg-primary text-white p-3 rounded">LOGIN</h3>
          <InputGroup className="mb-3 mt-3 w-25">
            <InputGroup.Text
              id="basic-addon1"
              className="bg-primary text-white"
            >
              Email
            </InputGroup.Text>
            <FormControl
              placeholder="Email"
              aria-label="Email"
              name="email"
              value={inputValues.email}
              onChange={(e) => HandleInputs(e, inputValues, setInputValues)}
            />
          </InputGroup>
          <InputGroup className="mb-3 w-25">
            <InputGroup.Text
              id="basic-addon1"
              className="bg-primary text-white"
            >
              Password
            </InputGroup.Text>
            <FormControl
              placeholder="Password"
              aria-label="Password"
              name="password"
              type="password"
              value={inputValues.password}
              onChange={(e) => HandleInputs(e, inputValues, setInputValues)}
            />
          </InputGroup>
          {/* alert for login error */}
          {loginError && (
            <Alert variant="danger" className="w-25">
              Email or Password is incorect
            </Alert>
          )}
          <div className="w-25 d-flex justify-content-end">
            <Button className="mr-3" onClick={() => handleLogin()}>
              LOGIN
            </Button>
            <Button onClick={() => history.push("/register")}>REGISTER</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
