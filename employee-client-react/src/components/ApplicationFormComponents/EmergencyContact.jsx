/* eslint-disable react/prop-types */
import { Typography, Grid } from "@mui/material";
import { useState } from "react";
import InputUnit from "./InputUnit.jsx";

function EmergencyContact({ readOnly }) {
  // eslint-disable-next-line no-unused-vars
  const [emergencyContact, setEmergencyContact] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "",
    email: "",
    relationship: "",
  });

  return (
    <Typography style={{ marginTop: "50px" }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        textAlign="left"
        style={{ marginLeft: "8px" }}
      >
        {" "}
        Emergency Contact Information
      </Typography>
      <Grid container spacing={10} sx={{ wnameth: "80%", margin: "0 auto" }}>
        <Grid item xs={6}>
          <InputUnit
            name="emergencyContactFirstName"
            value={emergencyContact.firstName}
            label="First Name"
            type="text"
            placeholder="John"
            required
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={6}>
          <InputUnit
            name="emergencyContactLastName"
            value={emergencyContact.lastName}
            label="Last Name"
            type="text"
            placeholder="Doe"
            required
            disabled={readOnly}
          />
        </Grid>

        <Grid item xs={6}>
          <InputUnit
            name="emergencyContactMiddleName"
            value={emergencyContact.middleName}
            label="Middle Name"
            type="text"
            placeholder="Tommy"
            disabled={readOnly}
          />
        </Grid>

        <Grid item xs={6}>
          <InputUnit
            name="emergencyContactPhoneNumber"
            required
            value={emergencyContact.phone}
            label="Emergency Contact Phone Number"
            type="text"
            placeholder="(666) 666-6666"
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={6}>
          <InputUnit
            name="emergencyContactEmail"
            required
            value={emergencyContact.email}
            label="Emergency Contact Email"
            type="email"
            placeholder="sampleemail@gmail.com"
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={6}>
          <InputUnit
            name="emergencyContactRelationship"
            required
            value={emergencyContact.email}
            label="Emergency Contact Relationship"
            type="text"
            placeholder="Friend"
            disabled={readOnly}
          />
        </Grid>
      </Grid>
    </Typography>
  );
}

export default EmergencyContact;
