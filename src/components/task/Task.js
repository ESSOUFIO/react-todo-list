import React from "react";
import styles from "./Task.module.css";
import { BsCheckSquare, BsCheckSquareFill } from "react-icons/bs";
import { MdEdit, MdDelete } from "react-icons/md";

const Task = ({ task, index, isDoneTask, editTask, deleteTask, darkMode }) => {
  return (
    <div
      className={
        darkMode ? `${styles.task} ${styles.task_darkMode}` : styles.task
      }
    >
      <div>
        <div className={styles.icon} onClick={() => isDoneTask(index)}>
          {task.isDone ? (
            <BsCheckSquareFill
              color={
                darkMode
                  ? "var(--color-green-darkMode)"
                  : "var(--color-green-lightMode)"
              }
              size={20}
            />
          ) : (
            <BsCheckSquare
              color={
                darkMode
                  ? "var(--color-green-darkMode)"
                  : "var(--color-green-lightMode)"
              }
              size={20}
            />
          )}
        </div>
      </div>
      <div>
        <h5 style={{ margin: "0" }}>{task.title}</h5>
      </div>
      <div style={{ textAlign: "center" }}>
        <span>{task.start_date}</span>
      </div>
      <div style={{ textAlign: "center" }}>
        <span style={{ textAlign: "center" }}>{task.end_date}</span>
      </div>
      <div
        className={`${
          task.status === "Done"
            ? styles.Status_Done
            : task.status === "In progress"
            ? styles.Status_InProgress
            : task.status === "Not started"
            ? styles.Status_NotStarted
            : styles.Status_Canceled
        }`}
        style={{ margin: "0 auto" }}
      >
        {task.status}
      </div>
      <div></div>
      <div>
        <span className={styles.icon} onClick={() => editTask(index)}>
          <MdEdit
            color={
              darkMode
                ? "var(--color-green-darkMode)"
                : "var(--color-green-lightMode)"
            }
            size={24}
          />
        </span>
      </div>
      <div>
        <span className={styles.icon} onClick={() => deleteTask(index)}>
          <MdDelete color="red" size={24} />
        </span>
      </div>
      <div></div>
    </div>
  );
};

export default Task;
