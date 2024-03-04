import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Box,
} from '@mui/material';

function RoommateTable({ roommates }) {
  // Replace this with your actual data fetching logic
  console.log('in table', roommates);
  return (
    <Box>
      <Typography variant="h6" gutterBottom component="div" sx={{ p: 2, textAlign: 'left' }}>
        Roommates
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: 1024, margin: 'auto', mt: 4 }}>
        <Table aria-label="roomMateTable">
          <TableHead>
            <TableRow>
              <TableCell> Full Name</TableCell>
              <TableCell align="left">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roommates?.map((roommate) => (
              <TableRow key={roommate.phone}>
                <TableCell component="th" scope="row">
                  {/* <Avatar alt={roommate.name} src={roommate.avatar} sx={{ mr: 2, display: 'inline-flex', verticalAlign: 'middle' }} /> */}
                  {`${roommate.userFirstName} ${roommate.userLastName}`}
                </TableCell>
                <TableCell align="left">{roommate.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default RoommateTable;
