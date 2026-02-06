const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const router = express.Router();

router.get("/create-admin", async (req, res) => {
  const exists = await Admin.findOne({ username: "admin" });

  if (exists) return res.json("Admin already exists");

  const hashed = await bcrypt.hash("admin123", 10);

  await Admin.create({
    username: "admin",
    password: hashed
  });

  res.json("Admin created → username: admin, password: admin123");
});

module.exports = router;
