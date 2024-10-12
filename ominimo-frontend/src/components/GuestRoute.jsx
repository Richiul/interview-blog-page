import { Navigate } from "react-router-dom";
import React from "react";

const GuestRoute = ({ element: Element }) => {
  const isAuthenticated = !!sessionStorage.getItem("auth_token"); // Check if the user is authenticated

  return isAuthenticated ? <Navigate to="/" /> : <Element />;
};

export default GuestRoute;
