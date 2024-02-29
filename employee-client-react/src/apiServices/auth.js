import axiosInstance from "../interceptors/authInterceptor.js";

export const getRegistrationTokenUsage = async (token) =>
  axiosInstance.get(`/registrationToken/${token}`);

export const invalidateRegistrationToken = async (token) =>
  axiosInstance.patch(`/registrationToken/${token}`);

export const register = async ({
  username,
  password,
  email,
  registrationToken,
}) =>
  axiosInstance.post(
    "/register",
    { username, password, email },
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
