import React from "react";
import Grid from "../grid";
import "./History.css";

const History = ({ taskList, restoreTask }) => {
  const filteredTask = taskList.filter((item) => item.isDeleted === true);

  return (
    <div className='history__wrapper'>
      <Grid
        taskList={filteredTask}
        restoreTask={restoreTask}
        deletetable={false}
      />
    </div>
  );
};

export default History;
