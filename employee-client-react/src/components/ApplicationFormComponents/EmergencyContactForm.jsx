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
      <Grid container spacing={10} sx={{ wnameth: '80%', margin: '0 auto' }}>
        <Grid container spacing={2} style={{ width: '90%', margin: '24px auto' }}>
          <Grid item xs={10} md={3.5}>
            <TextField
              label="First Name"
              name="firstName"
              type="text"
              value={contact.firstName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={10} md={3}>
            <TextField
              label="Middle Name"
              name="middleName"
              type="text"
              value={contact.middleName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={10} md={3.5}>
            <TextField
              label="Last Name"
              name="lastName"
              type="text"
              value={contact.lastName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={10} md={5}>
            <TextField
              label="Phone"
              name="phone"
              type="tel"
              value={contact.phone}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={10} md={5}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={contact.email}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              label="Relationship"
              name="relationship"
              value={contact.relationship}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={10} align="center">
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
      </Grid>
    </div>
  );
};

export default EmergencyContactForm;
