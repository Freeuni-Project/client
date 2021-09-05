import React, { useState, useEffect } from "react";
/* import lodash */
import _, { assign } from "lodash";
/* axios base url */
import base from "../../axios/axiosBase";
/* redux hooks */
import { useSelector, useDispatch } from "react-redux";
/* redux actions */
import {
  setBoardModalShow,
  setBoardModalData,
} from "../../actions/currentProjectSlice";
/* import react dnd to impliment drag and drop */
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
/* modals */
import BoardModal from "./BoardModal";
/* requests */
import { GetProjectTickets } from "../../requests/GetProjectTickets";
import { v4 } from "uuid";

const Board = () => {
  const [requestData, setRequestData] = useState({
    data: "",
    error: "",
    loading: false,
  });

  const dispatch = useDispatch();
  /* states */
  const [state, setState] = useState({
    todo: { title: "To Do", items: [] },
    inProgress: {
      title: "In Progress",
      items: [],
    },
    inTesting: {
      title: "In Testing",
      items: [],
    },
    done: { title: "Done", items: [] },
  });

  /* redux states */
  const { projectUsers } = useSelector((state) => state.current);
  const { id } = useSelector((state) => state.global.currentProject);

  /* drag end drop functional */
  const handleDragEnd = async ({ destination, source }) => {
    if (!destination) {
      console.log("not dropped in droppable");
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      console.log("dropped in same place");
      return;
    }
    /* item for copy */
    const itemCopy = { ...state[source.droppableId].items[source.index] };

    setState((prev) => {
      prev = { ...prev };
      prev[source.droppableId].items.splice(source.index, 1);

      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );

      return prev;
    });
    try {
      const resp = await base.put(`/ticket/${itemCopy.ticketId}`, {
        project_id: 54,
        assignee_id: itemCopy.assignee_id,
        title: itemCopy.title,
        description: itemCopy.description,
        status: destination.droppableId,
        reporter_id: itemCopy.reporter_id,
      });
      GetProjectTickets(id, requestData, setRequestData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (requestData.data) {
      const sortedTickets = {
        todo: [],
        inProgress: [],
        inTesting: [],
        done: [],
      };
      for (let ticket of requestData.data) {
        let newTicket = { ...ticket };
        newTicket.ticketId = newTicket.id;
        newTicket.id = v4();
        sortedTickets[ticket.status].push(newTicket);
      }
      setState({
        todo: { title: "To Do", items: [...sortedTickets.todo] },
        inProgress: {
          title: "In Progress",
          items: [...sortedTickets.inProgress],
        },
        inTesting: {
          title: "In Testing",
          items: [...sortedTickets.inTesting],
        },
        done: { title: "Done", items: [...sortedTickets.done] },
      });
    }
  }, [requestData.data]);

  useEffect(() => {
    GetProjectTickets(id, requestData, setRequestData);
  }, []);
  return (
    <>
      <div className="board">
        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(state, (data, key) => {
            return (
              <div key={key} className="column">
                <h3>{data.title}</h3>
                <Droppable droppableId={key}>
                  {(provided) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="droppable-col"
                      >
                        {data.items.map((el, index) => {
                          return (
                            <Draggable
                              key={el.id}
                              index={index}
                              draggableId={el.id}
                            >
                              {(provided) => {
                                const reporter = projectUsers.find(
                                  (user) => user.id === el.reporter_id
                                );
                                const assigned = projectUsers.find(
                                  (user) => user.id === el.assignee_id
                                );

                                return (
                                  <div
                                    className="item"
                                    onClick={() => {
                                      dispatch(setBoardModalShow());
                                      dispatch(setBoardModalData(el));
                                    }}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {el.title}
                                    <div className="icon">
                                      {assigned &&
                                        `${assigned.first_name[0]}${assigned.last_name[0]}`}
                                    </div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
      <BoardModal
        GetProjectTickets={() =>
          GetProjectTickets(id, requestData, setRequestData)
        }
      />
    </>
  );
};

export default Board;
