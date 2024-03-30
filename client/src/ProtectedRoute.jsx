import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if token exists in localStorage
  const token = localStorage.getItem("taskifyToken");

  return token ? (
    // If token exists, render the children components
    children
  ) : (
    // If token doesn't exist, redirect to the login page
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
