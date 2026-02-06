import Sidebar from "./Sidebar";
import "../styles/AdminDashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    // ❌ No token → redirect login
    if (!token) {
      navigate("/admin-login");
      return;
    }

    // ✅ FETCH STATS
    axios.get("http://localhost:5000/api/admin/stats", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setStats(res.data))
    .catch(err => console.log("Stats error:", err));

    // ✅ FETCH GRAPH DATA
    axios.get("http://localhost:5000/api/admin/sales-graph", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const formatted = res.data.map(o => ({
        date: new Date(o.createdAt).toLocaleDateString("en-IN"),
        revenue: o.totalAmount || 0
      }));

      setChartData(formatted);
    })
    .catch(err => console.log("Graph error:", err));

  }, [navigate]);

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-content">
        <h1>Admin Dashboard</h1>

        {/* 📊 STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            Products<br />
            <b>{stats.products || 0}</b>
          </div>

          <div className="stat-card">
            Orders<br />
            <b>{stats.orders || 0}</b>
          </div>

          <div className="stat-card">
            Users<br />
            <b>{stats.users || 0}</b>
          </div>

          <div className="stat-card">
            Revenue<br />
            <b>₹{stats.revenue || 0}</b>
          </div>
        </div>

        {/* 📈 GRAPH */}
        <div className="chart-box">
          <h3>Sales Growth</h3>

          {chartData.length === 0 ? (
            <p style={{ textAlign: "center" }}>No sales yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ff3f6c"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>
    </div>
  );
}
