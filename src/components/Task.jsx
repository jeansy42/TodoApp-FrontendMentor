import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { useTaskContext } from "../context/GlobalContext";

function Task({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const { deleteTask, updateTask } = useTaskContext();
  const handleDelete = () => {
    deleteTask(task.id);
  };
  const handleUpdate = (e) => {
    updateTask(task.id);
  };
  const showDelete = () => setShowDeleteBtn(true);
  const hideDelete = () => setShowDeleteBtn(false);

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onMouseOver={showDelete}
      onMouseLeave={hideDelete}
      className="main_child"
    >
      <div className="task_title">
        <span className="border_gradient">
          <span
            className={`check ${task.complete ? "active" : ""} `}
            onClick={handleUpdate}
          >
            <span></span>
          </span>
        </span>
        <span className={`title ${task.complete ? "active" : ""}`}>
          {task.title}
        </span>
      </div>
      {showDeleteBtn ? (
        <span className="delete" onClick={handleDelete}></span>
      ) : null}
    </div>
  );
}

export default Task;
