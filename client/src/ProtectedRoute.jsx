import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if token exists in localStorage
  if (localStorage.getItem("taskifyToken")) {
    // If token exists, render the children components
    return children;
  } else {
    // If token doesn't exist, redirect to the login page
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
