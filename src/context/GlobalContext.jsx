import { createContext, useContext, useReducer, useState } from "react";
import TaskReducer from "./TaskReducer";
export const TaskContext = createContext();

const decideInitialTasks = () => {
  if (JSON.parse(localStorage.getItem("tasks")))
    return JSON.parse(localStorage.getItem("tasks"));
  else return [];
};

const initialTasks = decideInitialTasks();
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  return context;
};

export function GlobalProvider({ children }) {
  const [message, setMessage] = useState("");
  const [itemsLeft, setiItemsLeft] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [completedTasks, setCompletedTasks] = useState("");
  const [uncompletedTasks, setUncompletedTasks] = useState("");

  const [tasks, dispatch] = useReducer(TaskReducer, initialTasks);
  const [activeTasks, setActiveTasks] = useState(tasks);

  const addTask = (task) => {
    dispatch({ type: "ADD_TASK", payload: task });
  };

  const deleteTask = (id) => {
    dispatch({ type: "DELETE_TASK", id });
  };

  const updateTask = (id) => {
    dispatch({ type: "COMPLETE", id });
  };
  const clearCompletedTasks = () => {
    dispatch({ type: "CLEAR_COMPLETED" });
  };
  const orderedTasks = (ordered_tasks) => {
    dispatch({ type: "ORDERED_TASKS", ordered_tasks });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        updateTask,
        clearCompletedTasks,
        orderedTasks,
        itemsLeft,
        setiItemsLeft,
        completedTasks,
        uncompletedTasks,
        activeTasks,
        toggle,
        message,
        setCompletedTasks,
        setUncompletedTasks,
        setActiveTasks,
        setToggle,
        setMessage,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
