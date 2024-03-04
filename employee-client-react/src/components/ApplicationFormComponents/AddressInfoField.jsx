import { Typography, Grid } from "@mui/material";
import InputUnit from "./InputUnit.jsx";

function AddressInfoField({ readOnly, personalInfo }) {

  return (
    <div style={{ marginTop: "50px" }}>
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
            value={personalInfo?.currentAddress?.buildingApt || ""}
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
            value={personalInfo?.currentAddress?.streetName || ""}
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
            value={personalInfo?.currentAddress?.city || ""}
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
            value={personalInfo?.currentAddress?.state || ""}
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
            value={personalInfo?.currentAddress?.zip || ""}
            label="Zip Code"
            type="text"
            placeholder="08512"
            required
            disabled={readOnly}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default AddressInfoField;
