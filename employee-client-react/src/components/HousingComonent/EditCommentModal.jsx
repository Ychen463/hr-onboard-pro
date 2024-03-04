/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';

import {
  selectIsEditCommentModalOpen,
  selecteditModalPayload,
  closeEditCommentModal,
} from '../../store/slices/FacilityRportModalSlice';

import { editComment } from '../../store/slices/facilityReportSlice';

function EditCommentModal() {
  const dispatch = useDispatch();
  const open = useSelector(selectIsEditCommentModalOpen);
  const commentModalPayload = useSelector(selecteditModalPayload);
  const { commentId, reportId } = commentModalPayload;

  const handleSaveComment = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedComment = formData.get('comment');

    dispatch(
      editComment({ facilityReportId: reportId, commentId: commentId, description: updatedComment })
    );
    dispatch(closeEditCommentModal());
  };

  return (
    <div>
      <Dialog
        open={open}
        PaperProps={{
          sx: {
            width: '600px',
            height: '350px',
          },
        }}
      >
        <DialogTitle>EDIT Comment</DialogTitle>
        <Box component="form" onSubmit={handleSaveComment}>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              name="comment"
              label="Comment"
              type="text"
              variant="outlined"
              multiline
              rows={6}
              defaultValue={commentModalPayload.description}
              placeholder=""
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="primary">
              SAVE
            </Button>
            <Button
              onClick={() => dispatch(closeEditCommentModal())}
              variant="contained"
              color="error"
            >
              CANCEL
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default EditCommentModal;
