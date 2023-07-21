import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import "../assets/styles/Main.sass";
import { useEffect } from "react";
import NewTask from "../components/NewTask";
import Task from "../components/Task";
import { useTaskContext } from "../context/GlobalContext";
import MiniNavBar from "../components/MiniNavBar";

function Main() {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  const { activeTasks, toggle, orderedTasks, tasks } = useTaskContext();

  useEffect(() => {
    toggle
      ? (document.body.style.backgroundColor = "hsl(235, 21%, 11%)")
      : (document.body.style.backgroundColor = "");
  }, [toggle]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDragEnd = (e) => {
    const { active, over } = e;
    const oldIndex = activeTasks.findIndex((task) => task.id === active.id);
    const newIndex = activeTasks.findIndex((task) => task.id === over.id);
    orderedTasks(arrayMove(activeTasks, oldIndex, newIndex));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className={`main ${toggle ? "dark" : ""}`}>
        <NewTask />
        <div className="tasksNav_container">
          <SortableContext
            items={activeTasks}
            strategy={verticalListSortingStrategy}
          >
            {activeTasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </SortableContext>
          <MiniNavBar />
        </div>
      </div>
    </DndContext>
  );
}

export default Main;
