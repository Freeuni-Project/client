import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
// hooks
import { HandleInputs } from "../hooks/HandleInputs";

const Login = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      <div className="loginscreen">
        <div className="loginform w-100">
          <h3 className="bg-primary text-white p-3 rounded">LOGIN</h3>
          <InputGroup className="mb-3 mt-3 w-25">
            <InputGroup.Text
              id="basic-addon1"
              className="bg-primary text-white"
              name="email"
              value={inputValues.email}
              onChange={(e) => HandleInputs(e, inputValues, setInputValues)}
            >
              Email
            </InputGroup.Text>
            <FormControl placeholder="Email" aria-label="Email" />
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
              value={inputValues.password}
              onChange={(e) => HandleInputs(e, inputValues, setInputValues)}
            />
          </InputGroup>
          <div className="w-25 d-flex justify-content-end">
            <Button className="mr-3">LOGIN</Button>
            <Button>REGISTER</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
