import axios from "axios";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { jwtDecode } from "jwt-decode";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  // NORMAL LOGIN
  const login = async () => {
    if (!email || !password) {
      alert("Email & Password required");
      return;
    }

    const r = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password
    });

    localStorage.setItem("token", r.data.token);
    localStorage.setItem("user", JSON.stringify(r.data.user));
    nav("/");
  };

  // GOOGLE LOGIN
const googleAuth = async (res) => {
  const decoded = jwtDecode(res.credential);

  const r = await axios.post(
    "http://localhost:5000/api/auth/google",
    {
      email: decoded.email,
      picture: decoded.picture
    }
  );

  localStorage.setItem("token", r.data.token);
  localStorage.setItem("user", JSON.stringify(r.data.user));
  nav("/");
};


  return (
    <div className="auth-box">
      <h2>Login</h2>

      {/* EMAIL PASSWORD */}
      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>

      <div className="or">OR</div>

      {/* GOOGLE */}
      <GoogleLogin
        onSuccess={googleAuth}
        onError={() => alert("Google login failed")}
      />
    </div>
  );
}
