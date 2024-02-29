/* eslint-disable react/prop-types */

import DoneIcon from "@mui/icons-material/Done";
import Box from "@mui/material/Box";
import { Chip } from "@mui/material";

function StatusIcon({ status }) {
  switch (status) {
    case "open":
      return <Chip label="Open" color="success" />;

    case "inprogress":
      return <Chip label="In Progressss" color="primary" />;

    case "closed":
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
