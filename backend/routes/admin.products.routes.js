const express = require("express");
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const multer = require("multer");

const router = express.Router();

// IMAGE UPLOAD
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// GET ALL PRODUCTS
router.get("/", auth, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ADD PRODUCT
router.post("/", auth, upload.single("image"), async (req, res) => {
  const { name, price, category, description } = req.body;

  const product = await Product.create({
    name,
    price,
    category,
    description,
    image: req.file?.path
  });

  res.json(product);
});

// UPDATE PRODUCT
// UPDATE PRODUCT (FIXED)
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  const { name, price, category, description } = req.body;

  const updateData = {
    name,
    price,
    category,
    description
  };

  // image only if selected
  if (req.file) {
    updateData.image = req.file.path;
  }

  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );

  res.json(updated);
});


// DELETE PRODUCT
router.delete("/:id", auth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

module.exports = router;
