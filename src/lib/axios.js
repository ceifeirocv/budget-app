import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BUDGET_API_URL,
});
