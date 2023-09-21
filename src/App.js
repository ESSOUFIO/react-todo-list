import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import { MdAdd } from "react-icons/md";
import AddEditModal from "./components/modals/AddEditModal";
import DeleteModal from "./components/modals/DeleteModal";
import IsDoneModal from "./components/modals/IsDoneModal";
import Stat from "./components/stat/Stat";
import { useMediaQuery } from "react-responsive";
import TaskList from "./components/task/TaskList";
import { Form } from "react-bootstrap";

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
  const [darkMode, setDarkMode] = useState(false);

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

  const darkModeHandler = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <main className={darkMode ? styles.darkBack : ""}>
        <div className={styles.container}>
          <Form>
            <Form.Check // prettier-ignore
              type="switch"
              id="dark_mode"
              label="Dark Mode"
              value={darkMode}
              onChange={darkModeHandler}
              className={styles.checkbox_dispMode}
            />
          </Form>
          <header>
            <div
              className={
                darkMode
                  ? `${styles.title} ${styles.header_darkMode}`
                  : styles.title
              }
            >
              TODO LIST
            </div>
            <div
              className={
                darkMode
                  ? `${styles.add_btn} ${styles.header_darkMode}`
                  : styles.add_btn
              }
              onClick={addTask}
            >
              <MdAdd size={40} />
            </div>
          </header>

          <div className={`${isMobileScreen ? styles.hidden : styles.menu}`}>
            <div></div>
            <div>Title</div>
            <div style={{ textAlign: "center" }}>Start date</div>
            <div style={{ textAlign: "center" }}>End date</div>
            <div style={{ textAlign: "center" }}>Status</div>
            <div></div>
          </div>

          <TaskList
            tasks={tasks}
            isMobileScreen={isMobileScreen}
            editTask={editTask}
            deleteTask={deleteTask}
            isDoneTask={isDoneTask}
            darkMode={darkMode}
          />

          <Stat tasks={tasks} darkMode={darkMode} />
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
