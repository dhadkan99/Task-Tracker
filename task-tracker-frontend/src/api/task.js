const API_URL = 'http://localhost:5000/api/tasks';
export const fetchTasks = async () => {
const response = await fetch(API_URL);
return await response.json();
};
//add tasks
export const addTask = async (text) => {
const response = await fetch(API_URL, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ text })
});
return await response.json();
};
//delete tasks
export const deleteTask = async (id) => {
const response = await fetch(`${API_URL}/${id}`, {
method: 'DELETE'
});
return await response.json();
};