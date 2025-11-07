import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

export default function Registration() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id === "Temur" && password === "Beybi") {
      setMessage("Kirish muvaffaqiyatli ✅");
      setTimeout(() => {
        navigate("/asosiypanel");
      }, 1000);
    } else {
      setMessage("ID yoki Parol noto'g'ri ❌");
    }
  };

  return (
    <div className="reg-page">
      <form className="reg-card" onSubmit={handleSubmit}>
        <h2 className="reg-title"></h2>

        <label className="reg-label">
          ID:
          <input
            className="reg-input"
            type="text"
            placeholder="Admin ID kiriting"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>

        <label className="reg-label">
          Parol:
          <input
            className="reg-input"
            type="password"
            placeholder="Parol kiriting"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <div className="reg-buttons">
          <button type="submit" className="btn primary">
            Registratsiya
          </button>
          <a href="/IshUchun" className="btn secondary" style={{textDecoration: "none"}}
          >Ish uchun</a>
        </div>

        {message && <p className="reg-message">{message}</p>}
      </form>
    </div>
  );
}
