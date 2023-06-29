import axios from 'axios';
import useSWR from 'swr';

// eslint-disable-next-line import/prefer-default-export
const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BUDGET_API_URL,
});

// eslint-disable-next-line import/prefer-default-export
export function useFetch(url) {
  // eslint-disable-next-line no-shadow
  const { data, error } = useSWR(url, async (url) => {
    const token = await localStorage.getItem('token');
    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  });

  return { data, error };
}
