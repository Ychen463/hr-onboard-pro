/* eslint-disable react/prop-types */

import DoneIcon from '@mui/icons-material/Done';
import Box from '@mui/material/Box';
import { Chip } from '@mui/material';

function StatusIcon({ status }) {
  switch (status) {
    case 'Open':
      return <Chip label="Open" color="success" />;

    case 'InProgress':
      return <Chip label="In Progressss" color="primary" />;

    case 'Closed':
      return <Chip label="Done" color="warning" />;

    default:
      return <DoneIcon />;
  }
}

function StatusLabel({ status }) {
  return (
    <Box display="flex" alignItems="center">
      <StatusIcon status={status} />
    </Box>
  );
}

export default StatusLabel;
