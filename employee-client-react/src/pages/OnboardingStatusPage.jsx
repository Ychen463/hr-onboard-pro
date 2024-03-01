/* eslint-disable import/no-extraneous-dependencies */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Typography } from "@mui/material";
import {
  selectorCurrentUser,
  sessionValidate,
} from "../store/slices/authSlice.js";

// eslint-disable-next-line react/prop-types
function OnboardingStatusCard() {
  const navigate = useNavigate();
  const currentUserData = useSelector(selectorCurrentUser);
  console.log("in status page ", currentUserData);
  const { onboardingStatus } = currentUserData;

  const rejFeedback =
    "On boarding application rejected, contact HR for details";
  const CONTENT = {
    "Not Started": {
      boardMessage: "Start on boarding process",
      buttonContent: "Start on boarding",
    },
    Pending: {
      boardMessage:
        "Onboarding application submitted, please wait for approval",
      buttonContent: "Review submission",
    },
    Rejected: {
      boardMessage: rejFeedback,
      buttonContent: "Edit application & Re-Submit",
    },
  };
  const handleStatusClick = () => {
    navigate("/onboarding-application");
  };
  return (
    <Card
      style={{
        height: "300px",
        width: "500px",
        margin: "200px auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ mt: 12, textAlign: "center" }}>
        {onboardingStatus
          ? CONTENT[onboardingStatus].boardMessage
          : "Please start your on boarding process"}
      </Typography>

      <Button onClick={handleStatusClick} variant="contained" sx={{ m: 14 }}>
        {onboardingStatus
          ? CONTENT[onboardingStatus].buttonContent
          : "Start on boarding"}
      </Button>
    </Card>
  );
}

export default OnboardingStatusCard;
