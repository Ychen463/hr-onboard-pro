import axiosInstance from "../interceptors/authInterceptor.js";

export const getUserProfile = async () => axiosInstance.get("/profile");

export const updateUserProfile = async (newProfile) =>
  axiosInstance.patch("/profile", { newProfile });
