import React, { useEffect } from "react";
import { TodoForm } from "../components/TodoForm";
import TodoCard from "../components/TodoCard";
import axios from "axios";
import useTodosContext from "../hooks/useTodoContext";
export const Home = () => {
  const { todos, dispatch } = useTodosContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/todos/q");
      if (response) {
        dispatch({ type: "SET_TODOS", payload: response.data });
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      <div className="form-container">
        <TodoForm />
      </div>
      <div className="todos-list">
        {todos && todos.map((todo) => <TodoCard key={todo._id} todo={todo} />)}
      </div>
    </main>
  );
};
