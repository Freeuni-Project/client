import React, { useEffect, useState } from "react";
/* axios base url */
import base from "../axios/axiosBase";
/* redux hooks */
import { useSelector, useDispatch } from "react-redux";
/* redux actions */
import { setCurrentProject } from "../actions/globalSlice";
import { setProjectUsers } from "../actions/currentProjectSlice";
/* components */
import MainNavbar from "../components/MainNavbar";
import SideBar from "../components/SideBar";
import BackLog from "../components/BackLog/BackLog.jsx";
import Board from "../components/Board/Board";
import Loading from "../components/Loading";
/* modals */
import InfoModal from "../components/InfoModal";
import { Button } from "react-bootstrap";

const CurrentProject = ({ match }) => {
  const dispatch = useDispatch();
  /* redux states */
  const { navControl } = useSelector((state) => state.global);

  /* state */
  const [usersRequestData, setUsersRequestData] = useState({
    data: "",
    error: "",
    loading: false,
  });
  const [requestData, setRequestData] = useState({
    data: "",
    error: "",
    loading: false,
  });

  /* get current project function */
  const getCurrentProject = async () => {
    setRequestData({ ...requestData, loading: true });
    try {
      const resp = await base(`/project/${match.params.id}`);
      setRequestData({ ...requestData, loading: false, data: resp.data });
      /* store current project in redux state */
      dispatch(setCurrentProject(resp.data));
    } catch (error) {
      setRequestData({ ...requestData, loading: false, error: error });
    }
  };

  const getCurrentUsers = async () => {
    setUsersRequestData({ ...usersRequestData, loading: true });
    try {
      const resp = await base.get(`/project/${match.params.id}/get-users`);
      setUsersRequestData({
        ...usersRequestData,
        loading: false,
        data: resp.data.json_list,
      });
      dispatch(setProjectUsers(resp.data.json_list));
    } catch (error) {
      setUsersRequestData({ ...usersRequestData, loading: true, error: error });
    }
  };

  useEffect(() => {
    getCurrentProject();
    getCurrentUsers();
  }, []);

  return (
    <>
      <MainNavbar />
      {requestData.loading ? (
        <Loading />
      ) : (
        <>
          <div className="currentproject">
            <SideBar />
            {navControl.board && (
              <>
                <Board />
              </>
            )}
            {navControl.backlog && <BackLog />}
          </div>
        </>
      )}
      <InfoModal
        show={requestData.error}
        title={{ type: "error", message: "something went wrong" }}
        onClose={() => {
          setRequestData({ data: "", error: "", loading: false });
        }}
      />
      <InfoModal
        show={usersRequestData.error}
        title={{ type: "error", message: "something went wrong" }}
        onClose={() => {
          setUsersRequestData({ data: "", error: "", loading: false });
        }}
      />
    </>
  );
};

export default CurrentProject;
