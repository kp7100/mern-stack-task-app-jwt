import axios from "axios";
const API = process.env.REACT_APP_API_URL || 'https://mern-stack-task-app-jwt.onrender.com';
console.log('API used at runtime ->', API);

// ensure axios sends cookies and uses the correct base URL
axios.defaults.withCredentials = true;
axios.defaults.baseURL = API;

export const callRegisterUserApi = async (formData) => {
  const response = await axios.post(
    `${API}/api/user/register`,
    formData,
    { withCredentials: true }
  );

  return response?.data;
};

export const callLoginUserApi = async (formData) => {
  const response = await axios.post(
    `${API}/api/user/login`,
    formData,
    { withCredentials: true }
  );

  return response?.data;
};

export const callUserAuthApi = async () => {
  const response = await axios.post(
    `${API}/api/user/auth`,
    {},
    { withCredentials: true }
  );

  console.log(response, "response");

  return response?.data;
};

export const callLogoutApi = async (req, res) => {
  const response = await axios.post(
    `${API}/api/user/logout`,
    {},
    { withCredentials: true }
  );

  return response?.data;
};

export const addNewTaskApi = async (formData) => {
  const response = await axios.post(
    `${API}/api/task/add-new-task`,
    formData
  );

  return response?.data;
};

export const getAllTasksApi = async (getCurrentUserId) => {
  const response = await axios.get(
    `${API}/api/task/get-all-tasks-by-userid/${getCurrentUserId}`
  );

  return response?.data;
};

export const updateTaskApi = async (formData) => {
  const response = await axios.put(
    `${API}/api/task/update-task`,
    formData
  );

  return response?.data;
};

export const deleteTaskApi = async (getCurrentTaskId) => {
  const response = await axios.delete(
    `${API}/api/task/delete-task/${getCurrentTaskId}`
  );

  return response?.data;
};
