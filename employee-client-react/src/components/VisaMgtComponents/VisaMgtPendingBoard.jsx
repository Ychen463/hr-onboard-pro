import React from 'react';
import FileListTable from '../FileListTable';

import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectorVisa } from '../../store/slices/visaSlice';


export const VisaMgtPendingBoard = () => {
  const visaData = useSelector(selectorVisa);
  const files = [{ url: visaData?.docUrl }];
  // const files = docUrlExample;
  return (
    <>
      <div style={{ marginTop: '100px' }}>
        <Typography>{`Waiting for HR to approve your ${message} `}</Typography>
      </div>
      <FileListTable files={files} />
    </>
  );
};
