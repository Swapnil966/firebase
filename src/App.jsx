import { useRef, useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import TodoCard from "./Components/TodoCard";
import Loader from "./Components/Loader";

const firebaseUrl =
  "https://todo-app-85562-default-rtdb.asia-southeast1.firebasedatabase.app/";

function App() {
  let [button, setButton] = useState(false);
  let [tasks, setTasks] = useState([]);
  let taskInput = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    setButton(true);
    let addedTask = taskInput.current.value;
    taskInput.current.value = " ";
    axios
      .post(`${firebaseUrl}todos.json`, {
        title: addedTask,
      })
      .then(() => {
        setButton(false);
        fetchTodos();
      });
  }

  function fetchTodos() {
    let tempTasks = [];
    axios.get(`${firebaseUrl}todos.json`).then((todos) => {
      for (let key in todos.data) {
        let tasks = {
          id: key,
          ...todos.data[key],
        };
        tempTasks.push(tasks);
      }
      setTasks(tempTasks);
    });
  }

  function deleteTask(id) {
    axios.delete(`${firebaseUrl}todos/${id}.json`).then(() => fetchTodos());
  }

  useEffect(fetchTodos, []);

  return (
    <>
      <input type="text" ref={taskInput} placeholder="Add task" />
      <button onClick={handleSubmit}>
        {button ? <Loader /> : "Create task"}
      </button>
      <div>
        {tasks.map((task) => (
          <TodoCard
            deletee={deleteTask}
            id={task.id}
            key={task.id}
            title={task.title}
          />
        ))}
      </div>
    </>
  );
}

export default App;
