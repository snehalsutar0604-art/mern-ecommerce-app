import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/AdminProducts.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null
  });

  const token = localStorage.getItem("token");

  // FETCH PRODUCTS
  const fetchProducts = () => {
    axios.get("http://localhost:5000/api/admin/products", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setProducts(res.data))
      .catch(err => console.log("Fetch error", err));
  };

  useEffect(fetchProducts, [token]);

  // ADD OR UPDATE PRODUCT
const saveProduct = async () => {
  const data = new FormData();

  Object.keys(form).forEach(key => {
    if (form[key]) {
      data.append(key, form[key]);
    }
  });

  try {
    if (editingId) {
      // ✅ UPDATE
      await axios.put(
        `http://localhost:5000/api/admin/products/${editingId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
    } else {
      // ✅ ADD
      await axios.post(
        "http://localhost:5000/api/admin/products",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
    }

    setForm({
      name: "",
      price: "",
      category: "",
      description: "",
      image: null
    });
    setEditingId(null);
    fetchProducts();

  } catch (err) {
    console.log(err.response?.data || err.message);
    alert("Save failed");
  }
};

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchProducts();
  };

  // EDIT PRODUCT
  const editProduct = (p) => {
    setEditingId(p._id);
    setForm({
      name: p.name,
      price: p.price,
      category: p.category,
      description: p.description,
      image: null
    });
  };

  return (
    <div className="admin-page">
      <h2>🛒 Manage Products</h2>

      {/* FORM */}
      <div className="product-form">
        <input
          placeholder="Product Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="file"
          onChange={e => setForm({ ...form, image: e.target.files[0] })}
        />

        <button onClick={saveProduct}>
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </div>

      {/* PRODUCT LIST */}
      <div className="admin-product-grid">
        {products.map(p => (
          <div key={p._id} className="admin-product-card">

            <img src={`http://localhost:5000/${p.image}`} alt={p.name} />

            <h4>{p.name}</h4>
            <p className="cat">{p.category}</p>
            <p className="price">₹{p.price}</p>

            <div className="admin-actions">
              <button className="edit" onClick={() => editProduct(p)}>Edit</button>
              <button className="delete" onClick={() => deleteProduct(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
