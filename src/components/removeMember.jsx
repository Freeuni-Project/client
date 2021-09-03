import React, { useState, useEffect } from "react";
/* axios base url */
import base from "../axios/axiosBase";
/* redux hooks */
import { useSelector, useDispatch } from "react-redux";
/* redux actions */
import { setRemoveMemberShow } from "../actions/globalSlice";
/* bootstrap components */
import { Modal, Button } from "react-bootstrap";
/* modals */
import AgreeModal from "./AgreeModal";
import InfoModal from "./InfoModal";

const RemoveMember = () => {
  const dispatch = useDispatch();
  /* state */
  const [usersRequestData, setUsersRequestData] = useState({
    data: "",
    error: "",
    loading: false,
  });
  /* user delete request data */
  const [userDeleteData, setUserDeleteData] = useState({
    success: "",
    error: "",
    loading: false,
  });
  /* agree modal */
  const [agreeModal, setAgreeModal] = useState(false);

  /* store user for delete */
  const [userForDelete, setUserForDelete] = useState();
  /* redux state */
  const modalData = useSelector((state) => state.global.removeMember);

  const getCurrentUsers = async () => {
    setUsersRequestData({ ...usersRequestData, loading: true });
    try {
      const resp = await base.get(`/project/${modalData.id}/get-users`);
      setUsersRequestData({
        ...usersRequestData,
        loading: false,
        data: resp.data.json_list,
      });
    } catch (error) {
      setUsersRequestData({ ...usersRequestData, loading: true, error: error });
    }
  };

  const deleteCurrentUsers = async () => {
    setUserDeleteData({ ...userDeleteData, loading: true });
    try {
      const resp = await base.delete(`/project/${modalData.id}/remove-user`, {
        data: { user_id: userForDelete },
      });
      setUserDeleteData({
        ...userDeleteData,
        loading: false,
        success: "User removed from project",
      });
    } catch (error) {
      setUserDeleteData({
        ...userDeleteData,
        loading: true,
        error: error,
      });
    }
  };

  useEffect(() => {
    if (modalData.id) {
      getCurrentUsers();
    }
  }, [modalData.id]);

  if (userDeleteData.error || userDeleteData.success) {
    return (
      <InfoModal
        title={
          userDeleteData.error
            ? { message: "Something went wrong", type: "error" }
            : { message: "Has been removed successfully", type: "success" }
        }
        show={true}
        onClose={() => {
          setUserDeleteData({ loading: false, error: "", success: "" });
          setAgreeModal(false);
          window.location.reload();
        }}
      />
    );
  }

  return (
    <>
      <Modal
        show={modalData.show}
        onHide={() => dispatch(setRemoveMemberShow())}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <select
            className="input"
            style={{ marginTop: 0 }}
            onChange={(e) => {
              setUserForDelete(e.target.value);
            }}
          >
            <option>Choose User</option>
            {usersRequestData.data &&
              usersRequestData.data.map((user) => {
                return <option value={user.id}>{user.first_name}</option>;
              })}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => dispatch(setRemoveMemberShow())}>Close</Button>
          <Button
            onClick={() => {
              dispatch(setRemoveMemberShow());
              setAgreeModal(true);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <InfoModal
        show={usersRequestData.error}
        title={{ type: "error", message: "something went wrong" }}
        onClose={() => {
          setUsersRequestData({ data: "", error: "", loading: false });
        }}
      />
      <AgreeModal
        title="Do you realy want to delete user ? "
        agreeFunc={() => {
          deleteCurrentUsers();
        }}
        loading={userDeleteData.loading}
        disagreeFunc={() => setAgreeModal(false)}
        show={agreeModal}
      />
    </>
  );
};

export default RemoveMember;
