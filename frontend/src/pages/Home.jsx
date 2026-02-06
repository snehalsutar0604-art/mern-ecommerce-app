import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchPopup from "../components/SearchPopup";
import HeroSlider from "../components/HeroSlider";

import "../styles/Home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data.slice(0, 45))); // 🔥 max 45
  }, []);

  return (
    <>
    <div className="search-section">
  <div className="search-wrapper">
    <span className="search-icon">🔍</span>

    <input
      type="text"
      className="search-input"
      placeholder="Search for products..."
      value={q}
      onChange={e => setQ(e.target.value)}
    />

    {/* 🔥 POPUP HERE (inside wrapper) */}
    {q && <SearchPopup query={q} />}
  </div>
</div>

<HeroSlider />

<div className="product-grid">
  {products.map(p => (
    <ProductCard key={p._id} product={p} />
  ))}
</div>

    </>
  );
}
