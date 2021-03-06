import React from "react";
/* axios base url */
import base from "../../axios/axiosBase";
/* import icons */
import { IoTrashBinSharp } from "react-icons/io5";

const BackLogItem = ({ ticket, GetProjectTickets, setTicketcard }) => {
  const { title, description, status, id } = ticket;

  const deleteTicket = async () => {
    const resp = await base.delete(`/ticket/${id}`);
    GetProjectTickets();
  };

  return (
    <div
      className="backlogitem"
      onClick={() =>
        setTicketcard((val) => {
          return { show: !val.show, data: ticket };
        })
      }
    >
      <div className="backlogitem__title">{title}</div>
      <div className="backlogitem__description">{description}</div>
      <div className={`backlogitem__status ${status}`}>
        {(status === "todo" && "To Do") ||
          (status === "inProgress" && "In Progress") ||
          (status === "done" && "Done") ||
          (status === "inTesting" && "In Testing")}
      </div>

      <div className="backlogitem__delete">
        <IoTrashBinSharp onClick={() => deleteTicket()} />
      </div>
    </div>
  );
};

export default BackLogItem;
