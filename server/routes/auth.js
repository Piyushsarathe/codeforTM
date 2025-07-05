import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fname, lname, email, password: hashedPassword });
    await newUser.save();
    res.json({ msg: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        fname: user.fname,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: "Login failed" });
  }
});

router.post("/change-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashed });
    res.json({ msg: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Failed to change password" });
  }
});

export default router;
