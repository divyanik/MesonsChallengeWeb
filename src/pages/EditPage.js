import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EditPage.css';

const EditPage = () => {
  const { taskId } = useParams();
  const BASE_URL = "http://localhost:4000/api";
  const navigate = useNavigate();

  const [task, setTask] = useState({
    taskId: '',
    taskName: '',
    taskDescription: '',
    taskStatus: '',
    createdBy: '',
    modifiedAt: ''
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      task.modifiedAt =  new Date();
      const response = await fetch(`${BASE_URL}/update/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      alert("Record has been updated successfuly!")
      navigate('/'); // Redirect after update
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p className="loading-message">Loading...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="edit-page-container">
      <h1>Edit Task</h1>
      <form onSubmit={handleUpdate}>
        <label>
          Task Name:
          <input
            type="text"
            name="taskName"
            value={task.taskName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Task Description:
          <textarea
            name="taskDescription"
            value={task.taskDescription}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Task Status:
          <select
            name="taskStatus"
            value={task.taskStatus}
            onChange={handleChange}
            required
          >
            <option value="Created">Created</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <label>
          Created By:
          <input
            type="text"
            name="createdBy"
            value={task.createdBy}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
}

export default EditPage;
