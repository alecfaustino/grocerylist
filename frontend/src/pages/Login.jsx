import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Login = () => {
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
    <div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <h1>Login</h1>
      <form>
        <label>email</label>
        <input
          type="email"
          onChange={captureUserEmail}
          value={userEmail}></input>
        <label>Password</label>
        <input
          type="password"
          onChange={captureUserPassword}
          value={userPassword}></input>

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleLogIn();
            console.log("clicked log in");
          }}>
          Log In
        </button>
      </form>
      <div>
        <p>
          No Account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
