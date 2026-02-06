import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/ReviewOrder.css";

export default function ReviewOrder() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const phone = localStorage.getItem("userPhone") || "";

  const totalAmount = cartItems.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  return (
    <div className="review-page">
      <h2>Review Your Order</h2>

      {/* DELIVERY */}
      <div className="delivery-box">
        <h4>Deliver To</h4>
        <p>Mobile: <b>{phone}</b></p>
      </div>

      <div className="review-layout">
        {/* LEFT – ITEMS */}
        <div className="review-items">
          {cartItems.map(i => (
            <div key={i._id} className="review-card">
              <img
                src={`http://localhost:5000/${i.image}`}
                alt={i.name}
              />

              <div className="review-info">
                <h4>{i.name}</h4>
                <p>₹{i.price}</p>
                <p>Qty: {i.qty}</p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT – PRICE */}
        <div className="price-box">
          <h4>Price Details</h4>

          <div className="row">
            <span>Total Items</span>
            <span>{cartItems.length}</span>
          </div>

          <div className="row">
            <span>Subtotal</span>
            <span>₹{totalAmount}</span>
          </div>

          <div className="row">
            <span>Delivery</span>
            <span className="free">FREE</span>
          </div>

          <hr />

          <div className="row total">
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>

          <button
            className="continue-btn"
            onClick={() => navigate("/payment")}
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
