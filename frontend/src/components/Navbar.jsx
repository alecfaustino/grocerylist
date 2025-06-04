import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/users/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        GroceryTrackr
      </Link>
      {isLoggedIn && (
        <button className="nav-button" onClick={handleLogOut}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
