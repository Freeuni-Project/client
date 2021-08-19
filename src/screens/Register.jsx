import React, { useState } from "react";
// hooks
import { HandleInputs } from "../hooks/HandleInputs";
// router methods
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// boostrapt components
import { InputGroup, FormControl, Button } from "react-bootstrap";

const Register = () => {
  const history = useHistory();
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
          <InputGroup className="mt-3 w-25">
            <InputGroup.Text
              id="basic-addon1"
              className="bg-primary text-white"
            >
              Username
            </InputGroup.Text>
            <FormControl
              placeholder="Username"
              aria-label="Email"
              name="userName"
              value={inputValues.userName}
              onChange={(e) => HandleInputs(e, inputValues, setInputValues)}
            />
          </InputGroup>
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
              value={inputValues.email}
              name="email"
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
            <Button onClick={() => history.push("/login")}>LOGIN</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
