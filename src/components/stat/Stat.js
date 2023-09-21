import React, { useEffect, useState } from "react";
import styles from "./Stat.module.css";

const Stat = ({ tasks, darkMode }) => {
  const [nbrTasks, setNbrTasks] = useState(0);
  const [nbrDone, setNbrDone] = useState(0);

  useEffect(() => {
    if (tasks.length !== 0) {
      let nbr = 0;
      setNbrTasks(tasks.length);
      tasks.forEach((task) => {
        if (task.isDone) {
          nbr++;
        }
      });
      setNbrDone(nbr);
    }
  }, [tasks, tasks.length]);

  const ratio = (nbrDone / nbrTasks) * 100;

  return (
    <div
      className={
        darkMode ? `${styles.stat} ${styles.stat_darkMode}` : styles.stat
      }
    >
      <div className={styles.text} id="Stat_text">
        <b> {nbrDone} </b> of <b>{nbrTasks}</b> tasks done
      </div>
      <div
        className={styles["Ratio-task"]}
        style={{ width: `${Math.floor(ratio)}%` }}
      ></div>
    </div>
  );
};

export default Stat;
