const API_URL = "http://localhost:5000/api/tasks";

export const fetchTasks = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("failed to fetch task!");
  return await response.json();
};
