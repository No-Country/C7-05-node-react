/* eslint-disable camelcase */
import { ApiCashier } from '@/models/user.type';
import { authAdapter } from '../adapter/auth.adapter';
import axios from 'axios';
import { AUTH_URL } from '@/utils/config';

export const authService = async (userName: string, password: string) => {
  try {
    const { data } = await axios.post<ApiCashier>(`${AUTH_URL}`, {
      user_name: userName,
      user_password: password,
    });

    if (data.success) {
      return authAdapter(data); // EL ADAPTER transforma los datos que recibe del backend en un objeto manipulable por el front */
    }
    return null;
  } catch (error) {
    if (typeof error === 'string') {
      error.toUpperCase(); // works, e narrowed to string
    } else if (error instanceof Error) {
      error.message; // works, e narrowed to Error
    }
  }
};
