import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      navigate("/login");
    } catch (error) {}
  };

  return (
    <nav>
      <button onClick={handleLogOut}>Logout</button>
    </nav>
  );
};

export default Navbar;
