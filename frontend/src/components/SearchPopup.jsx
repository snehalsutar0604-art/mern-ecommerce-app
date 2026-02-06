import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SearchPopup.css";

export default function SearchPopup({ query }) {
  const [products, setProducts] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    if (!query) return setProducts([]);

    axios
      .get(`http://localhost:5000/api/products/search?q=${query}`)
      .then(res => setProducts(res.data))
      .catch(() => setProducts([]));
  }, [query]);

  return (
    <div className="search-popup">
      {products.length === 0 ? (
        <div className="not-found">No products found</div>
      ) : (
        products.map(p => (
          <div
            key={p._id}
            className="search-item"
            onClick={() => nav(`/category/${p.category}`)} // 🔥 FIX
          >
            <img src={`http://localhost:5000/${p.image}`} alt={p.name} />
            <div className="info">
              <h4>{p.name}</h4>
              <p>{p.description}</p>
              <b>₹{p.price}</b>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
