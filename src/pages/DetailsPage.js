import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/DetailsPage.css';

const DetailsPage = () => {
  const { taskId } = useParams();
  const BASE_URL = "http://localhost:4000/api";
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p className="loading-message">Loading...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="details-page-container">
      {task ? (
        <div>
          <h1>Task Details</h1>
          <p><strong>Task ID:</strong> {task.taskId}</p>
          <p><strong>Task Name:</strong> {task.taskName}</p>
          <p><strong>Task Description:</strong> {task.taskDescription}</p>
          <p><strong>Task Status:</strong> {task.taskStatus}</p>
          <p><strong>Created By:</strong> {task.createdBy}</p>
          <p><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</p>
        </div>
      ) : (
        <p>No task found</p>
      )}
    </div>
  );
};

export default DetailsPage;
