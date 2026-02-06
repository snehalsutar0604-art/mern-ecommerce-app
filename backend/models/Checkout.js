const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: String,
  phone: String,
  address: String
}, { timestamps: true });

module.exports = mongoose.model("Checkout", checkoutSchema);
