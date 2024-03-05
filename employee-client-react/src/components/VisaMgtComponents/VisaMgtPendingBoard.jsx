import React from 'react';
import FileListTable from '../FileListTable';
import { Typography } from '@mui/material';

export const VisaMgtPendingBoard = ({ message, files }) => {
  return (
    <>
      <div style={{ marginTop: '100px' }}>
        <Typography>{`Waiting for HR to approve your ${message} `}</Typography>
      </div>
      <FileListTable files={files} />
    </>
  );
};
