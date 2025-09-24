import axios from 'axios';
import { AUTH_URL } from '../../utils/urls';

const register = async (userData) => {
  const response = await axios.post(`${AUTH_URL}/register`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${AUTH_URL}/login`, userData);
  return response.data;
};

const logout = async () => {
  const response = await axios.post(`${AUTH_URL}/logout`);
  return response.data;
};

const getLoginStatus = async () => {
  const response = await axios.get(`${AUTH_URL}/isloggedin`);
  return response.data;
};

const getLoggedInUser = async () => {
  const response = await axios.get(`${AUTH_URL}/loggedinuser`);
  return response.data;
};

const updateUserProfile = async (formData) => {
  const response = await axios.put(`${AUTH_URL}/profile`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const getTotalIncomeAdmin = async () => {
  const response = await axios.get(`${AUTH_URL}/admin/income`);
  return response.data;
};

const getAllUsers = async () => {
  const response = await axios.get(`${AUTH_URL}`);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getLoggedInUser,
  updateUserProfile,
  getTotalIncomeAdmin,
  getAllUsers,
};

export default authService;
