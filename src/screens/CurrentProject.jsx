import React, { useEffect, useState } from "react";
/* axios base url */
import base from "../axios/axiosBase";
/* redux hooks */
import { useSelector, useDispatch } from "react-redux";
/* redux actions */
import { setCurrentProject } from "../actions/globalSlice";
/* components */
import MainNavbar from "../components/MainNavbar";
import SideBar from "../components/SideBar";
import BackLog from "../components/BackLog/BackLog.jsx";
import Board from "../components/Board";
import Loading from "../components/Loading";

const CurrentProject = ({ match }) => {
  const dispatch = useDispatch();
  /* redux states */
  const { navControl } = useSelector((state) => state.global);

  /* state */
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

  useEffect(() => {
    getCurrentProject();
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
            {navControl.board && <Board />}
            {navControl.backlog && <BackLog />}
          </div>
        </>
      )}
    </>
  );
};

export default CurrentProject;
