import { Typography, Grid } from '@mui/material';
import EmergencyContactList from './EmergencyContactList.jsx';
import EmergencyContactForm from './EmergencyContactForm.jsx';

function EmergencyContact({ readOnly, emergencyContacts, setEmergencyContacts }) {
  return (
    <div style={{ marginTop: '50px' }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        textAlign="left"
        style={{ marginLeft: '8px' }}
      >
        Emergency Contact Information
      </Typography>
      <Grid container spacing={10} sx={{ wnameth: '80%', margin: '0 auto' }}>
        <Grid item xs={12}>
          <EmergencyContactList
            readOnly={readOnly}
            contacts={emergencyContacts}
            setEmergencyContacts={setEmergencyContacts}
          />
        </Grid>
        {!readOnly && (
          <EmergencyContactForm
            readOnly
            contacts={emergencyContacts}
            setEmergencyContacts={setEmergencyContacts}
          />
        )}
      </Grid>
    </div>
  );
}

export default EmergencyContact;
