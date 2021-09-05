import React, { useState } from "react";
/* axios base url */
import base from "../axios/axiosBase";
/* bootstrap components */
import { Modal, Button } from "react-bootstrap";
/* redux hook */
import { useDispatch, useSelector } from "react-redux";
/* redux actions */
import { setAddTicketShow } from "../actions/currentProjectSlice";
/* hooks */
import { HandleInputs } from "../hooks/HandleInputs";
/* modals */
import AgreeModal from "./AgreeModal";
import InfoModal from "./InfoModal";
/* validation */
import { TicketValidation } from "../validations/ticketValidation";

const AddTicket = ({ GetProjectTickets }) => {
  const dispatch = useDispatch();

  /* states */
  const [requestData, setRequestData] = useState({
    error: "",
    success: "",
    loading: false,
  });
  /* validation errors state */
  const [validationError, setValidationError] = useState({
    title: "",
    reporter: "",
  });
  const [agreeModal, setAgreeModal] = useState(false);
  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
    status: "todo",
    reporter: "",
    assignee: "",
  });

  /* redux states */
  const { show, data } = useSelector((state) => state.current.addTicket);
  const { projectUsers } = useSelector((state) => state.current);
  const { id } = useSelector((state) => state.global.currentProject);

  /* input clean up function */
  const cleanInput = () => {
    setInputValues({
      title: "",
      description: "",
      status: "todo",
      reporter: "",
      assignee: "",
    });
  };

  /* craete ticket function */
  const createTicket = async () => {
    setRequestData({ ...requestData, loading: true });
    try {
      const resp = await base.post("/ticket/create", {
        title: inputValues.title,
        description: inputValues.description,
        status: inputValues.status,
        project_id: id,
        assignee_id: Number(inputValues.assignee),
        reporter_id: Number(inputValues.reporter),
      });
      setRequestData({ ...requestData, loading: false, success: resp.data });
      cleanInput();
      GetProjectTickets();
    } catch (error) {
      setRequestData({ ...requestData, loading: true, error: error });
    }
  };

  if (requestData.error || requestData.success) {
    console.log(requestData);

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
        show={show}
        onHide={() => {
          dispatch(setAddTicketShow());
          cleanInput();
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="input"
            placeholder="Title"
            name="title"
            style={{ marginTop: 0 }}
            value={inputValues.title}
            onChange={(e) => HandleInputs(e, inputValues, setInputValues)}
          />
          {validationError.title && (
            <div className="validation">{validationError.title}</div>
          )}
          <input
            className="input"
            placeholder="Description"
            name="description"
            value={inputValues.description}
            onChange={(e) => HandleInputs(e, inputValues, setInputValues)}
          />
          <select
            className="input"
            name="status"
            value={inputValues.status}
            onChange={(e) => {
              HandleInputs(e, inputValues, setInputValues);
            }}
          >
            <option value="default">Choose Status</option>
            <option value="todo">To-Do</option>
            <option value="inProgress">In Progress</option>
            <option value="inTesting">In Testing</option>
            <option value="done">Done</option>
          </select>
          <select
            className="input"
            name="reporter"
            onChange={(e) => {
              HandleInputs(e, inputValues, setInputValues);
            }}
          >
            <option>Choose Reporter</option>
            {projectUsers.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              );
            })}
          </select>
          {validationError.reporter && (
            <div className="validation">{validationError.reporter}</div>
          )}
          <select
            className="input"
            name="assignee"
            onChange={(e) => {
              HandleInputs(e, inputValues, setInputValues);
            }}
          >
            <option>Assigne User</option>
            {projectUsers.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              );
            })}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              dispatch(setAddTicketShow());
              cleanInput();
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              TicketValidation(inputValues, setValidationError, () => {
                setAgreeModal(true);
                dispatch(setAddTicketShow());
              });
            }}
          >
            Add Ticket
          </Button>
        </Modal.Footer>
      </Modal>
      <AgreeModal
        show={agreeModal}
        title="Do you really want to add ticket ? "
        loading={requestData.loading}
        agreeFunc={() => {
          createTicket();
        }}
        disagreeFunc={() => {
          setAgreeModal(false);
        }}
      />
    </>
  );
};

export default AddTicket;
