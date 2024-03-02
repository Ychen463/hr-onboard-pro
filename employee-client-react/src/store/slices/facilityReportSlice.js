import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from "@reduxjs/toolkit";
import * as facilityReportApiService from "../../apiServices/facilityReport.js";
import { logout } from "./authSlice.js";

const initialState = {
    reports: [],
    isLoading: false,
    error: null,
};

// async thunk for facility reports
export const getFacilityReports = createAsyncThunk(
    "facilityReport/getFacilityReports",
    async (_, thunkAPI) => {
        try {
            const response = await facilityReportApiService.getFacilityReports();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.data.message);
        }
    }
)

export const createFacilityReport = createAsyncThunk(
    "facilityReport/createFacilityReport",
    async ({ title, description }, thunkAPI) => {
        try {
            const response = await facilityReportApiService.postCreateFacilityReport({ title, description });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.data.message);
        }
    }
)

export const closeFacilityReport = createAsyncThunk(
    "facilityReport/closeFacilityReport",
    async (facilityReportId, thunkAPI) => {
        try {
            const response = await facilityReportApiService.patchCloseFacilityReport(facilityReportId);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.data.message);
        }
    }
)

export const addComment = createAsyncThunk(
    "facilityReport/addComment",
    async ({ facilityReportId, description }, thunkAPI) => {
        try {
            const response = await facilityReportApiService.postAddComment({ facilityReportId, description });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.data.message);
        }
    }
)

export const editComment = createAsyncThunk(
    "facilityReport/editComment",
    async ({ facilityReportId, commentId, description }, thunkAPI) => {
        try {
            const response = await facilityReportApiService.patchEditComment({ facilityReportId, commentId, description });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.data.message);
        }
    }
)

export const facilityReportSlice = createSlice({
    name: "facilityReport",
    initialState,
    reducers: {
        // reducers for facility reports
    },
    extraReducers: (builder) => {
        builder
            // getFacilityReports
            .addCase(getFacilityReports.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getFacilityReports.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reports = action.payload.reportList;
            })
            .addCase(getFacilityReports.rejected, (state, action) => {
                state.isLoading = false;
                error = action.payload;
            })
            // createFacilityReport
            .addCase(createFacilityReport.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createFacilityReport.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reports.push(action.payload.report);
            })
            .addCase(createFacilityReport.rejected, (state, action) => {
                state.isLoading = false;
                error = action.payload;
            })
            // closeFacilityReport
            .addCase(closeFacilityReport.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(closeFacilityReport.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedReport = action.payload.updatedReport;
                const report = state.reports.find(report => (report._id === updatedReport._id));
                if (report) {
                    Object.assign(report, updatedReport);
                }
            })
            .addCase(closeFacilityReport.rejected, (state, action) => {
                state.isLoading = false;
                error = action.payload;
            })
            // addComment
            .addCase(addComment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedReport = action.payload.updatedReport;
                const report = state.reports.find(report => (report._id === updatedReport._id));
                if (report) {
                    Object.assign(report, updatedReport);
                }
            })
            .addCase(addComment.rejected, (state, action) => {
                state.isLoading = false;
                error = action.payload;
            })
            // editComment
            .addCase(editComment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editComment.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedReport = action.payload.updatedReport;
                const report = state.reports.find(report => (report._id === updatedReport._id));
                if (report) {
                    Object.assign(report, updatedReport);
                }
            })
            .addCase(editComment.rejected, (state, action) => {
                state.isLoading = false;
                error = action.payload;
            })
            // logout clean state
            .addCase(logout, () => initialState);
    },
});

export default facilityReportSlice.reducer;

// selectors
export const selectFacilityReportState = (state) => state.facilityReports;

// get facility reports by houseID
export const selectFacilityReportsByHouseId = createSelector(
    [selectFacilityReportState, (houseId) => houseId],
    (state, houseId) => state.reports.find(report => report.housing === houseId)
);

// get a facility report by facilityReportId
export const selectFacilityReportById = createSelector(
    [selectFacilityReportState, (facilityReportId) => facilityReportId],
    (state, facilityReportId) => state.reports.find(report => report._id === facilityReportId)
);