import axiosInstance from "../interceptors/authInterceptor.js";

export const getOnboarding = async (userAccountId) => axiosInstance.get(`/onboarding/${userAccountId}`);

export const postOnboarding = async (onboardingData) =>
  axiosInstance.post('/onboarding', onboardingData);

export const getAWSS3PresignedUrl = async ({ fileType }) => axiosInstance.get(`/awss3/generatePresignedUrl?fileType=${fileType}`);