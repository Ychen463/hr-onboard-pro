import axiosInstance from '../interceptors/authInterceptor.js';

export const getVisaStatus = async (userAccountId) => axiosInstance.get(`/visa/${userAccountId}/currentStatus`);

export const postOptReceipt = async (docUrl) => axiosInstance.post('/visa/docs/optReceipt', {
  docUrl,
});

export const postOptEAD = async (docUrl) => axiosInstance.post('/visa/docs/optEAD', {
  docUrl,
});

export const posti983 = async (docUrl) => axiosInstance.post('/visa/docs/i983', {
  docUrl,
});

export const posti20 = async (docUrl) => axiosInstance.post('/visa/docs/i20', {
  docUrl,
});
