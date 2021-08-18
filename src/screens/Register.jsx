import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
// hooks
import { HandleInputs } from "../hooks/HandleInputs";

const Register = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    userName: "",
    password: "",
    repeatPassword: "",
  });

  return (
    <>
      <div className="loginscreen">
        <div className="loginform w-100">
          <h3 className="bg-primary text-white p-3 rounded">Register</h3>
          <InputGroup className="mb-3 mt-3 w-25">
            <InputGroup.Text
              id="basic-addon1"
              className="bg-primary text-white"
              name="userName"
              value={inputValues.email}
              onChange={(e) => HandleInputs(e, inputValues, setInputValues)}
            >
              Username
            </InputGroup.Text>
            <FormControl placeholder="Username" aria-label="Email" />
          </InputGroup>
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
          <InputGroup className="mb-3 w-25">
            <InputGroup.Text
              id="basic-addon1"
              className="bg-primary text-white"
            >
              Repeat Password
            </InputGroup.Text>
            <FormControl
              placeholder="Repeat Password"
              aria-label="Password"
              name="repeatPassword"
              value={inputValues.repeatPassword}
              onChange={(e) => HandleInputs(e, inputValues, setInputValues)}
            />
          </InputGroup>
          <div className="w-25 d-flex justify-content-end">
            <Button className="mr-3">REGISTER</Button>
            <Button>LOGIN</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
