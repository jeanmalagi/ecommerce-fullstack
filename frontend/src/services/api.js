import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

//
// ✅ Interceptor JWT
//

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // ✅ Envia token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
