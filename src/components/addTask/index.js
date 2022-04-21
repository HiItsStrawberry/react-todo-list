import React from "react";
import Form from "../form";

const AddTask = ({ addTask }) => {
  return <Form taskMethod={addTask} />;
};

export default AddTask;
