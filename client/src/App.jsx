import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <div>
      {/* BrowserRouter to enable routing */}
      <Router>
        {/* Navbar component for navigation */}
        <Navbar />
        {/* Routes component to define routes */}
        <Routes>
          {/* Route for tasks page, protected by ProtectedRoute */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
          {/* Route for login page */}
          <Route path="/login" element={<Login />} />
          {/* Route for register page */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
