import React from 'react';
import { Link } from 'react-router-dom';

const Task = ({ task, onDelete }) => {
    return (
        <div>
            <h3>{task.name}</h3>
            <p>Status: {task.status}</p>
            <Link to={`/tasks/${task.id}`}>View Details</Link>
            <Link to={`/edit-task/${task.id}`}>Edit</Link>
            <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
    );
};

export default Task;
