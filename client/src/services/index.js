import axios from "axios";

export const callRegisterUserApi = async (formData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/user/register`,
    formData,
    { withCredentials: true }
  );

  return response?.data;
};

export const callLoginUserApi = async (formData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/user/login`,
    formData,
    { withCredentials: true }
  );

  return response?.data;
};

export const callUserAuthApi = async () => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/user/auth`,
    {},
    { withCredentials: true }
  );

  console.log(response, "response");

  return response?.data;
};

export const callLogoutApi = async (req, res) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/user/logout`,
    {},
    { withCredentials: true }
  );

  return response?.data;
};

export const addNewTaskApi = async (formData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/task/add-new-task`,
    formData
  );

  return response?.data;
};

export const getAllTasksApi = async (getCurrentUserId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/task/get-all-tasks-by-userid/${getCurrentUserId}`
  );

  return response?.data;
};

export const updateTaskApi = async (formData) => {
  const response = await axios.put(
    `${process.env.REACT_APP_API_URL}/api/task/update-task`,
    formData
  );

  return response?.data;
};

export const deleteTaskApi = async (getCurrentTaskId) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_API_URL}/api/task/delete-task/${getCurrentTaskId}`
  );

  return response?.data;
};
