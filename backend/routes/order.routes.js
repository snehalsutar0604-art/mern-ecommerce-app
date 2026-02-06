const express = require("express");
const Order = require("../models/Order");
const Checkout = require("../models/Checkout"); // ✅ ADD THIS
const auth = require("../middleware/auth");

const router = express.Router();

// PLACE ORDER
router.post("/", auth, async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod } = req.body;

    // GET USER CHECKOUT DATA
    const checkoutData = await Checkout.findOne({ user: req.user.id });

    if (!checkoutData) {
      return res.status(400).json("Checkout details missing");
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      paymentMethod,
      address: checkoutData.address
    });

    res.json(order);

  } catch (err) {
    console.log("ORDER ERROR:", err);
    res.status(500).json("Order failed");
  }
});

// USER ORDERS
router.get("/my-orders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch {
    res.status(500).json("Failed to fetch orders");
  }
});

module.exports = router;
