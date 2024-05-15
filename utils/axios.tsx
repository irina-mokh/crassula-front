import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
      'Accept': 'application/json, text/plain, */*',
  },
});