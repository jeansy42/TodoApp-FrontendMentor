import "../assets/styles/MiniNavBar.sass";
import { useState, useEffect } from "react";
import { useTaskContext } from "../context/GlobalContext";

function MiniNavBar() {
  const {
    tasks,
    clearCompletedTasks,
    itemsLeft,
    setiItemsLeft,
    setCompletedTasks,
    uncompletedTasks,
    completedTasks,
    setUncompletedTasks,
    setActiveTasks,
    toggle,
  } = useTaskContext();

  const handleClickClearTasks = () => {
    clearCompletedTasks();
  };

  const [optionShowTasks, setOptionShowTasks] = useState("all");

  useEffect(() => {
    const tasksLeft = tasks.filter((task) => {
      return !task.complete;
    });
    const tasksComplete = tasks.filter((task) => {
      return task.complete;
    });
    setCompletedTasks(tasksComplete);
    setUncompletedTasks(tasksLeft);
    setiItemsLeft(tasksLeft.length);
  }, [tasks]);

  const showAllTasks = () => setOptionShowTasks("all");
  const showCompleteTasks = () => setOptionShowTasks("completed");
  const showUncompleteTasks = () => setOptionShowTasks("active");

  useEffect(() => {
    if (optionShowTasks === "completed") setActiveTasks(completedTasks);
    else if (optionShowTasks === "active") setActiveTasks(uncompletedTasks);
    else setActiveTasks(tasks);
  }, [optionShowTasks, completedTasks, uncompletedTasks, tasks]);

  return (
    <div className={`mini_navbar ${toggle ? "dark" : ""}`}>
      <div className="nav_child_one">
        <span>{`${itemsLeft} items left`}</span>
        <span className="nav_btn" onClick={handleClickClearTasks}>
          Clear Completed
        </span>
      </div>
      <div className="nav_child_two">
        <span
          className={`nav_btn ${optionShowTasks === "all" ? "active" : ""}`}
          onClick={showAllTasks}
        >
          All
        </span>
        <span
          className={`nav_btn ${optionShowTasks === "active" ? "active" : ""}`}
          onClick={showUncompleteTasks}
        >
          Active
        </span>
        <span
          className={`nav_btn ${
            optionShowTasks === "completed" ? "active" : ""
          }`}
          onClick={showCompleteTasks}
        >
          Completed
        </span>
      </div>
    </div>
  );
}

export default MiniNavBar;
