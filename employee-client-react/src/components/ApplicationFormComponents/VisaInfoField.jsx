import { Typography, Grid } from "@mui/material";
import InputUnit from "./InputUnit.jsx";
import { useEffect, useState } from "react";

const citizenshipOptions = ["Yes", "No"];
const citizenshipDetailOptions = ["Green Card", "Citizen", ""];
const workAuthorizationOptions = ["H1-B", "L2", "F1(CPT/OPT)", "H4", "Other", ""];

function VisaInfoField({ readOnly, citizenshipStatus }) {

  const [formControl, setFormControl] = useState({
    isCitizenOrPermanentResident: 'Yes',
    statusDetail: 'Citizen',
    workAuthorization: '',
    workAuthorizationOtherTitle: '',
  });
  
  useEffect(() => {
    if (citizenshipStatus?.isCitizenOrPermanentResident !== undefined) {
      setFormControl({
        isCitizenOrPermanentResident:
          citizenshipStatus.isCitizenOrPermanentResident ? 'Yes' : 'No',
        statusDetail: citizenshipStatus.statusDetail === "None" ? "" : citizenshipStatus.statusDetail,
        workAuthorization: citizenshipStatus.workAuthorization === "None" ? "" : citizenshipStatus.workAuthorization,
        workAuthorizationOtherTitle: citizenshipStatus.workAuthorizationOtherTitle,
      });
    }
  }, [citizenshipStatus]);
  
  const handleSubmit = (event) => {
    const { name, value } = event.target;
    setFormControl((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <Typography variant="h4" textAlign="left" style={{ marginLeft: "8px" }}>
        Visa status Information
      </Typography>
      <Grid container spacing={8} sx={{ wnameth: "80%", margin: "0 auto" }}>
        <Grid item xs={6}>
          <InputUnit
            name="isCitizenOrPermanentResident"
            value={formControl.isCitizenOrPermanentResident}
            onChange={handleSubmit}
            label="Are you citizen or permanent resident?"
            type="dropdown"
            placeholder="Select citizenship"
            options={citizenshipOptions}
            required
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={6} />
        {formControl.isCitizenOrPermanentResident === 'Yes' && (
          <Grid item xs={6}>
            <InputUnit
              name="statusDetail"
              value={formControl.statusDetail}
              onChange={handleSubmit}
              label="Citizenship Detail"
              type="dropdown"
              placeholder="Select citizenship"
              options={citizenshipDetailOptions}
              required
              disabled={readOnly}
            />
          </Grid>
        )}
        {formControl.isCitizenOrPermanentResident === 'No' && (
          <>
            <Grid item xs={6}>
              <InputUnit
                name="workAuthorization"
                value={formControl.workAuthorization}
                onChange={handleSubmit}
                label="What is your work authorization?"
                type="dropdown"
                placeholder="Select work authorization"
                options={workAuthorizationOptions}
                required
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={6} />
            {formControl.workAuthorization === "Other" && (
              <Grid item xs={12}>
                <InputUnit
                  name="workAuthorizationOtherTitle"
                  value={formControl.workAuthorizationOtherTitle}
                  onChange={handleSubmit}
                  label="What is your work authorization title?"
                  placeholder="Enter authorization title"
                  required
                  disabled={readOnly}
                />
              </Grid>
            )}

            <Grid item xs={6}>
              <InputUnit
                name="startDate"
                value={citizenshipStatus?.startEndDate?.startDate ? citizenshipStatus?.startEndDate?.startDate.substring(0, 10) : ""}
                label="Authorization start date"
                type="date"
                required
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={6}>
              <InputUnit
                name="endDate"
                value={citizenshipStatus?.startEndDate?.endDate ? citizenshipStatus?.startEndDate?.endDate.substring(0, 10) : ""}
                label="Authorization end date"
                type="date"
                required
                disabled={readOnly}
              />
            </Grid>
            {formControl.workAuthorization === "F1(CPT/OPT)" && (
              <Grid item xs={6}>
                <InputUnit
                  name="workAuthorizationFiles"
                  // value={citizenshipStatus?.workAuthorizationFiles[0] || ""}
                  onChange={handleSubmit}
                  label="Upload CPT/OPT Receipt"
                  type="file"
                  required
                  disabled={readOnly}
                />
              </Grid>
            )}
          </>
        )}
      </Grid>
    </div>
  );
}

export default VisaInfoField;
