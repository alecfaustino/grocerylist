import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

  const captureUserEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const captureUserPassword = (e) => {
    setUserPassword(e.target.value);
  };

  const captureUserName = (e) => {
    setUserName(e.target.value);
  };

  return (
    <div>
      <h1>Register</h1>
      <form>
        <label>Name</label>
        <input type="text" onChange={captureUserName} value={userName}></input>
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
            handleRegister();
            console.log("clicked Register");
          }}>
          Register
        </button>
        <div>
          Already have an account? <Link to="/login">Log in!</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
