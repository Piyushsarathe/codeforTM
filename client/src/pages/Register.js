import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ fname: "", lname: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      alert(res.data.msg);
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.msg || "Something went wrong!";
      alert(msg);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input name="fname" placeholder="First Name" onChange={handleChange} />
      <br />
      <input name="lname" placeholder="Last Name" onChange={handleChange} />
      <br />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <br />
      <button onClick={handleRegister}>Register</button>
      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
};

export default Register;