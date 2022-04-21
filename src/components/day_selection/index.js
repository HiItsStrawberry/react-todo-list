import React from "react";
import "./Day_selection.css";

const DaySelection = ({ dayOption, filterByDay }) => {
  return (
    <div className='btn__wrapper'>
      {dayOption.map((day, index) => {
        return (
          <button key={index} type='button' onClick={() => filterByDay(day)}>
            {day}
          </button>
        );
      })}
    </div>
  );
};

export default DaySelection;
