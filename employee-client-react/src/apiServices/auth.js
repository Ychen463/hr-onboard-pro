import axios from 'axios';

const API_URL = 'https://localhost:3000/api';

export const getRegistrationTokenUsage = async (token) => axios.get(`${API_URL}/registrationToken/${token}`);

export const invalidateRegistrationToken = async (token) => axios.patch(`${API_URL}/registrationToken/${token}`);

export const register = async ({
  username, password, email, token,
}) => axios.post(`${API_URL}/register`, { username, password, email }, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const login = async ({ username, password }) => axios.post(`${API_URL}/login`, { username, password });

export const getJWTtokenValidation = async (jwtToken) => axios.get(`${API_URL}/session/validate`, {
  headers: {
    token: `Bearer ${jwtToken}`,
  },
});
// Add more auth-related API calls here
