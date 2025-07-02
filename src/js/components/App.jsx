import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";

const API_BASE = "https://playground.4geeks.com/todo";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("todo_username") || "Aaliyah";
  });

  // Crear usuario si no existe
  const createUser = async () => {
    try {
      await fetch(`${API_BASE}/users/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
    } catch (err) {
      console.warn("Usuario ya existe o error:", err);
    }
  };

  // Obtener tareas
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_BASE}/users/${username}`);
      const data = await res.json();
      setTasks(data.todos || []);
    } catch (err) {
      console.error("Error al cargar tareas:", err);
    }
  };

  // Actualizar todas las tareas (PUT)
  const updateTasks = async (newTasks) => {
    try {
      await fetch(`${API_BASE}/todos/${username}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTasks)
      });
      fetchTasks();
    } catch (err) {
      console.error("Error al actualizar:", err);
    }
  };

  // Agregar nueva tarea
  const addTask = (label) => {
    const newTasks = [...tasks, { label, done: false }];
    updateTasks(newTasks);
  };

  // Eliminar tarea
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    updateTasks(newTasks);
  };

  // Limpiar todas
  const clearAll = () => {
    updateTasks([]);
  };

  // Toggle "done"
  const toggleDone = (index) => {
    const updated = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    updateTasks(updated);
  };

  useEffect(() => {
    localStorage.setItem("todo_username", username);
    createUser().then(fetchTasks);
  }, [username]);

  const pendingCount = tasks.filter((t) => !t.done).length;

  return (
    <div className="app-container">
      <h1>📝 Lista de Tareas</h1>
      <TaskForm onAdd={addTask} />
      <ul>
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            onDelete={() => deleteTask(index)}
            onToggle={() => toggleDone(index)}
          />
        ))}
      </ul>
      <p>{pendingCount} tarea(s) pendiente(s)</p>
      {tasks.length > 0 && (
        <button className="clear-btn" onClick={clearAll}>
          🧹 Limpiar todas
        </button>
      )}
    </div>
  );
};

export default App;
