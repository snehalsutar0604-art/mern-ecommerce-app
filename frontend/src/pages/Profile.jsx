import "../styles/Profile.css";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <h2>Please login</h2>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img
          src={
            user.photo ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="profile"
        />
        <h3>{user.email}</h3>
        <p>{user.photo ? "Google Login" : "Normal Login"}</p>
        
<button onClick={() => navigate("/my-orders")}>
  My Orders
</button>
      </div>
    </div>
  );
}
