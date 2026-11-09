import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function TaskForm({
  show,
  handleClose,
  addTask,
  editTask,
  taskToEdit,
}) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("To-Do");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setPriority(taskToEdit.priority);
      setStatus(taskToEdit.status || "To-Do");
    } else {
      setTitle("");
      setPriority("Medium");
      setStatus("To-Do");
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (taskToEdit) {
      editTask({ ...taskToEdit, title, priority, status });
    } else {
      addTask({ title, priority, status });
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{taskToEdit ? "Edit Task" : "Add New Task"}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Contoh: Belajar Pemrograman Web"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High (Merah)</option>
              <option value="Medium">Medium (Kuning)</option>
              <option value="Low">Low (Hijau)</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {taskToEdit ? "Save Changes" : "Add Task"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
