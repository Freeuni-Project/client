import React from "react";
// redux hooks
import { useSelector, useDispatch } from "react-redux";
// redux actions
import { setNavControl } from "../actions/globalSlice";
// react icons
import { VscProject, VscCircuitBoard, VscServer } from "react-icons/vsc";

const SideBar = () => {
  const dispatch = useDispatch();
  const navData = useSelector((state) => state.global.navControl);

  return (
    <div className="currentnav">
      <div className="currentnav__title">
        <VscProject />
        <div>LOMSA</div>
      </div>
      <div
        className={
          navData.board
            ? "currentnav__item currentnav__selected"
            : "currentnav__item"
        }
        style={{ marginTop: "1rem" }}
        onClick={() => dispatch(setNavControl({ board: true, backlog: false }))}
      >
        <VscCircuitBoard color={navData.board && "#2151c5"} />
        <div>Board</div>
      </div>
      <div
        className={
          navData.backlog
            ? "currentnav__item currentnav__selected"
            : "currentnav__item"
        }
        onClick={() => dispatch(setNavControl({ board: false, backlog: true }))}
      >
        <VscServer color={navData.backlog && "#2151c5"} />
        <div>Backlog</div>
      </div>
    </div>
  );
};

export default SideBar;
