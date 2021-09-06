import React from "react";
// redux hooks
import { useSelector, useDispatch } from "react-redux";
// redux actions
import { setNavControl } from "../actions/globalSlice";
// react icons
import {
  VscProject,
  VscCircuitBoard,
  VscServer,
  VscGraph,
} from "react-icons/vsc";

const SideBar = () => {
  const dispatch = useDispatch();
  const { navControl, currentProject } = useSelector((state) => state.global);

  return (
    <div className="currentnav">
      <div className="currentnav__title">
        <VscProject />
        <div>{currentProject.project_name}</div>
      </div>
      <div
        className={
          navControl.board
            ? "currentnav__item currentnav__selected"
            : "currentnav__item"
        }
        style={{ marginTop: "1rem" }}
        onClick={() =>
          dispatch(
            setNavControl({ board: true, backlog: false, statistic: false })
          )
        }
      >
        <VscCircuitBoard color={navControl.board ? "#2151c5" : ""} />
        <div>Board</div>
      </div>
      <div
        className={
          navControl.backlog
            ? "currentnav__item currentnav__selected"
            : "currentnav__item"
        }
        onClick={() =>
          dispatch(
            setNavControl({ board: false, backlog: true, statistic: false })
          )
        }
      >
        <VscServer color={navControl.backlog ? "#2151c5" : ""} />
        <div>Backlog</div>
      </div>
      <div
        className={
          navControl.statistic
            ? "currentnav__item currentnav__selected"
            : "currentnav__item"
        }
        onClick={() =>
          dispatch(
            setNavControl({ board: false, backlog: false, statistic: true })
          )
        }
      >
        <VscGraph color={navControl.statistic ? "#2151c5" : ""} />
        <div>Satistic</div>
      </div>
    </div>
  );
};

export default SideBar;
