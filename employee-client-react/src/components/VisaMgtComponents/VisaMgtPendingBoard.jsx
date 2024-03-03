import React from 'react';
import FileListTable from '../FileListTable';

export const VisaMgtPendingBoard = ({ message, files }) => {
  return (
    <>
      <div style={{ marginTop: '100px' }}>{`Waiting for HR to approve your ${message} `}</div>
      <FileListTable files={files} />
    </>
  );
};
