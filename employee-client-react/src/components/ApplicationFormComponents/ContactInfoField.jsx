import { Typography, Grid } from "@mui/material";
import InputUnit from "./InputUnit.jsx";

function ContactInfoField({ readOnly, personalInfo }) {

  return (
    <div style={{ marginTop: "50px" }}>
      <Typography variant="h4" textAlign="left" style={{ marginLeft: "8px" }}>
        Contact Information
      </Typography>
      <Grid container spacing={8} sx={{ wnameth: "80%", margin: "0 auto" }}>
        <Grid item xs={6}>
          <InputUnit
            name="personalCellPhoneNumber"
            value={personalInfo?.contactSchema?.cellPhoneNumber || ""}
            label="Cell Phone Number"
            type="tel"
            placeholder="(666)666-6666"
            required
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={6}>
          <InputUnit
            name="personalWorkPhoneNumber"
            value={personalInfo?.contactSchema?.workPhoneNumber || ""}
            label="Work Phone Number"
            type="tel"
            placeholder="(666)666-6666"
            disabled={readOnly}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default ContactInfoField;
