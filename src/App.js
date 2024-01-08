import React, { useState } from "react";
import "./App.css";

function Task({ task, index, completeTask, deleteTask, updateTask }) {
  const [editable, setEditable] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleUpdate = () => {
    if (editedTitle.trim() !== "") {
      updateTask(index, editedTitle);
      setEditable(false);
    }
  };

  return (
    <div className="task">
      {editable ? (
        <input
          type="text"
          className="input"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
      ) : (
        <span
          style={{ textDecoration: task.completed ? "line-through" : "" }}
          onClick={() => completeTask(index)}
        >
          {task.title}
        </span>
      )}

      <div className="task-buttons">
        {editable ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={() => setEditable(true)} className="edit-btn">
            Edit
          </button>
        )}
        <button onClick={() => deleteTask(index)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}

function TaskForm({ addTask }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    addTask(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Add</button>
    </form>
  );
}

function App() {
  const [tasks, setTasks] = useState([
    { title: "Sample task 1", completed: false },
    { title: "Sample task 2", completed: false },
  ]);

  const addTask = (title) => {
    const newTasks = [...tasks, { title, completed: false }];
    setTasks(newTasks);
  };

  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const updateTask = (index, newTitle) => {
    const newTasks = [...tasks];
    newTasks[index].title = newTitle;
    setTasks(newTasks);
  };

  return (
    <div className="app">
      <h1>Task Management System</h1>
      <TaskForm addTask={addTask} />
      <div className="task-list">
        {tasks.map((task, index) => (
          <Task
            key={index}
            index={index}
            task={task}
            completeTask={completeTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
