const express = require("express");
const Product = require("../models/Product");
const multer = require("multer");

const router = express.Router();

/* ---------- MULTER ---------- */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

/* ---------- ADD PRODUCT (ADMIN) ---------- */
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      category: req.body.category.toLowerCase().trim(), // 🔥 IMPORTANT
      price: req.body.price,
      description: req.body.description,
      image: req.file.path
    });
    res.json(product);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

/* ---------- ALL PRODUCTS ---------- */
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

/* ---------- SEARCH ---------- */
router.get("/search", async (req, res) => {
  const q = req.query.q || "";
  const products = await Product.find({
    name: { $regex: q, $options: "i" }
  });
  res.json(products);
});

/* ---------- CATEGORY ---------- */
router.get("/category/:cat", async (req, res) => {
  const products = await Product.find({
    category: req.params.cat.toLowerCase()
  });
  res.json(products);
});

/* ---------- SINGLE ---------- */
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

module.exports = router;
