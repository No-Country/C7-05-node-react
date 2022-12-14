import { store } from '@/redux/store';

const baseUrl = 'http://localhost:9000';

const API_URL = process.env.NODE_ENV === 'production' ? import.meta.env.VITE_API_URL : baseUrl + '/api';
const LOGIN_URL = process.env.NODE_ENV === 'production' ? import.meta.env.VITE_API_URL + '/auth/login' : baseUrl + '/api/auth/login';
const token = store.getState().Cashier.cashierJwt || localStorage.getItem('cashierJwt');

const CONFIG_TOKEN = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export { API_URL, LOGIN_URL, CONFIG_TOKEN };
