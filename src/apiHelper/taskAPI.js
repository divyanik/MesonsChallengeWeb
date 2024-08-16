const BASE_URL = 'http://localhost:3000'; 

// Get all tasks
export const getTasks = async () => {
    console.log('taskAPI/getTasks:');
    const response = await fetch(`${BASE_URL}/getTasks`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    console.log('API response', response.json());
    return response.json();
};

// Get a single task
export const getTask = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch task');
    return response.json();
};

// Create a new task
export const createTask = async (task) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
};

// Update a task
export const updateTask = async (id, task) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
};

// Delete a task
export const deleteTask = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
};
