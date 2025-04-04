import React from "react";
import { Route, Routes, useLocation } from "react-router";
import * as ROUTES from "./RoutesConfig";
import Home from "../screens/Home";
import { ProtectedRoute } from "./ProtectedRoute";
import Dashboard from "../screens/Dashboard";
import ViewAllAdmin from "../screens/AdminPage";
import CreateAdmin from "../screens/CreateAdmin";
import AgentList from "../screens/AgentList";
import EditAdmin from "../screens/EditAdmin";
import ViewLogs from "../screens/ViewLogs";
import { AuthProvider } from "../api/AuthContext";
import Testing from "../screens/Testing";
import Grid from "@mui/material/Grid2";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import CreateAgent from "../screens/CreateAgent";
import EditAgent from "../screens/EditAgent";
const CRMProtectedRouter = () => {
  let location = useLocation();
  if (
    location.pathname === "/" ||
    location.pathname.includes("public-verify-client")
  ) {
    return null;
  }
  return (
    <AuthProvider>
      {/* Wrap all protected routes here, follow the <DashBoard/> */}
      <Grid
        container
        sx={{ width: "100%", minHeight: "100vh", height: "100%" }}
      >
        <Navbar />

        {/* This grid is to contain the main content */}
        <Grid
          size={9}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* This box is to create the white box content with padding */}
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "16px",
              minHeight: "90vh",
              width: "100%",
              height: "fit-content",
            }}
          >
            <Routes>
              {/* Wrap all protected routes here, follow the <DashBoard/> */}

              <Route
                path={ROUTES.DASHBOARD}
                element={
                  <ProtectedRoute allowedRoles={["admin", "agent"]}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path={ROUTES.VIEW_ALL_ADMIN}
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <ViewAllAdmin />
                  </ProtectedRoute>
                }
              />

              <Route
                path={ROUTES.CREATE_ADMIN}
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <CreateAdmin />
                  </ProtectedRoute>
                }
              />

              <Route
                path={ROUTES.AGENT_LIST}
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AgentList />
                  </ProtectedRoute>
                }
              />

              <Route
                path={ROUTES.EDIT_ADMIN}
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <EditAdmin />
                  </ProtectedRoute>
                }
              />

              <Route
                path={ROUTES.VIEW_LOGS}
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <ViewLogs />
                  </ProtectedRoute>
                }
              />

            <Route
                path={ROUTES.CREATE_AGENT}
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <CreateAgent />
                  </ProtectedRoute>
                }
              />

              <Route
                path={ROUTES.EDIT_AGENT}  
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <EditAgent />
                  </ProtectedRoute>
                }
              />

            </Routes>
          </Box>
        </Grid>
      </Grid>
    </AuthProvider>
  );
};

export default CRMProtectedRouter;
