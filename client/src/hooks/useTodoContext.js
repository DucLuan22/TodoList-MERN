import { TodosContext } from "../contexts/TodoContext";
import { useContext } from "react";

const useTodosContext = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside an WorkoutsContextProvider"
    );
  }
  return context;
};

export default useTodosContext;
