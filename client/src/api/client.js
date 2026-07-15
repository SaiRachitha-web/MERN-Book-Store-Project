import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({ baseURL: API_URL });

// Attach the admin token (if present) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const booksApi = {
  list: (params) => api.get("/books", { params }).then((res) => res.data),
  stats: () => api.get("/books/stats").then((res) => res.data),
  get: (id) => api.get(`/books/${id}`).then((res) => res.data),
  create: (data) => api.post("/books", data).then((res) => res.data),
  update: (id, data) => api.put(`/books/${id}`, data).then((res) => res.data),
  remove: (id) => api.delete(`/books/${id}`).then((res) => res.data),
};

export const authApi = {
  login: (data) => api.post("/auth/login", data).then((res) => res.data),
};
