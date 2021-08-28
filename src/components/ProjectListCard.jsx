import React, { useState } from "react";
/* axios base url */
import base from "../axios/axiosBase";
/* Link Tag For Routing */
import { Link } from "react-router-dom";
/* context menu */
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
/* modals */
import AgreeModal from "./AgreeModal";
/* redux hooks */
import { useDispatch } from "react-redux";
/* redux action */
import {
  setProjectData,
  setProjectShow,
  setAddMemberShow,
  setAddMemberData,
} from "../actions/globalSlice";

const ProjectListCard = ({ getProjects, project }) => {
  const dispatch = useDispatch();
  /* project destruction to use easly */
  const { project_name, id } = project;
  /* states */
  const [deleteAgreeModal, setDeleteAgreeModal] = useState(false);
  const [requestData, setRequestData] = useState({
    success: "",
    error: "",
    loading: false,
  });

  /* delete project from here */
  const deleteProject = async () => {
    try {
      setRequestData({ ...requestData, loading: true });
      const resp = await base.delete(`/project/${id}`);
      setRequestData({ ...requestData, success: resp.data, loading: false });
      getProjects();
    } catch (error) {
      setRequestData({ ...requestData, error: error, loading: false });
    }
  };

  return (
    <>
      <ContextMenuTrigger id={project_name}>
        <div className="card border-primary">
          <Link
            to={`/project/${id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div>{project_name}</div>
          </Link>
        </div>
      </ContextMenuTrigger>
      <ContextMenu id={project_name}>
        <MenuItem
          onClick={() => {
            dispatch(setAddMemberShow());
            dispatch(setAddMemberData({ id }));
          }}
        >
          Add Member
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(setProjectData(project));
            dispatch(setProjectShow(true));
          }}
        >
          Edit Project
        </MenuItem>
        <MenuItem divider />
        <MenuItem onClick={() => setDeleteAgreeModal(true)}>Delete</MenuItem>
      </ContextMenu>
      <AgreeModal
        title="Do you really want to delete the project?"
        show={deleteAgreeModal}
        loading={requestData.loading}
        agreeFunc={() => {
          deleteProject();
        }}
        disagreeFunc={() => {
          setDeleteAgreeModal(false);
        }}
      />
    </>
  );
};

export default ProjectListCard;
