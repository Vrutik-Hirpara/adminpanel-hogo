

import axios from "axios";

const api = axios.create({
  // baseURL: "https://hogofilm.pythonanywhere.com/",
  // baseURL: "https://apidata.hogoautofilms.in/",
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
/* Optional: Auth token auto attach */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
