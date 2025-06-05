import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleRegister = async () => {
    try {
      const result = await axios.post(
        `http://localhost:8080/api/users/register`,
        {
          name: userName,
          email: userEmail,
          password: userPassword,
        },
        {
          withCredentials: true,
        }
      );
      if (result.data.message === "User Created Successfully") {
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        console.error(
          "Register failed:",
          error.response.status,
          error.response.data
        );
      } else {
        console.error("Unexpected error:", error.message);
      }
    }
  };
  return (
    <div className="auth-container">
      <h1>Register</h1>
      <form>
        <label>Name</label>
        <input
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />

        <label>Email</label>
        <input
          type="email"
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
        />

        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setUserPassword(e.target.value)}
          value={userPassword}
        />

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleRegister();
          }}>
          Register
        </button>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
