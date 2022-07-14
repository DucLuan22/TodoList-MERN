import axios from "axios";
import React, { useState } from "react";
import useTodosContext from "../hooks/useTodoContext";
export const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [dow, setDOW] = useState("");
  const { dispatch } = useTodosContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = { title, dow };
    axios
      .post("http://localhost:8000/api/todos/p", todo)
      .then((res) => {
        dispatch({ type: "CREATE_TODO", payload: todo });
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setTitle("");
        setDOW("");
        console.log("New todo added");
      });
  };
  return (
    <form className="create-todo" onSubmit={handleSubmit}>
      <div className="form-element">
        <label htmlFor="">Title:</label>
        <input
          type="text"
          placeholder="Enter Todo Title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-element">
        <label htmlFor="">Day of The Week:</label>
        <input
          type="text"
          placeholder="Enter Todo Title"
          onChange={(e) => setDOW(e.target.value)}
        />
      </div>
      <button className="btn">Submit</button>
    </form>
  );
};
