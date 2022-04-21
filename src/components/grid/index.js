import React from "react";
import "./Grid.css";
import Card from "./Card";

const Grid = ({ taskList, deleteTask, restoreTask, deletetable }) => {
  return (
    <div className='grid__wrapper'>
      <div className='grid__content'>
        {taskList.map((task) => {
          return (
            <Card
              key={task.id}
              {...task}
              deleteTask={deleteTask}
              restoreTask={restoreTask}
              deletetable={deletetable}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
