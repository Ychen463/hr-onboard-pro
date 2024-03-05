import React from 'react';
import FileListTable from '../FileListTable';
import { useDispatch, useSelector } from 'react-redux';
import { selectorVisa } from '../../store/slices/visaSlice';

export const VisaMgtPendingBoard = () => {
  const visaData = useSelector(selectorVisa);
  const files = [{ url: visaData.docUrl }];
  // const files = docUrlExample;
  return (
    <>
      <div
        style={{ marginTop: '100px' }}
      >{`Waiting for HR to approve your ${visaData.currentStep} `}</div>
      <FileListTable files={files} example={false} />
    </>
  );
};
