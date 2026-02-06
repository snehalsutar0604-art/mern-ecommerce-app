import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/AdminOrder.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => {
      setOrders(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.log("ORDER FETCH ERROR:", err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="admin-page">
      <h2>📦 All Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Phone</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Address</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(o => (
              <tr key={o._id}>
                {/* USER NAME */}
                <td>
                  <div className="user-cell">
                    <b>{o.name || o.user?.name || "Unknown"}</b>
                  </div>
                </td>

                {/* PHONE */}
                <td>{o.phone || "N/A"}</td>

                {/* TOTAL */}
                <td>₹{o.totalAmount}</td>

                {/* PAYMENT */}
                <td>
                  <span className={`payment-tag ${o.paymentMethod}`}>
                    {o.paymentMethod}
                  </span>
                </td>

                {/* STATUS */}
                <td>
                  <span className={`status ${o.status}`}>
                    {o.status}
                  </span>
                </td>

                {/* ADDRESS */}
                <td className="address-cell">
                  {o.address}
                </td>

                {/* DATE */}
                <td>
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
