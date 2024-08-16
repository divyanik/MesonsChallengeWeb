import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../apiHelper/taskAPI';
import Task from '../componenets/Task';

const TaskList = ({ history }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks();
                console.log('TaskListScreen:', data);
                setTasks(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Task List</h2>
            {tasks.map(task => (
                <Task key={task.id} task={task} onDelete={handleDelete} />
            ))}
            <button onClick={() => history.push('/add-task')}>Add New Task</button>
        </div>
    );
};

export default TaskList;
