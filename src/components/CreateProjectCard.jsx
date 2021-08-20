import React from "react";
// redux hooks
import { useDispatch } from "react-redux";
// redux actions
import { setCreateProject } from "../actions/globalSlice";

const CreateProjectCard = () => {
  const dispatch = useDispatch();

  return (
    <div className="card border-primary">
      <div onClick={() => dispatch(setCreateProject({ show: true }))}>
        Create Project
      </div>
    </div>
  );
};

export default CreateProjectCard;
