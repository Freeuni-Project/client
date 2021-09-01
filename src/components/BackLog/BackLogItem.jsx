import React, { useState } from "react";
/* axios base url */
import base from "../../axios/axiosBase";
/* import icons */
import { IoTrashBinSharp } from "react-icons/io5";
/* modals */
import AgreeModal from "../AgreeModal";

const BackLogItem = ({ ticket, getProjectTickets }) => {
  const { title, description, status, id } = ticket;
  /* states */
  const [agreeModal, setAgreeModal] = useState(false);

  const deleteTicket = async () => {
    const resp = await base.delete(`/ticket/${id}`);
    getProjectTickets();
  };

  return (
    <div className="backlogitem">
      <div className="backlogitem__title">{title}</div>
      <div className="backlogitem__description">{description}</div>
      <div className={`backlogitem__status ${status}`}>
        {(status === "todo" && "To Do") ||
          (status === "inProgress" && "In-Progress") ||
          (status === "done" && "Done") ||
          (status === "inTesting" && "In-Testing")}
      </div>
      <div className="backlogitem__assigneeid">
        {"N"}.{"T"}
      </div>
      <div className="backlogitem__delete">
        <IoTrashBinSharp onClick={() => deleteTicket()} />
      </div>
    </div>
  );
};

export default BackLogItem;
