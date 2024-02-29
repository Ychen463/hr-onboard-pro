/* eslint-disable import/prefer-default-export */
import axiosInstance from "../interceptors/authInterceptor.js";

export const getHousing = async () => axiosInstance.get("/housing/user");
