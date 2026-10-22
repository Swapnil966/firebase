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
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-xl">
          <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
            My Todo App
          </h1>

          <div className="mb-6 flex gap-2">
            <input
              type="text"
              ref={taskInput}
              placeholder="Add task"
              className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500"
            />

            <button
              onClick={handleSubmit}
              className="rounded-md cursor-pointer bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              {button ? <Loader /> : "Create task"}
            </button>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <TodoCard
                deletee={deleteTask}
                id={task.id}
                key={task.id}
                title={task.title}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
