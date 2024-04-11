import axios from 'axios';

export const getToken = () => localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

const restClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': getAuthorizationHeader(),
  }
});

export default restClient;
