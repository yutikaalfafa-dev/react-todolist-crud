import React from "react";
import { Table, Button, Badge } from "react-bootstrap";

export default function TaskList({ tasks, deleteTask, showEditForm }) {
  // Fungsi untuk menentukan warna badge berdasarkan prioritas
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return <Badge bg="danger">High</Badge>;
      case "Medium":
        return (
          <Badge bg="warning" text="dark">
            Medium
          </Badge>
        );
      case "Low":
        return <Badge bg="success">Low</Badge>;
      default:
        return <Badge bg="secondary">{priority}</Badge>;
    }
  };

  return (
    <div className="table-responsive shadow-sm p-3 mb-5 bg-white rounded">
      <Table hover verticalAlign="middle" className="align-middle">
        <thead>
          <tr>
            <th>Task</th>
            <th>Priority</th>
            <th>Status</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-muted">
                Belum ada tugas. Silakan klik tombol "+ Add Task".
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                <td className="fw-semibold">{task.title}</td>
                <td>{getPriorityBadge(task.priority)}</td>
                <td>
                  <span className="text-muted small">
                    {task.status || "To-Do"}
                  </span>
                </td>
                <td className="text-end">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => showEditForm(task)}
                  >
                    ✏️ Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                  >
                    🗑️ Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
