import React from "react";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import useTodosContext from "../hooks/useTodoContext";
const TodoCard = ({ todo }) => {
  const { dispatch } = useTodosContext();
  const { title, dow } = todo;
  const handleDelete = async () => {
    const response = await axios.delete(
      `http://localhost:8000/api/todos/d/${todo._id}`
    );
    if (response) {
      dispatch({ type: "DELETE_TODO", payload: response.data });
    }
  };
  const handleEdit = () => {};
  return (
    <div className="todo">
      <div>
        <label htmlFor="">Title: {title}</label>
      </div>
      <div>
        <label htmlFor="">Day of the week: {dow}</label>
      </div>
      <div className="btn-todo">
        <BsTrash onClick={handleDelete} />
        <AiOutlineEdit onClick={handleEdit} />
      </div>
    </div>
  );
};

export default TodoCard;
