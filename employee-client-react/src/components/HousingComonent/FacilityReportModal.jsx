/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

import {
  closeFacilityReportModal,
  selectIsFacilityReportModalOpen,
} from '../../store/slices/FacilityRportModalSlice.js';

import { createFacilityReport } from '../../store/slices/facilityReportSlice.js';

function FacilityReportModal() {
  const dispatch = useDispatch();
  const open = useSelector(selectIsFacilityReportModalOpen);

  const handleClose = () => {
    dispatch(closeFacilityReportModal());
  };
  const handleCreateReport = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title');
    const description = formData.get('description');

    dispatch(createFacilityReport({ title, description }));
    dispatch(closeFacilityReportModal());
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="facility-report-modal-title"
        aria-describedby="facility-report-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleCreateReport}>
          <Typography id="facility-report-modal-title" variant="h6" component="h2">
            Create A Facility Report
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            multiline
            rows={6}
            fullWidth
            variant="standard"
            placeholder="Please describe your facility problem"
            sx={{ mt: 2, mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none', // Disables the default focus outline
};
export default FacilityReportModal;
