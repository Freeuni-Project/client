import React, { useState } from "react";
// redux hooks
import { useSelector, useDispatch } from "react-redux";
// redux actions
import { setCreateProject } from "../../actions/globalSlice";
// bootstrap elements
import { Modal, Button } from "react-bootstrap";
// custom hook to handle inputs
import { HandleInputs } from "../../hooks/HandleInputs";
// import axios to create post request
import axios from "axios";
// components
import AgreeModal from "../AgreeModal";
import InfoModal from "../InfoModal";

const CreateProjectModal = () => {
  const dispatch = useDispatch();
  // to controle agree modal
  const [agreeModal, setAgreeModal] = useState(false);
  // here is storeing post request information
  const [requestData, setRequestData] = useState({
    error: "",
    success: "",
    loading: false,
  });
  // show modal state
  const modalData = useSelector((state) => state.global.createProject);
  // modal input values
  const [inputValues, setInputValues] = useState({
    projectName: "",
    projectDescription: "",
    status: "",
  });

  const CreateProject = async () => {
    try {
      setRequestData({ ...requestData, loading: true });
      const resp = await axios.post(
        "http://localhost:5005/api/project/create",
        {
          project_name: inputValues.projectName,
          description: inputValues.projectDescription,
          status: inputValues.status,
        }
      );
      setRequestData({
        ...requestData,
        loading: false,
        success: resp.data.message,
      });
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
          dispatch(setCreateProject({ show: false }));
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
          {requestData.loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status"></div>
            </div>
          ) : (
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
          )}
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
        show={agreeModal}
        agreeFunc={() => {
          CreateProject();
          setAgreeModal(false);
          dispatch(setCreateProject({ show: true }));
        }}
        disagreeFunc={() => {
          setAgreeModal(false);
          dispatch(setCreateProject({ show: true }));
        }}
        title="Do you realy want to create new project ?"
      />
    </>
  );
};

export default CreateProjectModal;
