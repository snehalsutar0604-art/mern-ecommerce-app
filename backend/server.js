require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const paymentRoutes = require("./routes/payment.routes");
const checkoutRoutes = require("./routes/checkout.routes");

const adminRoutes = require("./routes/admin.routes");
const adminProductRoutes = require("./routes/admin.products.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connect
mongoose.connect("mongodb://127.0.0.1:27017/mernstore")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/checkout", checkoutRoutes);

// Admin API
app.use("/api/admin/products", adminProductRoutes);

app.use("/api/admin-login", require("./routes/adminLogin.routes"));
app.use("/api", require("./routes/createAdmin.routes"));
app.use("/api/admin", require("./routes/admin.routes"));


// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
