import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const EmergencyContactList = ({ readOnly, contacts, setEmergencyContacts }) => {
  const deleteEmergencyContact = (index) => {
    const newContacts = contacts.filter((_, i) => i !== index);
    setEmergencyContacts(newContacts);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {!readOnly && <TableCell>Remove</TableCell>}
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Relationship</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {!readOnly && (
                <TableCell component="th" scope="row">
                  <IconButton edge="end" onClick={() => deleteEmergencyContact(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              )}
              <TableCell>{`${contact.firstName} ${contact.middleName} ${contact.lastName}`}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.relationship}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default EmergencyContactList;
