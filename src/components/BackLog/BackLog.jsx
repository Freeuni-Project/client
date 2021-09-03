import React, { useEffect, useState } from "react";
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
/* modals */
import InfoModal from "../InfoModal";
import AddTicket from "../addTicket";
import v4 from "uuid";

const BackLog = () => {
  const dispatch = useDispatch();
  /* states */
  const [didMount, setDidMount] = useState(false);
  const [requestData, setRequestData] = useState({
    data: "",
    error: "",
    loading: false,
  });
  /* redux states */
  const { id } = useSelector((state) => state.global.currentProject);
  const getProjectTickets = async () => {
    setRequestData({ ...requestData, loading: true });
    try {
      const resp = await base.get(`/tickets/projects/${id}`);
      setRequestData({
        ...requestData,
        loading: false,
        data: resp.data.json_list,
      });
      const sortedTickets = {
        todo: [],
        inProgress: [],
        inTesting: [],
        done: [],
      };
      for (let ticket of resp.data.json_list) {
        let newTicket = { ...ticket };
        newTicket.ticketId = newTicket.id;
        newTicket.id = v4();

        sortedTickets[ticket.status].push(newTicket);
      }
      dispatch(setTickets(sortedTickets));
    } catch (error) {
      setRequestData({ ...requestData, loading: false, error: error });
    }
  };

  useEffect(() => {
    setDidMount(true);
    if (id) {
      getProjectTickets();
    }
    return () => setDidMount(false);
  }, [id]);

  return (
    <>
      <div className="backlogbox">
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
                    getProjectTickets={getProjectTickets}
                  />
                );
              })}
            <BackLogButton getProjectTickets={getProjectTickets} />
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
      <AddTicket getProjectTickets={getProjectTickets} />
    </>
  );
};

export default BackLog;
