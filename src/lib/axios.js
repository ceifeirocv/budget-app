import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const api = axios.create({
  baseURL: 'https://budget-api-nn6x.onrender.com',
});
