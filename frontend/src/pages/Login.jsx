import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../styles/Login.css";

const Login = ({ setIsLoggedIn }) => {
  const location = useLocation();
  const errorMessage = location.state?.message;
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleLogIn = async () => {
    try {
      const result = await axios.post(
        `http://localhost:8080/api/users/login`,
        {
          email: userEmail,
          password: userPassword,
        },
        {
          withCredentials: true,
        }
      );
      // get user information from users/api/me
      const user = await axios.get("http://localhost:8080/api/users/me", {
        withCredentials: true,
      });

      const userId = user.data.user_id;
      setIsLoggedIn(true);
      setUserEmail("");
      setUserPassword("");
      navigate(`/dashboard/`);
    } catch (error) {
      if (error.response) {
        console.error(
          "Login failed:",
          error.response.status,
          error.response.data
        );
      } else {
        console.error("Unexpected error:", error.message);
      }
    }
  };

  const captureUserEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const captureUserPassword = (e) => {
    setUserPassword(e.target.value);
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h1>Login</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          onChange={captureUserEmail}
          value={userEmail}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={captureUserPassword}
          value={userPassword}
        />

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleLogIn();
          }}>
          Log In
        </button>

        <p className="register-link">
          No account? <Link to="/register">Register Here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
