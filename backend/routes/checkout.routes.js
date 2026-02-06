const express = require("express");
const Checkout = require("../models/Checkout");
const auth = require("../middleware/auth");

const router = express.Router();

// SAVE DETAILS
router.post("/save", auth, async (req, res) => {
  const { name, phone, address } = req.body;

  const data = await Checkout.findOneAndUpdate(
    { user: req.user.id },
    { name, phone, address },
    { upsert: true, new: true }
  );

  res.json(data);
});

// GET DETAILS
router.get("/details", auth, async (req, res) => {
  const data = await Checkout.findOne({ user: req.user.id });
  if (!data) return res.status(404).json("No data found");

  res.json(data);
});

module.exports = router;
