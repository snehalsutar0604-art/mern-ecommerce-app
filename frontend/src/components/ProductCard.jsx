import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/ProductCard.css";

export default function ProductCard({ product }) {
  const nav = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img
        src={`http://localhost:5000/${product.image}`}
        alt={product.name}
        onClick={() => nav(`/category/${product.category}`)}
      />

      <h4>{product.name}</h4>
      <p>{product.description}</p>
      <b>₹{product.price}</b>

      <button
        className="add-cart-btn"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}
