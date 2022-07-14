import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import useTodosContext from "../hooks/useTodoContext";
const TodoCard = ({ todo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState("");
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
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  return (
    <div className="todo">
      <div>
        {isEdit ? (
          <label>
            Title:{" "}
            <span>
              <input
                type="text"
                value={todo.title}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </span>
          </label>
        ) : (
          <label>Title: {title}</label>
        )}
      </div>
      <div>
        {isEdit ? (
          <label>
            Day of the week:{" "}
            <span>
              <select name="">
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </span>
          </label>
        ) : (
          <label htmlFor="">Day of the week: {dow}</label>
        )}
      </div>
      <div className="btn-todo">
        <BsTrash onClick={handleDelete} />
        <AiOutlineEdit onClick={handleEdit} />
        {isEdit ? <AiOutlineCheck /> : ""}
      </div>
    </div>
  );
};

export default TodoCard;
