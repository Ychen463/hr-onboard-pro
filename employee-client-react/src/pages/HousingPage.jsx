/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Tabs, Tab, Box, Typography } from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import RoommateTable from '../components/HousingComonent/RoomMateTable.jsx';
import FacilityReportBoard from '../components/HousingComonent/FacilityReportBoard.jsx';

import { getHousing, selectorCurrentHouseData } from '../store/slices/housingSlice.js';

function HousingPageContainer() {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHousing());
  }, []);

  const housingData = useSelector(selectorCurrentHouseData);

  // const { address, residents } = housingData ?? {};
  const address = housingData?.address;
  const residents = housingData?.residents;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabStyle = (isSelected) => ({
    color: isSelected ? 'white' : 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
      color: 'white',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  });

  return (
    <Box sx={{ bgcolor: 'background.paper', width: '1024px', margin: '0 auto' }}>
      <Box>
        <Typography variant="h6" gutterBottom component="div" sx={{ pt: 1, textAlign: 'left' }}>
          Housing
        </Typography>
        <Typography sx={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon />
          {address}
        </Typography>
      </Box>

      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="HOUSING" {...a11yProps(0)} sx={tabStyle(value === 0)} />
          <Tab label="FACILITY REPORTS" {...a11yProps(1)} sx={tabStyle(value === 1)} />
        </Tabs>
      </AppBar>
      <Box sx={{ width: '1024px', minHeight: '800px' }}>
        <TabPanel value={value} index={0}>
          {residents?.length > 0 ? (
            <RoommateTable roommates={housingData.residents} />
          ) : (
            'No Roommate yet!'
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FacilityReportBoard />
        </TabPanel>
      </Box>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

export default HousingPageContainer;
