const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  name: String,     // ✅ ADD
  phone: String,   // ✅ ADD

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: Number
    }
  ],

  totalAmount: Number,
  paymentMethod: String,
  address: String,

  status: {
    type: String,
    default: "PLACED"
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
