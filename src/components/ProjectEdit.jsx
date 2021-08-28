import React, { useState, useEffect } from "react";
/* axios base url */
import base from "../axios/axiosBase";
import { Modal, Button } from "react-bootstrap";
/* redux hooks */
import { useDispatch, useSelector } from "react-redux";
/* redux actions */
import { setProjectEdit } from "../actions/globalSlice";
/* hooks */
import { HandleInputs } from "../hooks/HandleInputs";
/* components */
import AgreeModal from "./AgreeModal";
import InfoModal from "./InfoModal";

const ProjectEdit = ({ getProjects }) => {
  const dispatch = useDispatch();

  /* states */
  const [inputValues, setInputValues] = useState({
    projectName: "",
    projectDescription: "",
    status: "",
  });

  /* redux states */
  const projectEdit = useSelector((state) => state.global.projectEdit);

  /* edit project function */
  const editProject = async () => {
    try {
      const resp = base.post();
    } catch (error) {}
  };

  useEffect(() => {
    setInputValues({
      projectName: projectEdit.project.project_name,
      projectDescription: projectEdit.project.description,
      status: projectEdit.project.status,
    });
  }, [projectEdit]);

  return (
    <Modal
      show={projectEdit.show}
      onHide={() => dispatch(setProjectEdit({ show: false, project: {} }))}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
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
        </>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() =>
              dispatch(setProjectEdit({ show: false, project: {} }))
            }
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(setProjectEdit({ show: false, project: {} }));
            }}
          >
            Edit Project
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default ProjectEdit;
