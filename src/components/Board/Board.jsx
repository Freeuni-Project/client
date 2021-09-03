import React, { useState, useEffect } from "react";
/* import lodash */
import _ from "lodash";
/* axios base url */
import base from "../../axios/axiosBase";
/* redux hooks */
import { useSelector } from "react-redux";
/* import react dnd to impliment drag and drop */
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Board = () => {
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
  const { tickets } = useSelector((state) => state.current);

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
    const resp = await base.put(`/ticket/${itemCopy.ticketId}`, {
      project_id: 54,
      assignee_id: itemCopy.assignee_id,
      title: itemCopy.title,
      description: itemCopy.description,
      status: destination.droppableId,
      reporter_id: itemCopy.reporter_id,
    });
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
                                return (
                                  <div
                                    className="item"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {el.title}
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
    </>
  );
};

export default Board;
