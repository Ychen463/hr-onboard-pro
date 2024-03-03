// modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFacilityReportModalOpen: false,
  isAddCommentModalOpen: false,
  isEditCommentModalOpen: false,
  editModalContent: '',
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
    openAddCommentModal: (state) => {
      state.isAddCommentModalOpen = true;
    },
    closeAddCommentModal: (state) => {
      state.isAddCommentModalOpen = false;
    },
    openEditCommentModal: (state, action) => {
      state.isEditCommentModalOpen = true;
      state.editModalContent = action.payload; // Set editModalContent from payload
    },
    closeEditCommentModal: (state) => {
      state.isEditCommentModalOpen = false;
      state.editModalContent = ''; // Reset editModalContent when modal is closed
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

export const selectEditModalContent = (state) => state.modal.editModalContent;

export const selectIsFacilityReportModalOpen = (state) => state.modal.isFacilityReportModalOpen;
export const selectisAddCommentModalOpen = (state) => state.modal.isAddCommentModalOpen;
export const selectIsEditCommentModalOpen = (state) => state.modal.isEditCommentModalOpen;

export default modalSlice.reducer;
