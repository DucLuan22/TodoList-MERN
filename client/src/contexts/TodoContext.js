import { createContext, useReducer } from "react";

export const TodosContext = createContext();

export const todosReducer = (state, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return {
        todos: action.payload,
      };
    case "CREATE_TODO":
      return {
        todos: [action.payload, ...state.todos],
      };
    case "DELETE_TODO":
      return {
        todos: state.todos.filter((todo) => todo._id !== action.payload._id),
      };
    case "UPDATE_TODO":
      console.log(action.payload);
      const editedTodo = action.payload;
      const editTodo = state.todos.map((todo) => {
        if (todo._id === editedTodo._id) {
          return editedTodo;
        }
        return todo;
      });
      return {
        todos: editTodo,
      };
    default:
      return state;
  }
};
export const TodosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todosReducer, {
    todos: null,
  });
  return (
    <TodosContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
