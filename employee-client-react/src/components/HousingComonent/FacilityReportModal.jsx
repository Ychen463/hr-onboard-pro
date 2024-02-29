/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  Modal, Box, Typography, TextField, Button,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none', // Disables the default focus outline
};

function FacilityReportModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Create Facility Report</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="facility-report-modal-title"
        aria-describedby="facility-report-modal-description"
      >
        <Box sx={style}>
          <Typography id="facility-report-modal-title" variant="h6" component="h2">
            Create A Facility Report
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            multiline
            rows={4}
            fullWidth
            variant="standard"
            placeholder="Please describe your facility problem"
            sx={{ mt: 2, mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
            <Button onClick={handleClose} variant="contained">
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default FacilityReportModal;
