import React from "react";
import "./Home.css";
import DaySelection from "../day_selection/index";
import Grid from "../grid/index";

const Home = ({ taskList, dayOptions, filterByDay, deleteTask }) => {
  return (
    <div className='home__wrapper'>
      <div className='home__content'>
        {dayOptions && (
          <DaySelection dayOption={dayOptions} filterByDay={filterByDay} />
        )}

        {taskList && (
          <Grid
            taskList={taskList}
            deleteTask={deleteTask}
            deletetable={true}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
