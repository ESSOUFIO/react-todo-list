import React, { useEffect, useState } from "react";
import styles from "./Stat.module.css";

const Stat = ({ tasks }) => {
  const [nbrTasks, setNbrTasks] = useState(0);
  const [nbrDone, setNbrDone] = useState(0);

  useEffect(() => {
    console.log("effect");
    if (tasks !== []) {
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

  console.log(tasks, nbrDone, nbrTasks);
  return (
    <div className={styles.stat}>
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
