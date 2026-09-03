import axios from 'axios';

// La URL del backend se obtiene desde el archivo .env
const API_URL = `${import.meta.env.VITE_API_URL}/api/v1`;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: envía automáticamente el JWT guardado en localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('voteToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});