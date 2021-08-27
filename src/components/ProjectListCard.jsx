import React from "react";
import { Link } from "react-router-dom";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

const ProjectListCard = ({ projectName, projectId }) => {
  function handleClick(e, data) {
    console.log(projectName);
  }
  return (
    <>
      <ContextMenuTrigger id={projectName}>
        <div className="card border-primary">
          <Link
            to={`/project/${projectId}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div>{projectName}</div>
          </Link>
        </div>
      </ContextMenuTrigger>
      <ContextMenu id={projectName}>
        <MenuItem data={{ foo: "bar" }} onClick={handleClick}>
          Add Member
        </MenuItem>
        <MenuItem data={{ foo: "bar" }} onClick={handleClick}>
          Edit Project
        </MenuItem>
        <MenuItem divider />
        <MenuItem data={{ foo: "bar" }} onClick={handleClick}>
          Delete
        </MenuItem>
      </ContextMenu>
    </>
  );
};

export default ProjectListCard;
