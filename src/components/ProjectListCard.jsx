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
  setRemoveMemberShow,
  setRemoveMemberData,
} from "../actions/globalSlice";

/* import andt icon */
import { AiFillProject } from "react-icons/ai";

const ProjectListCard = ({ getProjects, project, index, isAdmin }) => {
  const dispatch = useDispatch();
  /* project destruction to use easly */
  const { project_name, id, description, status } = project;

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
  if (isAdmin) {
    return (
      <>
        <ContextMenuTrigger id={project_name}>
          <Link
            to={`/project/${id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div
              className="projectsbox__item"
              style={{ marginTop: index === 0 && 0 }}
            >
              <AiFillProject className="icon" />
              <div className="title">{project_name}</div>
              <div className="description">{description}</div>
              <div className="status">{status}</div>
            </div>
          </Link>
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
          <MenuItem
            onClick={() => {
              dispatch(setRemoveMemberShow());
              dispatch(setRemoveMemberData(id));
            }}
          >
            <span style={{ color: "red" }}>Remove Member</span>
          </MenuItem>
          <MenuItem onClick={() => setDeleteAgreeModal(true)}>
            <span style={{ color: "red" }}>Delete</span>
          </MenuItem>
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
  }
  if (!isAdmin) {
    return (
      <Link
        to={`/project/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div
          className="projectsbox__item"
          style={{ marginTop: index === 0 && 0 }}
        >
          <AiFillProject className="icon" />
          <div className="title">{project_name}</div>
          <div className="description">{description}</div>
          <div className="status">{status}</div>
        </div>
      </Link>
    );
  } else {
    return <div></div>;
  }
};

export default ProjectListCard;
