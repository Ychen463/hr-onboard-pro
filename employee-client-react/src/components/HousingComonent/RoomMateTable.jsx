import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Typography,
} from '@mui/material';

function RoommateTable({ roommates }) {
  // Replace this with your actual data fetching logic

  return (
    <>
      <Typography variant="h6" gutterBottom component="div" sx={{ p: 2, textAlign: 'left' }}>
        Roommates
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: 1024, margin: 'auto', mt: 4 }}>
        <Table aria-label="roomMateTable">
          <TableHead>
            <TableRow>
              <TableCell> Name</TableCell>
              <TableCell align="left">Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roommates.map((roommate) => (
              <TableRow key={roommate.name}>
                <TableCell component="th" scope="row">
                  {/* <Avatar alt={roommate.name} src={roommate.avatar} sx={{ mr: 2, display: 'inline-flex', verticalAlign: 'middle' }} /> */}
                  {roommate.name}
                </TableCell>
                <TableCell align="left">{roommate.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default RoommateTable;
