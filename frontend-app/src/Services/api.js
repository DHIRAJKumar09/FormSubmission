import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // Replace with your backend URL

// Create a new user
export const createUser = async (formData) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  return axios.post(API_URL, formData, config);
};

// Get all users
export const getUsers = async () => {
  return axios.get(API_URL);
};
