/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, List } from '@mui/material';
import FacilityReportCard from './FacilityReportCard.jsx';
import FacilityReportModal from './FacilityReportModal.jsx';

import { openFacilityReportModal } from '../../store/slices/FacilityRportModalSlice.js';
import {
  getFacilityReports,
  selectFacilityReportState,
} from '../../store/slices/facilityReportSlice.js';

function FacilityReportBoard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFacilityReports());
  }, []);

  const facilityReportData = useSelector(selectFacilityReportState);
  const facilityReports = facilityReportData?.reports;

  // Facility Madal will control through Redux
  const handleCreateFacilityReport = () => {
    dispatch(openFacilityReportModal());
  };
  return (
    <>
      <Button
        variant="contained"
        sx={{ float: 'left', mb: 2 }}
        onClick={handleCreateFacilityReport}
      >
        CREATE FACILITY REPORT
      </Button>
      <FacilityReportModal />
      <Box
        sx={{
          height: '800px',
          overflow: 'auto',
          width: '100%',
          bgcolor: 'background.paper',
        }}
      >
        <List>
          {facilityReports?.map((eachReport) => (
            <FacilityReportCard reportData={eachReport} key={eachReport.createdDatetime} />
          ))}
        </List>
      </Box>
    </>
  );
}

export default FacilityReportBoard;
