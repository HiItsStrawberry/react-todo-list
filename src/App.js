import React, { useEffect, useState } from "react";
import "./App.css";
import data from "./data.json";
import { isPersistedState, storeState } from "./helpers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/header";
import Home from "./components/home";
import AddTask from "./components/addTask";
import EditTask from "./components/editTask";
import History from "./components/history";
import NotFound from "./components/notFound";

const days = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
};

function App() {
  const [taskList, setTaskList] = useState(data);
  const [filteredTask, setFilteredTask] = useState([]);
  const [dayOption, setDayOption] = useState([]);

  const filterByDay = (selectedDay) => {
    const localState = isPersistedState("tasks");

    if (localState) {
      const newTaskList = localState.filter(
        (s) => s.created_at === selectedDay && s.isDeleted === false
      );
      setFilteredTask(newTaskList);
    }
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure want to delete this task")) {
      const localState = isPersistedState("tasks");

      if (localState) {
        const task = localState.find((item) => item.id === id);
        const prevTask = localState.filter((item) => item.id !== id);

        if (task) {
          task.isDeleted = true;
          setTaskList([...prevTask, task]);
        }
      }
    }
  };

  const restoreTask = (id) => {
    if (window.confirm("Are you sure want to restore this task")) {
      const localState = isPersistedState("tasks");

      if (localState) {
        const task = localState.find((item) => item.id === id);
        const prevTask = localState.filter((item) => item.id !== id);

        if (task) {
          task.isDeleted = false;
          setTaskList([...prevTask, task]);
        }
      }
    }
  };

  const addTask = (task) => {
    const newTask = { ...task, isDeleted: false };
    setTaskList([...taskList, newTask]);
  };

  const editTask = (task) => {
    let updatedTask = taskList.find((item) => item.id === task.id);
    updatedTask = {
      ...updatedTask,
      title: task.title,
      description: task.description,
      created_at: task.created_at,
    };

    const prevTask = taskList.filter((item) => item.id !== task.id);
    setTaskList([...prevTask, updatedTask]);
  };

  const updateLocalStorage = () => {
    storeState("tasks", taskList);

    const filteredTask = taskList.filter((item) => item.isDeleted === false);

    const dayOptions = [
      ...new Set(filteredTask.map((option) => option.created_at)),
    ];

    dayOptions.sort((a, b) => {
      return days[a] - days[b];
    });

    setDayOption(dayOptions);
    filterByDay(dayOptions[0]);
  };

  useEffect(() => {
    updateLocalStorage();
  }, [taskList]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <Home
              taskList={filteredTask}
              dayOptions={dayOption}
              filterByDay={filterByDay}
              deleteTask={deleteTask}
            />
          }
        ></Route>
        <Route path='/add-task' element={<AddTask addTask={addTask} />}></Route>
        <Route
          path='/edit-task/:id'
          element={<EditTask editTask={editTask} />}
        ></Route>
        <Route
          path='/history'
          element={<History taskList={taskList} restoreTask={restoreTask} />}
        ></Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
