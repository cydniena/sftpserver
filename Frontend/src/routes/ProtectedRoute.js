import { useAuth } from "./../api/AuthContext";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as ROUTES from "./RoutesConfig";

export function ProtectedRoute({ children, allowedRoles }) {
  const { idToken, authenticated, loading } = useAuth();
  //   console.log(idToken);
  //   console.log(authenticated);
  //   console.log(loading);

  let role = "",
    userId,
    userName,
    email;
  if (idToken) {
    role = idToken["custom:role"];
    userId = idToken.sub;
    userName = idToken.name;
    email = idToken.email;
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!authenticated) {
        navigate(ROUTES.HOME);
      } else if (role && !allowedRoles.includes(role)) {
        navigate(ROUTES.HOME);
      }
    }
  }, [idToken, authenticated, allowedRoles, navigate]);

  if (!authenticated || (role && !allowedRoles.includes(role))) {
    return null; // Render nothing while redirecting
  }

  return children;
}
