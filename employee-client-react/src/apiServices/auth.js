import axiosInstance from "../interceptors/authInterceptor.js";
import axios from 'axios';

const base_url_reg = 'http://localhost:3000/api';

export const getRegistrationTokenUsage = async (token) =>
  axios.get(`${base_url_reg}/registrationToken/${token}`);

export const invalidateRegistrationToken = async (token) =>
  axios.patch(`${base_url_reg}/registrationToken/${token}`);

export const register = async ({
  username,
  password,
  registrationToken,
}) =>
  axios.post(
    `${base_url_reg}/register`,
    { username, password },
    {
      headers: {
        Authorization: `Bearer ${registrationToken}`,
      },
    },
  );

export const login = async ({ username, password }) =>
  axiosInstance.post("/login", { username, password });

export const getJWTtokenValidation = async () =>
  axiosInstance.get("/session/validate");
// Add more auth-related API calls here
