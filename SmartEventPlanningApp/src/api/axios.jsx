import axios from "axios";
import qs from "qs";
import { API_BASE } from "./config";

const instance = axios.create({
  baseURL: `${API_BASE}/api/`,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
  withCredentials: true,
});

// 🧠 Her istekten önce token varsa header'a ekle
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
