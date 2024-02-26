import axiosInstance from '../interceptors/authInterceptor.js';

export const getOnboarding = async (userAccountId) => axiosInstance.get(`/onboarding/${userAccountId}`);

export const postOnboarding = async (onboardingData) => axiosInstance.post('/onboarding', onboardingData);
