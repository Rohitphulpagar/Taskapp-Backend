const express = require("express");
const router = express.Router();
const userSchema = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new userSchema({
      username: username,
      password: hashPassword,
    });
    await newUser.save();
    res.json({
      message: "User register successufully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userSchema.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRETE, {
      expiresIn: "24h",
    });
    return res.json({
      status: "Suceess",
      message: "login sucessfully",
      jwtToken: jwtToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router;
