import React, { useEffect, useState } from 'react';
import '../styles/HomePage.css';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [apiResponse, setApiResponse] = useState([]);
  const BASE_URL = "http://localhost:4000/api";
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching data from:", `${BASE_URL}/getTasks`);
    
    fetch(`${BASE_URL}/getTasks`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setApiResponse(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  useEffect(() => {
    console.log('Updated apiResponse:', apiResponse);
  }, [apiResponse]);

  const handleCreate = () => {
    navigate('/create-page');
  };

  const handleEdit = (taskId) => {
    navigate(`/edit-page/${taskId}`);
  };

  const handleDelete = (taskId) => {
    navigate(`/delete-page/${taskId}`);
  };

  const handleDetails = (taskId) => {
    navigate(`/details-page/${taskId}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Task Manager</h1>
        <h2>List of Tasks</h2>
        <button className="add-task-button" onClick={handleCreate}>Add New Task</button>
        <table>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Status</th>
              <th>Created By</th>
              <th>Created At</th>
              <th>Modified At</th>
              <th>Actions</th> {/* Added column for action buttons */}
            </tr>
          </thead>
          <tbody>
            {apiResponse.map((task) => (
              <tr key={task._id}>
                <td>{task.taskName}</td>
                <td>{task.taskStatus}</td>
                <td>{task.createdBy}</td>
                <td>{new Date(task.createdAt).toLocaleString()}</td>
                <td>{new Date(task.modifiedAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleEdit(task._id)}>Edit</button>
                  <button onClick={() => handleDelete(task._id)}>Delete</button>
                  <button onClick={() => handleDetails(task._id)}>Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default Home;
