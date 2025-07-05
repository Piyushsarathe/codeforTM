import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <div>
      <h2>Welcome, {email}</h2>
      <button onClick={logout}>Logout</button>
      <br />
      <Link to="/change-password">Change Password</Link>
    </div>
  );
};

export default Dashboard;
