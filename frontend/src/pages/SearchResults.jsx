import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../styles/Category.css";

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then(res => {
      const all = res.data;
      const match = all.filter(p =>
        p.name.toLowerCase().includes(q.toLowerCase())
      );
      const rest = all.filter(
        p => !p.name.toLowerCase().includes(q.toLowerCase())
      );
      setProducts([...match, ...rest]);
    });
  }, [q]);

  return (
    <div className="category-page">
      <h2>Search: {q}</h2>
      <div className="category-grid">
        {products.map(p => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
