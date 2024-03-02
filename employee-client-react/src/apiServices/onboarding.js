import axiosInstance from "../interceptors/authInterceptor.js";

export const getOnboarding = async (userAccountId) => {
  console.log("getOnboarding")
  return axiosInstance.get(`/onboarding/${userAccountId}`);
}

export const postOnboarding = async (onboardingData) =>
  axiosInstance.post("/onboarding", onboardingData);
