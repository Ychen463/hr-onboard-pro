/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Typography, Grid } from "@mui/material";
import { useState } from "react";
import InputUnit from "./InputUnit.jsx";

function AddressInfoField({ readOnly }) {
  const [currentAddress, setCurrentAddress] = useState({
    buildingApt: "",
    streetName: "",
    city: "",
    state: "",
    zip: "",
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
        Current Address:
      </Typography>
      <Grid container spacing={10} sx={{ wnameth: "80%", margin: "0 auto" }}>
        <Grid item xs={6}>
          <InputUnit
            name="buildingApt"
            value={currentAddress.buildingApt}
            label="Building/Apt Number"
            type="text"
            placeholder="building 300 suite 120"
            required
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={6}>
          <InputUnit
            name="streetName"
            value={currentAddress.streetName}
            label="Stree Name"
            type="text"
            placeholder="50 Millstone Rd "
            required
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={6}>
          <InputUnit
            name="city"
            value={currentAddress.city}
            label="City"
            type="text"
            placeholder="East Windsor"
            required
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={6}>
          <InputUnit
            name="state"
            value={currentAddress.buildingApt}
            label="State"
            type="text"
            placeholder="NJ"
            required
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={6}>
          <InputUnit
            name="zip"
            value={currentAddress.buildingApt}
            label="Zip Code"
            type="text"
            placeholder="08512"
            required
            disabled={readOnly}
          />
        </Grid>
      </Grid>
    </Typography>
  );
}

export default AddressInfoField;
