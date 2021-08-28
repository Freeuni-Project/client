import React, { useState, useEffect } from "react";
import _ from "lodash";
/* axios base url */
import base from "../axios/axiosBase";
import { Modal, Button } from "react-bootstrap";
/* redux hooks */
import { useDispatch, useSelector } from "react-redux";
/* redux actions */
import { setProjectShow } from "../actions/globalSlice";
/* hooks */
import { HandleInputs } from "../hooks/HandleInputs";
/* components */
import AgreeModal from "./AgreeModal";
import InfoModal from "./InfoModal";

const ProjectEdit = ({ getProjects }) => {
  const dispatch = useDispatch();

  const [agreeModal, setAgreeModal] = useState(false);
  /* states */
  const [inputValues, setInputValues] = useState({
    projectName: "",
    projectDescription: "",
    status: "",
  });
  /* validation errors state */
  const [validationError, setValidationError] = useState({
    projectName: "",
    projectDescription: "",
    status: "",
  });
  /* request data state */
  const [requestData, setRequestData] = useState({
    success: "",
    error: "",
    loading: false,
  });

  /* redux states */
  const projectShow = useSelector((state) => state.global.projectEdit.show);
  const projectData = useSelector((state) => state.global.projectEdit.project);

  /* edit project function */
  const editProject = async () => {
    try {
      setRequestData({ ...requestData, loading: true });
      const resp = await base.put(`/project/${projectData.id}`, {
        project_name: inputValues.projectName,
        description: inputValues.projectDescription,
        status: inputValues.status,
      });
      setRequestData({ ...requestData, loading: false, success: resp.data });
      getProjects();
    } catch (error) {
      setRequestData({ ...requestData, loading: false, error: error });
    }
  };

  const handleValidation = () => {
    let formIsValid = true;

    if (inputValues.projectName.length < 5) {
      formIsValid = false;
      setValidationError((val) => {
        return {
          ...val,
          projectName: "The project name must be 5 letters long",
        };
      });
    } else {
      setValidationError((val) => {
        return {
          ...val,
          projectName: "",
        };
      });
    }
    if (inputValues.projectDescription.length < 10) {
      formIsValid = false;
      setValidationError((val) => {
        return {
          ...val,
          projectDescription:
            "The project description must be at last 10 letters long",
        };
      });
    } else {
      setValidationError((val) => {
        return {
          ...val,
          projectDescription: "",
        };
      });
    }
    if (inputValues.status.length < 4) {
      formIsValid = false;
      setValidationError((val) => {
        return {
          ...val,
          status: "The project status must be at last 4 letters long",
        };
      });
    } else {
      setValidationError((val) => {
        return {
          ...val,
          status: "",
        };
      });
    }
    if (formIsValid) {
      setAgreeModal(true);
      dispatch(setProjectShow(false));
    }

    return formIsValid;
  };

  useEffect(() => {
    setInputValues({
      projectName: projectData.project_name,
      projectDescription: projectData.description,
      status: projectData.status,
    });
  }, [projectData]);

  if (requestData.error || requestData.success) {
    return (
      <InfoModal
        title={
          requestData.error
            ? { message: "Something went wrong", type: "error" }
            : { message: "Has been edited successfully", type: "success" }
        }
        show={true}
        onClose={() => {
          setRequestData({ loading: false, error: "", success: "" });
          setAgreeModal(false);
        }}
      />
    );
  }

  return (
    <>
      <Modal
        show={projectShow}
        onHide={() => dispatch(setProjectShow(false))}
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
            {validationError.projectName && (
              <div className="validation">{validationError.projectName}</div>
            )}
            <input
              className="input"
              placeholder="Status"
              name="status"
              value={inputValues.status}
              onChange={(e) => HandleInputs(e, inputValues, setInputValues)}
            />
            {validationError.status && (
              <div className="validation">{validationError.status}</div>
            )}
            <textarea
              className="input"
              placeholder="Project Description"
              name="projectDescription"
              value={inputValues.projectDescription}
              onChange={(e) => HandleInputs(e, inputValues, setInputValues)}
            />
            {validationError.projectDescription && (
              <div className="validation">
                {validationError.projectDescription}
              </div>
            )}
          </>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => dispatch(setProjectShow(false))}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleValidation();
              }}
            >
              Edit Project
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
      <AgreeModal
        title="Do you really want to edit project ? "
        loading={requestData.loading}
        show={agreeModal}
        agreeFunc={() => {
          editProject();
        }}
        disagreeFunc={() => {
          setAgreeModal(false);
        }}
      />
    </>
  );
};

export default ProjectEdit;
