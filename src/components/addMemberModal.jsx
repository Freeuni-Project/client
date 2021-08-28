import React, { useEffect, useState } from "react";
/* axios base url */
import base from "../axios/axiosBase";
import { Modal, Button } from "react-bootstrap";
/* redux hooks */
import { useSelector, useDispatch } from "react-redux";
/* redux actions */
import { setAddMemberShow } from "../actions/globalSlice";

/* components */
import AgreeModal from "./AgreeModal";
import InfoModal from "./InfoModal";

const AddMemeberModal = () => {
  const dispatch = useDispatch();

  /* states */
  const [addUserRequest, setAddUserRequest] = useState({
    success: "",
    loading: false,
    error: "",
  });
  const [freeUsersRequest, setFreeUsersRequest] = useState({
    data: [],
    loading: false,
    error: "",
  });
  /* agree modal state */
  const [agreeModal, setAgreeModal] = useState();
  /* input validation state */
  const [validationError, setValidationError] = useState();
  const [choosenUser, setChoosenUser] = useState("default");

  /* redux states */
  const { addMember } = useSelector((state) => state.global);
  /* get free users */
  const getUsersNotAdded = async () => {
    setFreeUsersRequest({ ...freeUsersRequest, loading: true });
    try {
      const resp = await base.get(
        `/project/${addMember.data.id}/get-users-not-added`
      );
      setFreeUsersRequest({
        ...freeUsersRequest,
        loading: false,
        data: resp.data.json_list,
      });
    } catch (error) {
      setFreeUsersRequest({
        ...freeUsersRequest,
        loading: false,
        error: error,
      });
    }
  };

  /* add users to project */
  const addUserToProject = async () => {
    if (choosenUser === "default") {
      setValidationError("Choose User Please");
    }
    if (choosenUser && choosenUser !== "default") {
      setValidationError("");
      setAddUserRequest({ ...addUserRequest, loading: true });
      try {
        const resp = await base.post(
          `/project/${addMember.data.id}/add-users`,
          {
            users_ids: [choosenUser],
          }
        );
        setAddUserRequest({
          ...addUserRequest,
          loading: false,
          success: resp.data,
        });
      } catch (error) {
        setAddUserRequest({ ...addUserRequest, loading: false, error: error });
      }
    }
  };

  useEffect(() => {
    if (addMember.data.id) {
      getUsersNotAdded();
    }
  }, [addMember]);
  if (addUserRequest.error || addUserRequest.success) {
    return (
      <InfoModal
        title={
          addUserRequest.error
            ? { message: "Something went wrong", type: "error" }
            : { message: "Has been added successfully", type: "success" }
        }
        show={true}
        onClose={() => {
          setAddUserRequest({ loading: false, error: "", success: "" });
          setAgreeModal(false);
        }}
      />
    );
  }

  return (
    <>
      <Modal
        show={addMember.show}
        centered
        onHide={() => dispatch(setAddMemberShow())}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <select
            className="input"
            style={{ marginTop: "0" }}
            onChange={(e) => setChoosenUser(e.target.value)}
          >
            <option value="default">Choose User</option>
            {freeUsersRequest.data &&
              freeUsersRequest.data.map((user, index) => {
                return (
                  <option key={index} value={user.id}>
                    {user.username}
                  </option>
                );
              })}
          </select>
          {validationError && (
            <div className="validation">{validationError}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => dispatch(setAddMemberShow())}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setAgreeModal(true);
              dispatch(setAddMemberShow());
            }}
          >
            Add user
          </Button>
        </Modal.Footer>
      </Modal>
      <AgreeModal
        title="Do you really want to add member ? "
        show={agreeModal}
        agreeFunc={() => {
          addUserToProject();
        }}
        disagreeFunc={() => {
          setAgreeModal(false);
        }}
        loading={addUserRequest.loading}
      />
      <InfoModal
        show={freeUsersRequest.error}
        onClose={() => {
          setFreeUsersRequest({ data: [], loading: false, error: "" });
        }}
        title={{ message: freeUsersRequest.error.message, type: "error" }}
      />
    </>
  );
};

export default AddMemeberModal;
