import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Checkout.css";

export default function Checkout() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const continueToPayment = async () => {
    if (!name || phone.length !== 10 || !address) {
      alert("Fill all details properly");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/checkout/save",
        { name, phone, address },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      navigate("/payment");
    } catch (err) {
      console.log(err.response?.data);
      alert("Unauthorized / Server error");
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-box">
        <h2>Review Order</h2>

        <input placeholder="Full Name" onChange={e => setName(e.target.value)} />
        <input placeholder="Mobile Number" onChange={e => setPhone(e.target.value)} />
        <textarea placeholder="Full Address" onChange={e => setAddress(e.target.value)} />

        <button onClick={continueToPayment}>
          Continue to Payment
        </button>
      </div>
    </div>
  );
}
