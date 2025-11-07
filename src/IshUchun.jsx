import React, { useState } from "react";

export default function IshchiUchun() {
  const [formData, setFormData] = useState({ ism: "", familya: "", yosh: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ff8c00", 
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "350px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Ish Uchun</h2>

        <div style={{ marginBottom: "10px", textAlign: "left" }}>
          <label>Ism:</label>
          <input
            type="text"
            name="ism"
            value={formData.ism}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px", textAlign: "left" }}>
          <label>Familya:</label>
          <input
            type="text"
            name="familya"
            value={formData.familya}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "20px", textAlign: "left" }}>
          <label>Yosh:</label>
          <input
            type="number"
            name="yosh"
            value={formData.yosh}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <a
            href="/registratsiya"
            style={{
              padding: "10px 15px",
              backgroundColor: "#28a745",
              color: "white",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Tasdiqlash
          </a>

          <a
            href="/registratsiya"
            style={{
              padding: "10px 15px",
              backgroundColor: "#dc3545",
              color: "white",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Bekor qilish
          </a>
        </div>
      </div>
    </div>
  );
}
