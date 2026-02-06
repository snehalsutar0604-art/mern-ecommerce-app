import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginAdmin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin-login/login",
        { username, password }
      );

      localStorage.setItem("adminToken", res.data.token);
      alert("Admin Login Success ✅");

      navigate("/admin-dashboard");

    } catch {
      alert("❌ Invalid Admin Login");
    }
  };

  return (
    <div style={styles.page}>
      <h2>Admin Login</h2>

      <input
        placeholder="Admin Username"
        onChange={e => setUsername(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Admin Password"
        onChange={e => setPassword(e.target.value)}
        style={styles.input}
      />

      <button onClick={loginAdmin} style={styles.button}>
        Login
      </button>
    </div>
  );
}

const styles = {
  page: {
    maxWidth: "400px",
    margin: "80px auto",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(0,0,0,.15)",
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#ff3f6c",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold"
  }
};
