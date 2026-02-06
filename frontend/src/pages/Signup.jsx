import axios from "axios";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { jwtDecode } from "jwt-decode";



export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  // NORMAL SIGNUP
  const signup = async () => {
    if (!email || !password) {
      alert("Email & Password required");
      return;
    }

    await axios.post("http://localhost:5000/api/auth/signup", {
      email,
      password
    });

    nav("/login");
  };

  // GOOGLE SIGNUP / LOGIN
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
      <h2>Signup</h2>

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

      <button onClick={signup}>Signup</button>

      <div className="or">OR</div>

      {/* GOOGLE */}
      <GoogleLogin
        onSuccess={googleAuth}
        onError={() => alert("Google signup failed")}
      />
    </div>
  );
}
