import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Payment.css";

export default function Payment() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // GET CHECKOUT DETAILS
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/checkout/details", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => setUser(res.data))
      .catch(() => navigate("/login"));
  }, [navigate]);

  if (!user) return <p>Loading...</p>;

  // COD ORDER
  const placeCOD = async () => {
    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          items: cartItems.map(i => ({
            product: i._id,
            quantity: i.qty
          })),
          totalAmount,
          paymentMethod: "COD",
          address: user.address
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      navigate("/order-success");
    } catch {
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  // ONLINE PAYMENT (RAZORPAY)
  const payOnline = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        { amount: totalAmount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      const options = {
        key: "rzp_test_S1PDVB7afBE9JR", // 🔥 frontend key only
        amount: res.data.amount,
        currency: "INR",
        name: "ShopKart",
        description: "Order Payment",
        order_id: res.data.id,

        prefill: {
          name: user.name,
          contact: user.phone
        },

        handler: async function (response) {
          await axios.post(
  "http://localhost:5000/api/orders",
  {
    items: cartItems.map(i => ({
      product: i._id,
      quantity: i.qty
    })),
    totalAmount,
    paymentMethod: method === "cod" ? "COD" : "ONLINE",

    name: user.name,        // 🔥
    phone: user.phone,      // 🔥
    address: user.address   // 🔥
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
);


          navigate("/order-success");
        },

        theme: { color: "#ff3f6c" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h2>Payment</h2>

        <div className="payment-card">
          <p><b>Name:</b> {user.name}</p>
          <p><b>Phone:</b> {user.phone}</p>
          <p><b>Address:</b> {user.address}</p>
        </div>

        <div className="payment-option" onClick={() => setMethod("cod")}>
          <input type="radio" checked={method === "cod"} readOnly />
          Cash on Delivery
        </div>

        <div className="payment-option" onClick={() => setMethod("online")}>
          <input type="radio" checked={method === "online"} readOnly />
          Online Payment (UPI / QR / PhonePe)
        </div>

        <div className="payment-summary">
          <div>
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        <button
          className="pay-btn"
          onClick={method === "cod" ? placeCOD : payOnline}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : method === "cod"
            ? "Place Order"
            : "Pay Now"}
        </button>
      </div>
    </div>
  );
}
