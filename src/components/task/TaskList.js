import React from "react";
import TaskMobileScreen from "./TaskMobileScreen";
import Task from "./Task";

const TaskList = ({
  tasks,
  isMobileScreen,
  editTask,
  deleteTask,
  isDoneTask,
}) => {
  return (
    <div>
      {tasks.map((task, index) => {
        if (isMobileScreen) {
          return (
            <TaskMobileScreen
              key={index}
              task={task}
              index={index}
              editTask={editTask}
              deleteTask={deleteTask}
              isDoneTask={isDoneTask}
            />
          );
        } else {
          return (
            <Task
              key={index}
              task={task}
              index={index}
              editTask={editTask}
              deleteTask={deleteTask}
              isDoneTask={isDoneTask}
            />
          );
        }
      })}
    </div>
  );
};

export default TaskList;
