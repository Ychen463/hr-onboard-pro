// modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFacilityReportModalOpen: false,
  isAddCommentModalOpen: false,
  isEditCommentModalOpen: false,
  editModalPayload: '',
  addCommentModalId: null, // New state to store the _id for Add Comment modal
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openFacilityReportModal: (state) => {
      state.isFacilityReportModalOpen = true;
    },
    closeFacilityReportModal: (state) => {
      state.isFacilityReportModalOpen = false;
    },
    openAddCommentModal: (state, action) => {
      state.isAddCommentModalOpen = true;
      state.addCommentModalId = action.payload; // Set addCommentModalId from payload
    },
    closeAddCommentModal: (state) => {
      state.isAddCommentModalOpen = false;
      state.addCommentModalId = null; // Reset addCommentModalId when modal is closed
    },
    openEditCommentModal: (state, action) => {
      state.isEditCommentModalOpen = true;
      state.editModalPayload = action.payload; // Set editModalPayload from payload
    },
    closeEditCommentModal: (state) => {
      state.isEditCommentModalOpen = false;
      state.editModalPayload = ''; // Reset editModalPayload when modal is closed
    },
  },
});

export const {
  openFacilityReportModal,
  closeFacilityReportModal,
  openAddCommentModal,
  closeAddCommentModal,
  openEditCommentModal,
  closeEditCommentModal,
} = modalSlice.actions;

export const selecteditModalPayload = (state) => state.modal.editModalPayload;
export const selectAddCommentModalId = (state) => state.modal.addCommentModalId; // Selector for Add Comment modal _id

export const selectIsFacilityReportModalOpen = (state) => state.modal.isFacilityReportModalOpen;
export const selectisAddCommentModalOpen = (state) => state.modal.isAddCommentModalOpen;
export const selectIsEditCommentModalOpen = (state) => state.modal.isEditCommentModalOpen;

export default modalSlice.reducer;
