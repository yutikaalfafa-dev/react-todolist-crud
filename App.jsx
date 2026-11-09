import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Go to gym", priority: "High", status: "To-Do" },
    { id: 2, title: "Read a book", priority: "Low", status: "Done" },
    { id: 3, title: "Go to market", priority: "Medium", status: "In Progress" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleShowForm = () => setShowForm(true);

  const handleCloseForm = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };

  // CREATE: Menambah Task baru
  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  // UPDATE: Mengubah Task yang ada
  const editTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  // DELETE: Menghapus Task berdasarkan ID
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Membuka form dalam mode Edit
  const showEditForm = (task) => {
    setTaskToEdit(task);
    handleShowForm();
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Task List</h2>
        <Button variant="primary" onClick={handleShowForm}>
          + Add Task
        </Button>
      </div>

      <div className="mt-4">
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          showEditForm={showEditForm}
        />
        <TaskForm
          show={showForm}
          handleClose={handleCloseForm}
          addTask={addTask}
          editTask={editTask}
          taskToEdit={taskToEdit}
        />
      </div>
    </Container>
  );
}

export default App;
