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
    const response = await axios
      .post("http://localhost:8000/api/todos/p", todo)
      .catch((e) => {
        console.log(e);
      });

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
        <select
          name="DOW"
          onChange={(e) => {
            setDOW(e.target.value);
          }}
          value={dow}
        >
          <option value="" defaultChecked>
            Choose a date
          </option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div>
      <button className="btn">Submit</button>
    </form>
  );
};
