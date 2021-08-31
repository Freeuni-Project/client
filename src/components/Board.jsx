import React, { useState, useEffect } from "react";
import _ from "lodash";
/* redux hooks */
import { useSelector } from "react-redux";
/* import react dnd to impliment drag and drop */
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Board = () => {
  const item1 = { name: "Impliment Redux In React" };
  const item2 = { name: "Create Delete Function" };
  const item3 = { name: "Impliment i18n" };
  const item4 = { name: "customize bootstrap colors" };
  const item5 = { name: "clean up react project from bolerplate" };
  const item6 = { name: "impliment registration form" };
  const item7 = {
    name: "connect apollo client with graphql for data fetching",
  };
  const item8 = { name: "Craete login form validation" };
  const item9 = { name: "Markup main page" };
  const item10 = { name: "create project remove functional" };

  /* states */
  const [state, setState] = useState({
    todo: { title: "To Do", items: [item1, item2, item3, item4, item5, item6] },
    inProgress: {
      title: "In Progress",
      items: [item4, item5, item6, item7, item8, item9],
    },
    inTesting: {
      title: "In Testing",
      items: [item7, item8, item9, item8, item9],
    },
    done: { title: "Done", items: [item10, item1, item2, item8, item9] },
  });

  /* redux states */
  const { tickets } = useSelector((state) => state.current);

  const handleDragEnd = ({ destination, source }) => {
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
    // save item to for copy
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
  };

  // useEffect(() => {
  //   setState({
  //     todo: { title: "To Do", items: [...tickets.todo] },
  //     inProgress: { title: "In Progress", items: [...tickets.inProgress] },
  //     inTesting: { title: "In Testing", items: [...tickets.inTesting] },
  //     done: { title: "Done", items: [...tickets.done] },
  //   });
  // }, [tickets]);

  console.log(state.done);
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
                                    {el.name}
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
