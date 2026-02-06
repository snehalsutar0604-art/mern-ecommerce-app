const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,     // 🔥 always lowercase
  price: Number,
  description: String,
  image: String
});

module.exports = mongoose.model("Product", productSchema);
