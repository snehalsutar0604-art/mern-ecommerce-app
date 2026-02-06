const express = require("express");
const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

// STATS API
router.get("/stats", adminAuth, async (req, res) => {
  const products = await Product.countDocuments();
  const orders = await Order.countDocuments();
  const users = await User.countDocuments();

  const revenueData = await Order.find();
  const revenue = revenueData.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  res.json({ products, orders, users, revenue });
});

// USERS LIST
router.get("/users", auth, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// ORDERS LIST
router.get("/orders", auth, async (req, res) => {
  const orders = await Order.find().populate("user").populate("items.product");
  res.json(orders);
});

// SALES GRAPH
router.get("/sales-graph",adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: 1 });

    const graph = orders.map(o => ({
      createdAt: o.createdAt,
      totalAmount: o.totalAmount || 0
    }));

    res.json(graph);

  } catch {
    res.status(500).json({ error: "Graph failed" });
  }
});

module.exports = router;
