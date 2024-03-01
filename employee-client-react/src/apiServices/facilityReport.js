import axiosInstance from '../interceptors/authInterceptor.js';

export const getFacilityReports = async () => axiosInstance.get(`/facilityReports/user`);

export const postCreateFacilityReport = async ({ title, description }) =>
    axiosInstance.post('/facilityReport', { title, description });

export const patchCloseFacilityReport = async (facilityReportId) =>
    axiosInstance.patch('/facilityReport', { facilityReportId });

export const postAddComment = async ({ facilityReportId, description }) =>
    axiosInstance.post('/facilityReport/comment', {
        facilityReportId,
        description,
    });

export const patchEditComment = async ({ facilityReportId, commentId, description }) =>
    axiosInstance.patch('/facilityReport/comment', {
        facilityReportId,
        commentId,
        description,
    });
