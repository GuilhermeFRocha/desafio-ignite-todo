import React, { useState, useEffect } from "react";
import "../styles/tasklist.scss";
import { FiTrash, FiCheckSquare } from "react-icons/fi";

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [numberTask, setNumberTask] = useState(0);

  function handleCreateNewTask() {
    if (newTaskTitle !== "") {
      const newTask = {
        id: Math.random(),
        title: newTaskTitle,
        isComplete: false,
      };
      setTasks([...tasks, newTask]);
      localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));

      setNewTaskTitle("");
    }
  }

  function handleToggleTaskCompletion(id) {

    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.isComplete = !task.isComplete;
        }

        if (task.isComplete === true && task.id === id) {
          setNumberTask(numberTask + 1);
        } else if (task.isComplete === false && task.id === id) {
          setNumberTask(numberTask - 1);
        }
        return task;
      })
    );


  }

  function handleRemoveTask(id) {
    const tasksFiltered = tasks.filter(task => task.id !== id)

    setTasks(
      tasks.filter((item) => {
        if (item.isComplete && item.id === id) {
          
          setNumberTask(numberTask - 1);

        }
        return item.id !== id;
      })
    );

    localStorage.setItem("tasks", JSON.stringify(tasksFiltered));

  }

  useEffect(() => {
    const localStorageTasks = localStorage.getItem("tasks");
    if (localStorageTasks) {
      setTasks(JSON.parse(localStorageTasks));
    }
  }, []);

  return (
    <section className=" container">
      <header className="header">
        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <div className="result-task">
        <p>Tarefas criadas: {tasks.length}</p>
        <p>Concluidas: {numberTask}</p>
      </div>

      <main>
        <ul>
          {tasks.length ? tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p className="text">{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} color={"#5e60cd"} />
              </button>
            </li>
          )) : <h3 className="registerTask">Cadastre uma tarefa!</h3>}
        </ul>
      </main>
    </section>
  );
};
