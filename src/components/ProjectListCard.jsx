import React from "react";

const ProjectListCard = ({ projectName, projectId }) => {
  return (
    <div className="card border-primary">
      <div>{projectName}</div>
    </div>
  );
};

export default ProjectListCard;
