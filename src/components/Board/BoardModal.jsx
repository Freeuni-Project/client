import React, { useState, useEffect } from "react";
/* axios base url */
import base from "../../axios/axiosBase";
/* redux states */
import { useSelector, useDispatch } from "react-redux";
/* redux actions */
import { setBoardModalShow } from "../../actions/currentProjectSlice";
/* bootstrap elements */
import { Modal, Button } from "react-bootstrap";
/* hooks */
import { HandleInputs } from "../../hooks/HandleInputs";
/* modals */
import AgreeModal from "../AgreeModal";
import InfoModal from "../InfoModal";
/* validation */
import { TicketValidation } from "../../validations/ticketValidation";
/* reqeust */
import { UpdateTicket } from "../../requests/UpdateTicket";

const BoardModal = ({ GetProjectTickets }) => {
  const dispatch = useDispatch();

  const [agreeModal, setAgreeModal] = useState(false);
  /* states */
  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
    status: "todo",
    reporter: "",
    assignee: "",
    ticketId: 0,
    project_id: "",
  });
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

  /* redux states */
  const { boardModal } = useSelector((state) => state.current);
  const { projectUsers } = useSelector((state) => state.current);

  useEffect(() => {
    const {
      title,
      description,
      assignee_id,
      reporter_id,
      status,
      ticketId,
      project_id,
    } = boardModal.data;
    setInputValues({
      title: title,
      description: description,
      status: status,
      reporter: reporter_id,
      assignee: assignee_id,
      ticketId: ticketId,
      project_id: project_id,
    });
  }, [boardModal.data]);

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
        show={boardModal.show}
        centered
        onHide={() => dispatch(setBoardModalShow())}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ticket</Modal.Title>
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
            <option key="choose reporter" value="reporter">
              Choose Reporter
            </option>
            {projectUsers.map((user) => {
              const selected = inputValues.reporter === user.id;
              return (
                <option key={user.id} value={user.id} selected={selected}>
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
              const selected = inputValues.assignee === user.id;

              return (
                <option key={user.id} value={user.id} selected={selected}>
                  {user.username}
                </option>
              );
            })}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => dispatch(setBoardModalShow())}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              TicketValidation(inputValues, setValidationError, () => {
                setAgreeModal(true);
                dispatch(setBoardModalShow());
              });
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <AgreeModal
        title="Do you realy want to edit ticket ? "
        agreeFunc={() => {
          setAgreeModal(false);
          UpdateTicket(
            inputValues,
            setRequestData,
            requestData,
            GetProjectTickets
          );
        }}
        disagreeFunc={() => {
          setAgreeModal(false);
          dispatch(setBoardModalShow());
        }}
        loading={requestData.loading}
        show={agreeModal}
      />
    </>
  );
};

export default BoardModal;
