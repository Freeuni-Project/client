import React, { useState } from "react";
// redux hooks
import { useSelector, useDispatch } from "react-redux";
// redux actions
import { setCreateProject } from "../actions/globalSlice";
// bootstrap elements
import { Modal, Button } from "react-bootstrap";
// custom hook to handle inputs
import { HandleInputs } from "../hooks/HandleInputs";
// import axios to create post request
import axios from "axios";

const CreateProjectModal = () => {
  const dispatch = useDispatch();
  // show modal state
  const modalData = useSelector((state) => state.global.createProject);
  // modal input values
  const [inputValues, setInputValues] = useState({
    projectName: "",
    projectDescription: "",
    status: "",
  });

  const CreateProject = async () => {
    const resp = await axios.get(
      "http://localhost:5005/api/project/1/get-users",
      inputValues
    );
    console.log(resp);
  };

  return (
    <Modal
      show={modalData.show}
      onHide={() => dispatch(setCreateProject({ show: false }))}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Create New Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          className="input"
          placeholder="Project Name"
          style={{ marginTop: "0" }}
          name="projectName"
          value={inputValues.projectName}
          onChange={(e) => HandleInputs(e, inputValues, setInputValues)}
        />
        <input
          className="input"
          placeholder="Status"
          name="status"
          value={inputValues.status}
          onChange={(e) => HandleInputs(e, inputValues, setInputValues)}
        />
        <textarea
          className="input"
          placeholder="Project Description"
          name="projectDescription"
          value={inputValues.projectDescription}
          onChange={(e) => HandleInputs(e, inputValues, setInputValues)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => dispatch(setCreateProject({ show: false }))}
        >
          Close
        </Button>
        <Button variant="primary" onClick={() => CreateProject()}>
          Create Project
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateProjectModal;
