import React from "react";
//react hooks
import { useSelector } from "react-redux";
// components
import MainNavbar from "../components/MainNavbar";
import SideBar from "../components/SideBar";
import BackLog from "../components/BackLog";
import Board from "../components/Board";

const CurrentProject = ({ match }) => {
  // redux global state
  const navData = useSelector((state) => state.global.navControl);

  return (
    <>
      <MainNavbar />
      <div className="currentproject">
        <SideBar />
        {navData.board && <Board />}
        {navData.backlog && <BackLog />}
      </div>
    </>
  );
};

export default CurrentProject;
