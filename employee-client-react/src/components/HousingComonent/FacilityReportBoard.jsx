/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { Button, Box, List } from '@mui/material';
import FacilityReportCard from './FacilityReportCard.jsx';
import FacilityReportModal from './FacilityReportModal.jsx';

import { openFacilityReportModal } from '../../store/slices/FacilityRportModalSlice.js';

function FacilityReportBoard({ facilityReportData }) {
  const dispatch = useDispatch();
  console.log('facilityData', facilityReportData);

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
          {facilityReportData.map((eachReport) => (
            <FacilityReportCard reportData={eachReport} key={eachReport.createdDatetime} />
          ))}
        </List>
      </Box>
    </>
  );
}

export default FacilityReportBoard;
