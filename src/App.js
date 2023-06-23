import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { MdAdd } from "react-icons/md";
import Task from "./components/task/Task";
import "bootstrap/dist/css/bootstrap.min.css";
import AddEditModal from "./components/modals/AddEditModal";
import DeleteModal from "./components/modals/DeleteModal";
import IsDoneModal from "./components/modals/IsDoneModal";
import Stat from "./components/stat/Stat";
import { useMediaQuery } from "react-responsive";
import TaskMobileScreen from "./components/task/TaskMobileScreen";

const initTask = {
  title: "",
  start_date: "",
  end_date: "",
  status: "Not started",
  isDone: false,
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(initTask);
  const [action, setAction] = useState({ type: "", index: null });
  const [show, setShow] = useState(false);
  const [isDoneShow, setIsDoneShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isMobileScreen = useMediaQuery({
    query: "(max-width: 800px)",
  });

  useEffect(() => {
    let TasksStorage;
    TasksStorage = JSON.parse(localStorage.getItem("Tasks"));
    if (TasksStorage) {
      setTasks(TasksStorage);
    }
  }, []);

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const submitHandler = (e, action) => {
    e.preventDefault();
    let array = [];
    if (action.type === "Add") {
      array = tasks;
      const obj = {
        ...newTask,
        isDone: newTask.status === "Done" ? true : false,
      };
      array.push(obj);
      setShow(false);
    } else if (action.type === "Edit") {
      array = tasks.map((task, i) => {
        if (i === action.index) {
          const obj = {
            ...newTask,
            isDone: newTask.status === "Done" ? true : false,
          };
          return obj;
        }
        return task;
      });
      setShow(false);
    } else if (action.type === "Delete") {
      array = tasks.filter((task, i) => i !== action.index);
      setShowDeleteModal(false);
    } else if (action.type === "isDone") {
      array = tasks.map((task, i) => {
        if (i === action.index) {
          const newStatus = newTask.isDone ? "In progress" : "Done";
          const obj = {
            ...newTask,
            isDone: !newTask.isDone,
            status: newStatus,
          };
          return obj;
        }
        return task;
      });
      setIsDoneShow(false);
    }
    setTasks(array);
    localStorage.setItem("Tasks", JSON.stringify(tasks));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addTask = () => {
    setNewTask(initTask);
    setAction({
      type: "Add",
      index: null,
    });
    handleShow();
  };

  const editTask = (index) => {
    setNewTask(tasks[index]);
    setAction({
      type: "Edit",
      index,
    });
    handleShow();
  };

  const isDoneTask = (index) => {
    setNewTask(tasks[index]);
    setAction({
      type: "isDone",
      index,
    });
    setIsDoneShow(true);
  };

  const deleteTask = (index) => {
    setAction({
      type: "Delete",
      index,
    });
    setShowDeleteModal(true);
  };

  return (
    <>
      <main>
        <div className={styles.listBack}>
          <header>
            <div className={styles.title}>
              <span>TODO LIST</span>
            </div>
            <div className={styles["add_btn"]} onClick={addTask}>
              <MdAdd size={40} />
            </div>
          </header>

          {!isMobileScreen && (
            <div className={styles.menu}>
              <div></div>
              <div>Title</div>
              <div style={{ textAlign: "center" }}>Start date</div>
              <div style={{ textAlign: "center" }}>End date</div>
              <div style={{ textAlign: "center" }}>Status</div>
              <div></div>
            </div>
          )}

          <div id="tasksBack">
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
          <Stat tasks={tasks} />
        </div>
      </main>
      <IsDoneModal
        show={isDoneShow}
        handleClose={() => setIsDoneShow(false)}
        submitHandler={submitHandler}
        action={action}
        newTask={newTask}
        inputHandle={inputHandle}
      />
      <AddEditModal
        show={show}
        handleClose={handleClose}
        submitHandler={submitHandler}
        action={action}
        newTask={newTask}
        inputHandle={inputHandle}
      />
      <DeleteModal
        show={showDeleteModal}
        action={action}
        task={tasks[action.index]}
        setShowDeleteModal={setShowDeleteModal}
        submitHandler={submitHandler}
      />
    </>
  );
}

export default App;
