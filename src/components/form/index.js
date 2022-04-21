import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isPersistedState } from "../../helpers";
import "./Form.css";

const Form = ({ taskMethod }) => {
  const { id } = useParams();
  const [task, setTask] = useState({
    id: new Date().getTime(),
    title: "",
    description: "",
    created_at: "",
  });

  useEffect(() => {
    const localState = isPersistedState("tasks");

    if (localState && id) {
      const task = localState.find((item) => item.id === parseInt(id));
      if (task) {
        setTask({
          id: task.id,
          title: task.title,
          description: task.description,
          created_at: task.created_at,
        });
      }
    } else {
    }
  }, [id]);

  const dayOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      task.title &&
      task.description &&
      task.created_at &&
      task.created_at !== "Select Option"
    ) {
      taskMethod(task);
      setTask({ title: "", description: "", created_at: "" });
    } else {
      alert("Please fill in all the fields");
    }
  };

  return (
    <div className='form__wrapper'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title : </label>
        <input
          type='text'
          name='title'
          id='title'
          value={task.title}
          onChange={handleChange}
          placeholder='Task title ...'
        />
        <label htmlFor='description'>Description : </label>
        <textarea
          name='description'
          id='description'
          value={task.description}
          onChange={handleChange}
          placeholder='Task description ...'
        ></textarea>
        <label htmlFor='created_at'>Select Day : </label>
        <select
          name='created_at'
          id='created_at'
          value={task.created_at}
          onChange={handleChange}
        >
          <option value='Select Option'>Select Option</option>
          {dayOptions.map((day, index) => {
            return (
              <option key={index} value={day}>
                {day}
              </option>
            );
          })}
        </select>

        <button type='submit'>submit</button>
      </form>
    </div>
  );
};

export default Form;
