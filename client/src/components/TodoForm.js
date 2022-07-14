import axios from "axios";
import React, { useState } from "react";
import useTodosContext from "../hooks/useTodoContext";
export const TodoForm = () => {
  const { dispatch } = useTodosContext();
  const [title, setTitle] = useState("");
  const [dow, setDOW] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const todo = { title, dow };
    const response = await axios.post(
      "http://localhost:8000/api/todos/p",
      todo
    );

    if (response) {
      console.log(dow, title);
      setDOW("");
      setTitle("");
      dispatch({ type: "CREATE_TODO", payload: response.data });
    }
  };

  return (
    <form className="create-todo" onSubmit={handleSubmit}>
      <div className="form-element">
        <label htmlFor="">Title:</label>
        <input
          type="text"
          placeholder="Enter Todo Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
      </div>
      <div className="form-element">
        <label htmlFor="">Day of The Week:</label>
        <input
          type="text"
          placeholder="Enter Todo Title"
          onChange={(e) => {
            setDOW(e.target.value);
          }}
          value={dow}
        />
      </div>
      <button className="btn">Submit</button>
    </form>
  );
};
