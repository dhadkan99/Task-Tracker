const API_URL = "http://localhost:5000/api/tasks";
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchTasks = async () => {
  const response = await fetch(API_URL, {
    headers: { ...getAuthHeaders() },
  });
  return await response.json();
};

export const addTask = async (task, dueDate) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify({ task, dueDate }),
  });
  return await response.json();
};

export const updateTask = async (id, updates) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(updates),
  });
  return await response.json();
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() },
  });
  return await response.json();
};
