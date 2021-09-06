import React, { useState, useEffect } from "react";
/* axios base url */
import base from "../../axios/axiosBase";
/* redux hooks */
import { useSelector } from "react-redux";
/* bootstrap elements */
import { Card, Button } from "react-bootstrap";
/* hooks */
import { HandleInputs } from "../../hooks/HandleInputs";
/* validation */
import { TicketValidation } from "../../validations/ticketValidation";
/* modals */
import AgreeModal from "../AgreeModal";
import InfoModal from "../InfoModal";
/* request */
import { UpdateTicket } from "../../requests/UpdateTicket";
/* component */
import ShowComment from "../ShowComment";

const BackLogTicket = ({ data, projectId, GetProjectTickets }) => {
  const commentMock = [
    { comment: "done this card first", id: "32132131313" },
    { comment: "done this second time", id: "3213dsa2131313" },
  ];
  /* states */
  const [agreeModal, setAgreeModal] = useState(false);

  const [requestData, setRequestData] = useState({
    error: "",
    success: "",
    loading: false,
  });

  const [commentData, setCommentData] = useState({
    error: "",
    data: "",
    loading: false,
  });

  const [commentInput, setCommentInput] = useState("");

  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
    status: "todo",
    reporter: "",
    assignee: "",
    ticketId: 0,
    project_id: "",
  });
  /* validation errors state */
  const [validationError, setValidationError] = useState({
    title: "",
    reporter: "",
  });
  /* redux states */
  const { projectUsers } = useSelector((state) => state.current);
  /* current user id */
  const { userId } = useSelector((state) => state.auth);

  const createComment = async () => {
    try {
      await base.post(`/ticket/${inputValues.ticketId}/add-comment`, {
        user_id: userId,
        comment: commentInput,
      });
      getComments();
    } catch (error) {
      console.error(error.message);
    }
    setCommentInput("");
  };

  const getComments = async () => {
    try {
      setCommentData({ ...commentData, loading: true });
      const resp = await base.get(
        `/ticket/${inputValues.ticketId}/get-comments`
      );
      setCommentData({
        ...commentData,
        loading: false,
        data: resp.data.json_list,
      });
    } catch (error) {
      setCommentData({ ...commentData, loading: false, error: error });
      console.error(error);
    }
  };

  useEffect(() => {
    if (inputValues.ticketId) {
      getComments();
      console.log(inputValues.ticketId);
    }
  }, [inputValues.ticketId]);

  useEffect(() => {
    const { title, description, assignee_id, reporter_id, status, id } = data;
    setInputValues({
      title: title,
      description: description,
      status: status,
      reporter: reporter_id,
      assignee: assignee_id,
      ticketId: id,
      project_id: projectId,
    });
  }, [data, projectId]);

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
    <div className="backlog__ticketcard">
      <Card.Body>
        <Card.Title>Ticket</Card.Title>
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
        <textarea
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
          <option value="todo">To-DO</option>
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
        <Card.Title className="mt-3 mb-3">Comments</Card.Title>
        <textarea
          style={{ marginTop: 0 }}
          className="input"
          placeholder="write comment"
          name="write comment"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <Button onClick={() => createComment()}>Comment</Button>
        {commentData.data &&
          commentData.data.map((comment) => {
            return (
              <ShowComment
                comment={comment}
                key={comment.id}
                getComments={getComments}
              />
            );
          })}
      </Card.Body>
      <div className="button__box">
        <Button onClick={() => setAgreeModal(true)}>Submit</Button>
      </div>

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
        }}
        loading={requestData.loading}
        show={agreeModal}
      />
    </div>
  );
};

export default BackLogTicket;
