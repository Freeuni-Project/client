import React, { useState, useEffect } from "react";
/* import lodash */
import _ from "lodash";
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

const Board = () => {
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
  const { tickets } = useSelector((state) => state.current);

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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setState({
      todo: { title: "To Do", items: [...tickets.todo] },
      inProgress: { title: "In Progress", items: [...tickets.inProgress] },
      inTesting: { title: "In Testing", items: [...tickets.inTesting] },
      done: { title: "Done", items: [...tickets.done] },
    });
  }, [tickets]);

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
                                console.log(reporter);
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
                                    <div>{el.title}</div>
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
      <BoardModal />
    </>
  );
};

export default Board;
