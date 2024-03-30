import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate(); // Navigation hook from React Router
  const [showProfileMenu, setShowProfileMenu] = useState(false); // State for profile menu visibility
  const user = JSON.parse(localStorage.getItem("taskifyUser")); // Retrieving user data from local storage

  // Logout functionality
  const handleLogout = async () => {
    try {
      // Retrieve token from local storage
      const token = localStorage.getItem("taskifyToken");
      // Remove token and user data from local storage
    localStorage.removeItem("taskifyToken");
    localStorage.removeItem("taskifyUser");

      // Set up request headers with the token for authorization
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Send a POST request to logout endpoint with authorization headers
      await axios.post("https://taskify-c5a2.onrender.com/api/v1/user/logout", {}, config);
      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle error (e.g., display error message to the user)
    }
    
  };

  return (
    <nav className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-white font-bold">
              Taskify
            </Link>
          </div>
          {/* Profile */}
          <div className="flex items-center">
            <div className="ml-3 relative">
              <div>
                <button
                  className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="user-menu"
                  aria-haspopup="true"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-10 w-10 flex items-center justify-center bg-white text-indigo-600 font-bold rounded-full">
                    {user?.name.slice(0, 1) || "A"}
                    {/* Displaying user initials or default "A" */}
                  </div>
                </button>
              </div>
              {/* Dropdown menu */}
              {showProfileMenu &&
                user?.name && ( // Display dropdown menu if profile menu is open and user is logged in
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <div
                      className="py-1 flex justify-between items-center"
                      role="none"
                    >
                      {/* Logout button */}
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        Logout
                      </button>
                      <FaTimes
                        className="mr-4 cursor-pointer"
                        onClick={() => setShowProfileMenu(false)} // Close profile menu on icon click
                      />
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
