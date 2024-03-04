/* eslint-disable import/no-extraneous-dependencies */
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import BeaconFireLogo from "../assets/BeaconFireLogo.svg";

import { logout } from "../store/slices/authSlice.js";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    dispatch(logout());
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <AppBar position="static" sx={{ flexGrow: 1 }}>
          <Toolbar style={{ justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <img
                src={BeaconFireLogo}
                alt="logo"
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50%",
                }}
              />
            </Typography>

            {/* TO DO: Add path to page */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button color="inherit" onClick={() => navigate("/")}>
                Profile
              </Button>
              <Button color="inherit" onClick={() => navigate("/visa")}>
                Visa Status
              </Button>
              <Button color="inherit" onClick={() => navigate("/housing")}>
                Housing
              </Button>
            </Box>

            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
}

export default NavBar;
