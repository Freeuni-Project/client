import React from "react";
import { VscAdd } from "react-icons/vsc";
/* redux hook */
import { useDispatch, useSelector } from "react-redux";
/* redux actions */
import { setAddTicketShow } from "../../actions/currentProjectSlice";

const BackLogButton = () => {
  const dispatch = useDispatch();
  return (
    <div className="backlogbutton" onClick={() => dispatch(setAddTicketShow())}>
      <VscAdd /> Create Issue
    </div>
  );
};
export default BackLogButton;
