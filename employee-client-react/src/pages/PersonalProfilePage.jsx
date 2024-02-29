import { Container, Button } from "@mui/material";

import { useState } from "react";
import formDataToObject from "../utils/formDataToObject.jsx";
import PersonalInfoField from "../components/ApplicationFormComponents/PersonalInfoField.jsx";
import ContactInfoField from "../components/ApplicationFormComponents/ContactInfoField.jsx";
import AddressInfoField from "../components/ApplicationFormComponents/AddressInfoField.jsx";
import VisaInfoField from "../components/ApplicationFormComponents/VisaInfoField.jsx";
import UserEmailField from "../components/UserEmailField.jsx";

import EmergencyContact from "../components/ApplicationFormComponents/EmergencyContact.jsx";

function PersonalProfilePage() {
  const [readOnly, setReadOnly] = useState(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataObj = formDataToObject(formData);

    console.log("all form data entries", formDataObj);
  };

  return (
    <div style={{ width: "1080px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Personal Profile Page</h1>
      <Container
        component="form"
        onSubmit={handleSubmit}
        style={{ width: "960px", marginLeft: "-30px" }}
      >
        <PersonalInfoField readOnly={readOnly} />
        <UserEmailField />
        <AddressInfoField readOnly={readOnly} />
        <ContactInfoField readOnly={readOnly} />
        <VisaInfoField readOnly />
        <EmergencyContact readOnly={readOnly} />
        {readOnly ? (
          <Button
            variant="contained"
            sx={{ mt: 5, mb: 2, float: "right" }}
            onClick={() => setReadOnly(false)}
          >
            Edit
          </Button>
        ) : (
          <>
            <br />
            <Button
              type="submit"
              variant="contained"
              sx={{ m: 2, float: "right" }}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              sx={{ m: 2, float: "right" }}
              onClick={() => setReadOnly(true)}
            >
              Cancle
            </Button>
          </>
        )}
      </Container>
    </div>
  );
}

export default PersonalProfilePage;
