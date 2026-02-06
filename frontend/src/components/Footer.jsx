import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LOGO / ABOUT */}
        <div className="footer-section">
          <h2 className="footer-logo">
            Shop<span>Kart</span>
          </h2>
          <p className="footer-text">
            Your one-stop online shop for fashion, electronics & more.
          </p>
        </div>

        {/* LINKS */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Cart</li>
            <li>Orders</li>
          </ul>
        </div>

        {/* CATEGORIES */}
        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li>Phones</li>
            <li>Laptops</li>
            <li>Dresses</li>
            <li>Lehenga</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@shopkart.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} ShopKart. All rights reserved.
      </div>
    </footer>
  );
}
