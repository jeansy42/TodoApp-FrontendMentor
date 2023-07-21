const TaskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [action.payload, ...state];

    case "DELETE_TASK": {
      const deleteTask = state.filter((task) => {
        return task.id !== action.id;
      });
      return deleteTask;
    }
    case "COMPLETE": {
      const updateTask = state.map((task) => {
        if (task.id === action.id) {
          return { ...task, complete: !task.complete };
        } else return task;
      });
      return updateTask;
    }
    case "CLEAR_COMPLETED": {
      const clearCompletedTasks = state.filter((task) => {
        return !task.complete;
      });
      return clearCompletedTasks;
    }
    case "ORDERED_TASKS":
      return action.ordered_tasks;
    default:
      return state;
  }
};
export default TaskReducer;
