import React from "react";
import { Link } from "react-router-dom";

const ProjectListCard = ({ projectName, projectId }) => {
  return (
    <div className="card border-primary">
      <Link
        to={`/project/${projectId}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div>{projectName}</div>
      </Link>
    </div>
  );
};

export default ProjectListCard;
