import React, { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import ScroogeLogo from "./../assets/scrooge-logo.svg";
import { useLocation, useNavigate } from "react-router";
import * as ROUTES from "./../routes/RoutesConfig";
import { useAuth } from "../api/AuthContext";

const adminRouteConfigs = [
  {
    name: "Manage Account",
    link: "/manage-account",
  },
  {
    name: "Create Account",
    link: "create-account",
  },
  {
    name: "View Transaction",
    link: "/view-transaction",
  },
  {
    name: "View Logs",
    link: "/view-logs",
  },
  {
    name: "Testing",
    link: "/testing",
  },
];

const agentRouteConfigs = [
  {
    name: "Manage Profile",
    link: "/manage-profile",
  },
  {
    name: "View Transaction",
    link: "/view-transaction",
  },
  {
    name: "Create Client Profile",
    link: "/create-client-profile",
  },
];

const Navbar = () => {
  let location = useLocation();
  if (location.pathname === "/") {
    return null;
  }
  const { idToken, authenticated, loading } = useAuth();

  const navigate = useNavigate();
  // checking if user is logged in:
  if (!authenticated) {
    navigate(ROUTES.HOME);
  }
  console.log(idToken);
  const userRole = idToken["custom:role"];
  //   const userRole = "admin";

  // checking for the link
  return (
    <Grid size={3}>
      {/* Navbar portion */}
      <Box sx={{ padding: "32px" }}>
        {/* Logo */}
        <Box sx={{ marginTop: "24px" }}>
          <img src={ScroogeLogo} alt="Scrooge Logo" />
        </Box>
        {/* Render conditionally here */}
        {userRole === "admin" || userRole === "root-admin" ? (
          <LinksList routeConfigs={adminRouteConfigs} />
        ) : userRole === "agent" ? (
          <LinksList routeConfigs={agentRouteConfigs} />
        ) : null}
      </Box>
    </Grid>
  );
};

const LinksList = ({ routeConfigs }) => {
  let location = useLocation();
  const navigate = useNavigate();
  return (
    <Box sx={{ marginTop: "10px", marginRight: "40px" }}>
      {routeConfigs.map((route) => {
        const currentPathName = "/" + location.pathname.split("/")[1];
        console.log(currentPathName);
        const isSelected = currentPathName === route.link;
        return (
          <Box
            sx={{
              width: "100%",
              padding: "20px",
              cursor: "pointer",
              transition: "0.3s",

              "&:hover": {
                backgroundColor: "#404040",
                opacity: "0.8",
              },
            }}
            onClick={() => {
              navigate(route.link);
            }}
            key={route.link}
          >
            <Typography
              sx={{
                color: isSelected ? "#858585" : "#ffffffff",
                marginLeft: "0px",
                fontSize: "26px",
              }}
            >
              {route.name}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default Navbar;
