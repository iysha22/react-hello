import React, { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(input.trim());
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe una tarea..."
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default TaskForm;
