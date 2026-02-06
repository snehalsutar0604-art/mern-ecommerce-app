// src/admin/Sidebar.jsx
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="admin-sidebar">
      <h2>ADMIN PANEL</h2>

      <Link to="/admin-dashboard">Dashboard</Link>
      <Link to="/admin-dashboard/products">Products</Link>
      <Link to="/admin-dashboard/orders">Orders</Link>
      <Link to="/admin-dashboard/users">Users</Link>
    </div>
  );
}
