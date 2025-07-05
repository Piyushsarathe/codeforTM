import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [newPass, setNewPass] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const changePassword = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/change-password", {
        email,
        newPassword: newPass,
      });
      alert("Password updated!");
      navigate("/dashboard");
    } catch (err) {
      const msg = err?.response?.data?.msg || "Failed to change password";
      alert(msg);
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setNewPass(e.target.value)}
      />
      <br />
      <button onClick={changePassword}>Update Password</button>
    </div>
  );
};

export default ChangePassword;
