import React from "react";
// components
import BackLogItem from "./BackLogItem";
import BackLogButton from "./BackLogButton";

const BackLog = () => {
  return (
    <div className="backlogbox">
      <BackLogItem />
      <BackLogItem />
      <BackLogItem />
      <BackLogItem />
      <BackLogItem />
      <BackLogButton />
    </div>
  );
};

export default BackLog;
