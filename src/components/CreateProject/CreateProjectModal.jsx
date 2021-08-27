import React, { useState } from "react";
// redux hooks
import { useSelector, useDispatch } from "react-redux";
// redux actions
import { setCreateProject } from "../../actions/globalSlice";
// bootstrap elements
import { Modal, Button } from "react-bootstrap";
// custom hook to handle inputs
import { HandleInputs } from "../../hooks/HandleInputs";
/* axios base url */
import base from "../../axios/axiosBase";
/* modals */
import AgreeModal from "../AgreeModal";
import InfoModal from "../InfoModal";

const CreateProjectModal = ({ getProjects }) => {
  const dispatch = useDispatch();
  /* states */
  const [agreeModal, setAgreeModal] = useState(false);
  const [requestData, setRequestData] = useState({
    success: "",
    error: "",
    loading: false,
  });
  const [inputValues, setInputValues] = useState({
    projectName: "",
    projectDescription: "",
    status: "",
  });
  /* redux states */
  const modalData = useSelector((state) => state.global.createProject);

  /* create new project function */
  const CreateProject = async () => {
    try {
      setRequestData({ ...requestData, loading: true });
      const resp = await base.post("/project/create", {
        project_name: inputValues.projectName,
        description: inputValues.projectDescription,
        status: inputValues.status,
      });
      // store fetched data
      setRequestData({
        ...requestData,
        loading: false,
        success: resp.data.message,
      });
      // clean up inputs
      setInputValues({
        projectName: "",
        projectDescription: "",
        status: "",
      });
      getProjects();
    } catch (error) {
      setRequestData({ ...requestData, error: error.message, loading: false });
    }
  };

  if (requestData.error || requestData.success) {
    return (
      <InfoModal
        title={
          requestData.error
            ? { message: "Something went wrong", type: "error" }
            : { message: "Has been added successfully", type: "success" }
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
        show={modalData.show}
        onHide={() => dispatch(setCreateProject({ show: false }))}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Project</Modal.Title>
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
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => dispatch(setCreateProject({ show: false }))}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setAgreeModal(true);
              dispatch(setCreateProject({ show: false }));
            }}
          >
            Create Project
          </Button>
        </Modal.Footer>
      </Modal>
      <AgreeModal
        title="Do you realy want to create new project ?"
        show={agreeModal}
        agreeFunc={() => {
          CreateProject();
        }}
        disagreeFunc={() => {
          setAgreeModal(false);
          dispatch(setCreateProject({ show: true }));
        }}
        loading={requestData.loading}
      />
    </>
  );
};

export default CreateProjectModal;
