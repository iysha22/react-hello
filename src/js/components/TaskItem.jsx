import React from "react";

const TaskItem = ({ task, onDelete, onToggle }) => {
  return (
    <li className="task-item">
      <label>
        <input type="checkbox" checked={task.done} onChange={onToggle} />
        <span style={{ textDecoration: task.done ? "line-through" : "none" }}>
          {task.label}
        </span>
      </label>
      <button onClick={onDelete}>🗑️</button>
    </li>
  );
};

export default TaskItem;
