import { Typography, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import InputUnit from './InputUnit.jsx';

const driverLicenseOptions = ['Yes', 'No'];

function DriverLicenseInfoField({ readOnly, driverLicense, personalInfo }) {
  const [formControl, setFormControl] = useState({
    hasDriverLicense: 'No',
    hasCar: 'No',
  });

  useEffect(() => {
    if (driverLicense?.hasDriverLicense) {
      setFormControl((prev) => ({ ...prev, hasDriverLicense: 'Yes' }));
    }
  }, [driverLicense]);

  useEffect(() => {
    if (personalInfo?.carInformation?.make) {
      setFormControl((prev) => ({ ...prev, hasCar: 'Yes' }));
    }
  }, [personalInfo]);

  const handleSubmit = (event) => {
    const { name, value } = event.target;
    setFormControl((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSubmit = (e) => {
    const { files } = e.target;
    console.log('uploaded files utl:', files);
  };

  return (
    <div style={{ marginTop: '50px' }}>
      <Typography variant="h4" textAlign="left" style={{ marginLeft: '8px' }}>
        Driver’s license Information
      </Typography>
      <Grid container spacing={8} sx={{ wnameth: '80%', margin: '0 auto' }}>
        <Grid item xs={6}>
          <InputUnit
            onChange={handleSubmit}
            name="hasDriverLicense"
            value={formControl.hasDriverLicense}
            label="Do you have a driver's license?"
            type="dropdown"
            placeholder=""
            options={driverLicenseOptions}
            required
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={6} />
        {formControl.hasDriverLicense === 'Yes' && (
          <>
            <Grid item xs={6}>
              <InputUnit
                name="driverLicenseNumber"
                value={driverLicense?.driverLicenseNumber || ''}
                label="Driver's Lisence Number"
                type="text"
                placeholder=" A1234567"
                required
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={6}>
              <InputUnit
                name="driverLicenseExpirationDate"
                value={
                  driverLicense?.expirationDate ? driverLicense.expirationDate.substring(0, 10) : ''
                }
                label="Driver's License Expiration Date"
                type="date"
                required
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={6}>
              <InputUnit
                name="driverLicenseCopy"
                label="Copy of Driver's Lisence"
                type="file"
                required
                disabled={readOnly}
                // value={driverLicense?.driverLicenseCopyUrl || ""}
                onChange={handleFileSubmit}
              />
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={6}>
              <InputUnit
                onChange={handleSubmit}
                value={formControl.hasCar}
                name="hasCar"
                label="Do you have a car?"
                type="dropdown"
                placeholder=""
                options={driverLicenseOptions}
                required
                disabled={readOnly}
              />
            </Grid>
            {formControl.hasCar === 'Yes' && (
              <>
                <Grid item xs={6}>
                  <InputUnit
                    name="carMake"
                    value={personalInfo?.carInformation?.make || ''}
                    label="Make"
                    type="text"
                    placeholder="Toyota"
                    disabled={readOnly}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputUnit
                    name="carModel"
                    value={personalInfo?.carInformation?.model || ''}
                    label="Model"
                    type="text"
                    placeholder="Corolla"
                    disabled={readOnly}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputUnit
                    name="carColor"
                    value={personalInfo?.carInformation?.color || ''}
                    label="Color"
                    type="text"
                    placeholder="Black"
                    disabled={readOnly}
                  />
                </Grid>
              </>
            )}
          </>
        )}
        {formControl.hasDriverLicense === 'No' && <Grid item xs={6} />}
      </Grid>
    </div>
  );
}

export default DriverLicenseInfoField;
