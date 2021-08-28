import React from "react";

const BackLogItem = ({ ticket }) => {
  const { title, decription, status } = ticket;

  return (
    <div className="backlogitem">
      <div className="backlogitem__title">{title}</div>
      <div className="backlogitem__description">{decription}</div>
      <div className={`backlogitem__status ${status}`}>
        {(status === "todo" && "To Do") ||
          (status === "inProgress" && "In-Progress") ||
          (status === "done" && "Done") ||
          (status === "inTesting" && "In-Testing")}
      </div>
      <div className="backlogitem__assigneeid">
        {"N"}.{"T"}
      </div>
    </div>
  );
};

export default BackLogItem;
