
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  return (
    <div className="cart-page">
      <h2 className="cart-heading">My Cart ({cartItems.length})</h2>

      <div className="cart-layout">

        {/* LEFT – PRODUCTS */}
        <div className="cart-items">

          {cartItems.length === 0 && (
            <p className="empty-cart">Your cart is empty 🛒</p>
          )}

          {cartItems.map(i => (
            <div key={i._id} className="meesho-card">

              {/* IMAGE */}
              <img
                src={`http://localhost:5000/${i.image}`}
                alt={i.name}
              />

              {/* INFO */}
              <div className="meesho-info">
                <h4>{i.name}</h4>
                <p className="desc">{i.description}</p>

                {/* ⭐ RATING */}
                <div className="rating">
                  ⭐⭐⭐⭐☆ <span>(4.2)</span>
                </div>

                {/* SIZE OPTION */}
                {["dress", "lehnga", "top", "saree"].includes(
                  (i.category || "").toLowerCase()
                ) && (
                  <div className="size-row">
                    <span>Size:</span>
                    <select>
                      <option>S</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                  </div>
                )}

                {/* PRICE */}
                <div className="price-row">
                  <span className="price">₹{i.price}</span>
                  <span className="qty">Qty: {i.qty}</span>
                </div>

                <div className="subtotal">
                  Subtotal: ₹{i.price * i.qty}
                </div>

                {/* ACTION */}
                <div className="action-row">
                  <button
                    className="buy-now-btn"
                    onClick={() => navigate("/checkout")}
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT – SUMMARY */}
        <div className="cart-summary-box">
          <h3>Price Details</h3>

          <div className="summary-row">
            <span>Total Items</span>
            <span>{cartItems.length}</span>
          </div>

          <div className="summary-row">
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Payable</span>
            <span>₹{totalAmount}</span>
          </div>

          <button
            className="place-order-btn"
            onClick={() => {
              const token = localStorage.getItem("token");

              if (!token) {
                alert("Login first to place order");
                navigate("/login");
              } else {
                navigate("/checkout");
              }
            }}
          >
            PLACE ORDER
          </button>
        </div>

      </div>
    </div>
  );
}
