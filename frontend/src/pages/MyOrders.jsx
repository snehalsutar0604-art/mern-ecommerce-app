import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/MyOrders.css";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders/my", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => setOrders(res.data))
    .catch(() => alert("Login required"));
  }, []);

  const cancelOrder = async (id) => {
    await axios.put(
      `http://localhost:5000/api/orders/cancel/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    setOrders(orders.map(o =>
      o._id === id ? { ...o, status: "CANCELLED" } : o
    ));
  };

  if (orders.length === 0) {
    return <p className="no-orders">No orders found</p>;
  }

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {orders.map(order => (
        <div key={order._id} className="order-card">
          <div className="order-head">
            <span>Status: {order.status}</span>
            <span>Total: ₹{order.totalAmount}</span>
          </div>

          {order.items.map(i => (
            <div key={i._id} className="order-item">
              <img
                src={`http://localhost:5000/${i.product.image}`}
                alt={i.product.name}
              />
              <div>
                <p>{i.product.name}</p>
                <p>Qty: {i.quantity}</p>
              </div>
            </div>
          ))}

          {order.status === "PLACED" && (
            <button
              className="cancel-btn"
              onClick={() => cancelOrder(order._id)}
            >
              Cancel Order
            </button>
          )}

          {order.status === "DELIVERED" && (
            <p className="delivered">Order received successfully ✅</p>
          )}
        </div>
      ))}
    </div>
  );
}
