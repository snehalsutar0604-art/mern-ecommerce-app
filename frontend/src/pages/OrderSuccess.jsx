import { useNavigate } from "react-router-dom";
import "../styles/OrderSuccess.css";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <div className="success-card">

        <div className="success-icon">✔</div>

        <h1>Order Placed Successfully</h1>

        <p>
          Thank you for shopping with <b>ShopKart</b> 😊  
          <br />
          Your order has been confirmed.
        </p>

        <div className="success-info">
          <p>📦 Delivery in 3-5 working days</p>
          <p>💰 Payment: Cash on Delivery / Online</p>
        </div>

        <div className="success-actions">
          <button onClick={() => navigate("/")}>
            Continue Shopping
          </button>

          <button
            className="secondary"
            onClick={() => navigate("/profile")}
          >
            My Orders
          </button>
        </div>

      </div>
    </div>
  );
}
