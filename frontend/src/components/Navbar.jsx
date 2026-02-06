import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const nav = useNavigate();
  const { cartItems } = useCart();
  const user = JSON.parse(localStorage.getItem("user"));

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  const logout = () => {
    localStorage.clear();
    nav("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => nav("/")}>
        Shop<span>Kart</span>
      </div>

      <div className="nav-links">
        <span className="cart-icon" onClick={() => nav("/cart")}>
          🛒
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </span>

        {user ? (
          <>
            <img
              src={
                user.photo ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              className="nav-profile"
              alt="profile"
              onClick={() => nav("/profile")}
            />
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => nav("/signup")}>Signup</button>
            <button onClick={() => nav("/login")}>Login</button>
          </>
        )}
      </div>
    </nav>
  );
}
