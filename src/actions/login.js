/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { redirect } from 'react-router-dom';
import jwt from 'jwt-decode';
import { toast } from 'react-toastify';

export const loginAction = async ({ request }) => {
  const data = await request.formData();
  const { accessToken } = Object.fromEntries(data);

  try {
    const response = await axios.post('http://localhost:4000/login', {
      accessToken,
    });
    const { token } = response.data;
    const user = jwt(token);
    await localStorage.setItem('token', JSON.stringify(token));
    await localStorage.setItem('user', JSON.stringify(user));
    toast.success(`Welcome ${user.name}`);
    return redirect('/');
  } catch (error) {
    throw new Error(error);
  }
};
