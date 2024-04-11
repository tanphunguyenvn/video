import axios from 'axios';
import { Config } from '../config/config';

export const getToken = () => localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

const restClient = axios.create({
  baseURL: Config.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': getAuthorizationHeader(),
  }
});

export default restClient;
