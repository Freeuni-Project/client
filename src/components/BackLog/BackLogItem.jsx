import React from "react";

const BackLogItem = () => {
  return (
    <div className="backlogitem">
      <div className="backlogitem__title">Clean Up Room</div>
      <div className="backlogitem__description">This is Desctription</div>
      <div className="backlogitem__status done">Done</div>
      <div className="backlogitem__assigneeid">
        {"N"}.{"T"}
      </div>
    </div>
  );
};

export default BackLogItem;
