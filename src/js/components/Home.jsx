import React, { useState, useEffect } from "react";

// Define los endpoints personalizados
const API_GET_URL = "https://playground.4geeks.com/todo/users/iysha-22";
const API_POST_URL = "https://playground.4geeks.com/todo/todos/iysha-22";

const TodoApp = () => {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  // Función para obtener las tareas (GET)
  const obtenerTareas = async () => {
    try {
      const response = await fetch(API_GET_URL);
      const data = await response.json();
      // Se asume que la lista de tareas se encuentra en data.todos
      setTareas(data.todos);
    } catch (error) {
      console.error("Error al obtener tareas", error);
    }
  };

  // Llama a obtenerTareas() al iniciar el componente
  useEffect(() => {
    obtenerTareas();
  }, []);

  // Función para agregar una tarea (POST)
  const agregarTarea = async () => {
    if (nuevaTarea.trim() === "") return; // Evita agregar tareas vacías

    try {
      await fetch(API_POST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: nuevaTarea, is_done: false })
      });
      setNuevaTarea(""); // Limpia el input
      obtenerTareas(); // Actualiza la lista de tareas
    } catch (error) {
      console.error("Error al agregar tarea", error);
    }
  };

  // Función para eliminar una tarea individual (DELETE)
  const eliminarTarea = async (id) => {
    try {
      // Construye la URL dinámica para eliminar la tarea por su ID
      await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE"
      });
      obtenerTareas();
    } catch (error) {
      console.error("Error al eliminar tarea", error);
    }
  };

  // Función para limpiar todas las tareas (DELETE para cada una)
  const limpiarTareas = async () => {
    try {
      // Itera sobre las tareas y elimina cada una
      for (let tarea of tareas) {
        await fetch(`https://playground.4geeks.com/todo/todos/${tarea.id}`, {
          method: "DELETE"
        });
      }
      obtenerTareas(); // Actualiza la lista
    } catch (error) {
      console.error("Error al limpiar todas las tareas", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Lista de Tareas</h2>
      <div>
        <input
          type="text"
          placeholder="Nueva tarea..."
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && agregarTarea()}
          style={{ padding: "10px", width: "70%" }}
        />
        <button onClick={agregarTarea} style={{ padding: "10px", marginLeft: "5px" }}>
          Agregar
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tareas.length > 0 ? (
          tareas.map((tarea) => (
            <li key={tarea.id} style={{ margin: "10px 0", display: "flex", justifyContent: "space-between" }}>
              <span>{tarea.label}</span>
              <button onClick={() => eliminarTarea(tarea.id)} style={{ background: "red", color: "white" }}>
                Eliminar
              </button>
            </li>
          ))
        ) : (
          <li>No hay tareas</li>
        )}
      </ul>
      {tareas.length > 0 && (
        <button onClick={limpiarTareas} style={{ marginTop: "15px", background: "darkred", color: "white", padding: "10px" }}>
          Limpiar Todas las Tareas
        </button>
      )}
    </div>
  );
};

export default TodoApp;
