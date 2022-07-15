import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import useTodosContext from "../hooks/useTodoContext";

const TodoCard = ({ todo }) => {
  const { title, dow } = todo;

  const [isEdit, setIsEdit] = useState(false);
  const [editDOW, setEditDow] = useState(dow);
  const [editTitle, setEditTitle] = useState(title);
  const { dispatch } = useTodosContext();

  const handleDelete = async () => {
    setEditDow(editDOW);
    setEditTitle(editTitle);
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
  const handleUpdate = async () => {
    if (editDOW === "" || editTitle === "") {
      console.log("Please fill in all fields");
      return 0;
    }
    const response = await axios
      .patch(`http://localhost:8000/api/todos/u/${todo._id}`, {
        title: editTitle,
        dow: editDOW,
      })
      .catch((err) => console.log(err));
    if (response) {
      dispatch({ type: "UPDATE_TODO", payload: response.data });
    }
    console.log(editTitle, editDOW);
    setIsEdit(false);
  };
  return (
    <div className="todo">
      <div>
        {isEdit ? (
          <label>
            Title:
            <span>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </span>
          </label>
        ) : (
          <label>Title: {editTitle}</label>
        )}
      </div>
      <div>
        {isEdit ? (
          <label>
            Day of the week:{" "}
            <span>
              <select
                name=""
                value={editDOW}
                onChange={(e) => setEditDow(e.target.value)}
              >
                <option value="">Choose a day</option>
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
          <label htmlFor="">Day of the week: {editDOW}</label>
        )}
      </div>
      <div className="btn-todo">
        <BsTrash onClick={handleDelete} />
        <AiOutlineEdit onClick={handleEdit} />
        {isEdit ? <AiOutlineCheck onClick={handleUpdate} /> : ""}
      </div>
    </div>
  );
};

export default TodoCard;
