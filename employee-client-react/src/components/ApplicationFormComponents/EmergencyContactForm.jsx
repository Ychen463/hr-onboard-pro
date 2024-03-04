import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import InputUnit from './InputUnit.jsx';

const EmergencyContactForm = ({ readOnly, contacts, setEmergencyContacts }) => {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    email: '',
    relationship: '',
  });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    if (
      contact.firstName === '' ||
      contact.lastName === '' ||
      contact.phone === '' ||
      contact.email === ''
    ) {
      return;
    }
    onAddContact(contact);
    setContact({
      firstName: '',
      lastName: '',
      middleName: '',
      phone: '',
      email: '',
      relationship: '',
    });
  };

  const onAddContact = (contact) => {
    setEmergencyContacts([...contacts, contact]);
  };

  return (
    <div>
      <Grid container spacing={2} style={{ marginTop: '12px' }}>
        <Grid item xs={10} md={4}>
          <TextField
            label="First Name"
            name="firstName"
            type="text"
            value={contact.firstName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Middle Name"
            name="middleName"
            type="text"
            value={contact.middleName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Last Name"
            name="lastName"
            type="text"
            value={contact.lastName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Phone"
            name="phone"
            type="tel"
            value={contact.phone}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={contact.email}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Relationship"
            name="relationship"
            value={contact.relationship}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            type="button"
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleAddClick}
            disabled={
              contact.firstName === '' ||
              contact.lastName === '' ||
              contact.phone === '' ||
              contact.email === ''
            }
          >
            Add Contact
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmergencyContactForm;
