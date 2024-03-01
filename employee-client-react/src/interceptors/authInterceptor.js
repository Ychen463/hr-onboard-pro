import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

// for intercepting requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");

    if (
      token 
      &&
      !config.url.endsWith("/login") &&
      !config.url.endsWith("/register")
    ) {

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// for intercepting responses
axiosInstance.interceptors.response.use(
  (response) =>
    // Your response handling logic
    response,
  (error) => {
    // Logout user on token expiration
    if (error.response.status === 401) {
      // Dispatch logout action or remove token
      localStorage.removeItem("jwtToken");
      // Redirect to login page or handle session expiration
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
