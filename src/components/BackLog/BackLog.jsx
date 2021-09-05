import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import v4 from "uuid";
/* import lodash */
import _ from "lodash";
/* axios base url */
import base from "../../axios/axiosBase";
/* redux hoos */
import { useSelector, useDispatch } from "react-redux";
/* redux actions */
import { setTickets } from "../../actions/currentProjectSlice";
/* components */
import BackLogItem from "./BackLogItem";
import BackLogButton from "./BackLogButton";
import Loading from "../Loading";
import BackLogTicket from "./BackLogTicket";
/* modals */
import InfoModal from "../InfoModal";
import AddTicket from "../addTicket";
/* request */
import { GetProjectTickets } from "../../requests/GetProjectTickets";

const BackLog = () => {
  const dispatch = useDispatch();
  /* states */
  const [didMount, setDidMount] = useState(false);
  /* ticketcard */
  const [ticketcard, setTicketcard] = useState({ show: false, data: {} });

  const [requestData, setRequestData] = useState({
    data: "",
    error: "",
    loading: false,
  });
  /* redux states */
  const { id } = useSelector((state) => state.global.currentProject);

  useEffect(() => {
    setDidMount(true);
    if (id) {
      GetProjectTickets(id, requestData, setRequestData, dispatch);
    }
    return () => setDidMount(false);
  }, [id]);

  return (
    <>
      <div className="backlogcontainer">
        <div className="backlogbox" style={{ width: "100%" }}>
          <Card.Title>Card List</Card.Title>
          {requestData.loading ? (
            <Loading />
          ) : (
            <>
              {requestData.data &&
                requestData.data.map((ticket) => {
                  return (
                    <BackLogItem
                      key={ticket.id}
                      ticket={ticket}
                      GetProjectTickets={() =>
                        GetProjectTickets(
                          id,
                          requestData,
                          setRequestData,
                          dispatch
                        )
                      }
                      setTicketcard={setTicketcard}
                    />
                  );
                })}
              <BackLogButton />
            </>
          )}
          <InfoModal
            show={requestData.error}
            title={{ type: "error", message: "Something went wrong" }}
            onClose={() =>
              setRequestData({ data: "", error: "", loading: false })
            }
          />
        </div>
        {ticketcard.show && (
          <BackLogTicket
            data={ticketcard.data}
            projectId={id}
            GetProjectTickets={() =>
              GetProjectTickets(id, requestData, setRequestData, dispatch)
            }
          />
        )}
      </div>
      <AddTicket
        GetProjectTickets={() =>
          GetProjectTickets(id, requestData, setRequestData, dispatch)
        }
      />
    </>
  );
};

export default BackLog;
