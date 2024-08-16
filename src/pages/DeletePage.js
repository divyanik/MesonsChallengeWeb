import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/DeletePage.css';

const DeletePage = () => {
  const { taskId } = useParams();
  const BASE_URL = "http://localhost:4000/api";
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`${BASE_URL}/getTask/${taskId}`);
        if (!response.ok) {
          throw new Error('Task not found');
        }
        const data = await response.json();
        setTask(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/delete/${taskId}`, {
        method: 'DELETE',
      });   
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      alert("Record has been deleted!")
      navigate('/'); // Redirect to the homepage or task list after deletion
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    navigate('/'); // Redirect to the homepage or task list if cancellation
  };

  if (loading) return <p className="loading-message">Loading...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="delete-page-container">
      {task ? (
        <div>
          <h1>Confirm Deletion</h1>
          <p><strong>Task ID:</strong> {task.taskId}</p>
          <p><strong>Task Name:</strong> {task.taskName}</p>
          <p><strong>Task Description:</strong> {task.taskDescription}</p>
          <p><strong>Task Status:</strong> {task.taskStatus}</p>
          <p><strong>Created By:</strong> {task.createdBy}</p>
          <p><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</p>
          <button onClick={handleDelete} className="delete-button">Delete</button>
          <button onClick={handleCancel} className="cancel-button">Cancel</button>
        </div>
      ) : (
        <p>No task found</p>
      )}
    </div>
  );
};

export default DeletePage;
