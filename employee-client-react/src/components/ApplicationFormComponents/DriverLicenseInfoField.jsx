/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import UploadDropzone from './UploadDropzone.jsx';
import { Typography, Grid } from '@mui/material';

import { useState } from 'react';

import InputUnit from './InputUnit.jsx';

function DriverLicenseInfoField({ readOnly }) {
  const [driverLicense, setDriverLicense] = useState({
    DocId: '',
    hasDriverLicense: '',
    driverLicenseNumber: '',
    expirationDate: '',
    driverLicenseCopyUrl: ''
    ,
  });
  const [carInformation, setCarInformation] = useState({
    make: '',
    model: '',
    color: '',
  });

  const [formControl, setFormControl] = useState({ isCitizenOrPermanentResident: false });
  const handleSubmit = (event) => {
    const { name, value } = event.target;
    setFormControl((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSubmit = (e) => {
    const { files } = e.target;

    console.log('uploaded files utl:', files);
  };

  const driverLicenseOptions = ['Yes', 'No'];

  return (
    <Typography style={{ marginTop: '50px' }}>

      <Typography variant="h4" textAlign="left" style={{ marginLeft: '8px' }}>Driver’s license Information</Typography>
      <Grid container spacing={8} sx={{ wnameth: '80%', margin: '0 auto' }}>

        <Grid item xs={6}>
          <InputUnit
            onChange={handleSubmit}
            name="hasDriverLicense"
            value={driverLicense.hasDriverLicense}
            label="Do you have a driver's license?"
            type="dropdown"
            placeholder=""
            options={driverLicenseOptions}
            required
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={6} />
        { formControl.hasDriverLicense === 'Yes' && (
          <>
            <Grid item xs={6}>
              <InputUnit
                name="driverLicenseNumber"
                value={driverLicense.driverLicenseNumber}
                label="Driver's Lisence Number"
                type="text"
                placeholder=" A1234567"
                required
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={6}>
              <InputUnit
                name="endDate"
                value={driverLicense.expirationDate}
                label="Driver's License Expiration Date"
                type="date"
                required
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={6}>
              <InputUnit
                name="driverLicenseCopy"
                label="Copye of Driver's Lisence"
                type="file"
                required
                disabled={readOnly}
                onChange={handleFileSubmit}
              />
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={6}>
              <InputUnit
                onChange={handleSubmit}
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
                    value={carInformation.make}
                    label="Make"
                    type="text"
                    placeholder="Toyota"
                    disabled={readOnly}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputUnit
                    name="carModel"
                    value={carInformation.model}
                    label="Model"
                    type="text"
                    placeholder="Corolla"
                    disabled={readOnly}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputUnit
                    name="carColor"
                    value={carInformation.color}
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
        { formControl.isCitizenOrPermanentResident === 'No' && (
        <Grid item xs={6} />
        )}
      </Grid>
    </Typography>
  );
}

export default DriverLicenseInfoField;
