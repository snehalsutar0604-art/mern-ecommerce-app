const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");

const router = express.Router();
const client = new OAuth2Client(
  "578595592914-fdg1ltekcb8u3bjrb1r5p13slh1plquj.apps.googleusercontent.com"
);
/* GOOGLE LOGIN */
/* GOOGLE LOGIN */
router.post("/google", async (req, res) => {
  const { email, name, picture } = req.body;

  let user = await User.findOne({ email });

  // 🔹 first time google user
  if (!user) {
    user = await User.create({
      name,
      email,
      avatar: picture,
      loginType: "google"
    });
  }

  // 🔥 MOST IMPORTANT
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    token,
    user
  });
});



module.exports = router;
