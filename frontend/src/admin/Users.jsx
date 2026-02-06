import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/AdminUsers.css";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => setUsers(res.data))
    .catch(err => console.log("USER FETCH ERROR:", err));
  }, []);

  return (
    <div className="admin-page">
      <h2>All Users</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Login Type</th>
            </tr>
          </thead>

          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>
                  <img 
                    src={u.photo || "/default-user.png"} 
                    className="user-avatar"
                    alt="user"
                  />
                </td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.loginType || "normal"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
