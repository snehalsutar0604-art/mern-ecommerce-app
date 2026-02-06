import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import "../../styles/Category.css";

export default function Laptop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/category/laptop")
      .then(res => setProducts(res.data));
  }, []);

  return (
    <div className="category-page">
      <h2 className="category-title">Phones</h2>

      <div className="category-grid">
        {products.map(p => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
