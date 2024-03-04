import { Typography, Grid } from '@mui/material';
import EmergencyContactList from './EmergencyContactList.jsx';
import EmergencyContactForm from './EmergencyContactForm.jsx';

function EmergencyContact({ readOnly, emergencyContacts, setEmergencyContacts }) {
  return (
    <div>
      <Typography variant="h6" style={{ marginBottom: '12px' }}>
        Emergency Contact Information
      </Typography>

      <Grid container spacing={2}>
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
