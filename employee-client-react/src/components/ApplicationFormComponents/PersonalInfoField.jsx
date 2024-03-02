import { Typography, Grid } from "@mui/material";

import { useState } from "react";
import InputUnit from "./InputUnit.jsx";

// eslint-disable-next-line react/prop-types
function PersonalInfoField({ readOnly }) {
  // eslint-disable-next-line no-unused-vars
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    preferredName: "",
    profilePictureUrl: "",
  });
  const ssn = "";
  const dateOfBirth = "";
  const gender = "";

  const genderOptions = ["Male", "Female", "I do not wish to answer"];
  const handleSubmit = (event) => {
    const { name, value } = event.target;
    console.log("user's gender", name, value);
  };

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
        Personal Information
      </Typography>
      <Grid container spacing={10} sx={{ wnameth: "80%", margin: "0 auto" }}>
        <Grid item xs={6}>
          <InputUnit
            name="personalFirstName"
            value={personalInfo.firstName}
            label="First Name"
            type="text"
            placeholder="John"
            required
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={6}>
          <InputUnit
            name="personalLastName"
            value={personalInfo.lastName}
            label="Last Name"
            type="text"
            placeholder="Doe"
            required
            disabled={readOnly}
          />
        </Grid>

        <Grid item xs={6}>
          <InputUnit
            name="personalMiddleName"
            value={personalInfo.middleName}
            label="Middle Name"
            type="text"
            placeholder="Tommy"
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={6}>
          <InputUnit
            name="personalPreferredName"
            value={personalInfo.preferredName}
            label="Preferred Name"
            type="text"
            placeholder="Johnny"
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={6}>
          <InputUnit
            name="ssn"
            required
            value={ssn}
            label="SSN Number"
            type="text"
            placeholder="xxx-xx-xxxx"
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={6}>
          <InputUnit
            name="dateOfBirth"
            value={dateOfBirth}
            label="Date Of Birth"
            type="date"
            required
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={6}>
          <InputUnit
            onChange={handleSubmit}
            name="gender"
            value={gender}
            label="Gender"
            type="dropdown"
            options={genderOptions}
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <InputUnit
            name="personalProfilePictureUrl"
            value={personalInfo.preferredName}
            label="Upload Profile Picture"
            type="file"
            disabled={readOnly}
          />
        </Grid>
      </Grid>
    </Typography>
  );
}

export default PersonalInfoField;
