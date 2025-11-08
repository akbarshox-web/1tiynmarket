import React, { useState } from "react";

export default function Ishchilar() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ ism: "", familya: "", yosh: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingId ? { ...emp, ...formData } : emp
        )
      );
      setEditingId(null);
    } else {
      const newEmployee = { id: Date.now(), ...formData };
      setEmployees([...employees, newEmployee]);
    }
    setFormData({ ism: "", familya: "", yosh: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const handleEdit = (emp) => {
    setFormData({ ism: emp.ism, familya: emp.familya, yosh: emp.yosh });
    setEditingId(emp.id);
    setShowForm(true);
  };

  return (
    <div style={{ padding: "30px", background: "#fdf6f0", minHeight: "100vh", fontFamily: "Poppins, sans-serif" }}>
      <a
        href="/asosiypanel"
        style={{
          display: "inline-block",
          marginBottom: "20px",
          padding: "8px 15px",
          backgroundColor: "#ff8c00",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Menu
      </a>

      <h1 style={{ color: "#ff8c00", marginBottom: "20px", textAlign: "center" }}>👥 Ishchilar bo‘limi</h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ ism: "", familya: "", yosh: "" });
          }}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "6px",
            backgroundColor: "#ff8c00",
            color: "white",
            border: "none",
            fontWeight: "bold",
          }}
        >
          {showForm ? "✖ Bekor qilish" : "➕ Ishchi qo‘shish"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginBottom: "30px",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <input
            type="text"
            name="ism"
            placeholder="Ism"
            value={formData.ism}
            onChange={handleChange}
            required
            style={{ padding: "8px", width: "100%", marginBottom: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <input
            type="text"
            name="familya"
            placeholder="Familya"
            value={formData.familya}
            onChange={handleChange}
            required
            style={{ padding: "8px", width: "100%", marginBottom: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <input
            type="number"
            name="yosh"
            placeholder="Yosh"
            value={formData.yosh}
            onChange={handleChange}
            required
            style={{ padding: "8px", width: "100%", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: editingId ? "#007bff" : "#28a745",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {editingId ? "✏️ Tahrirlash" : "✅ Qo‘shish"}
          </button>
        </form>
      )}

      {employees.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>Hozircha ishchi yo‘q</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
          }}
        >
          {employees.map((emp) => (
            <div
              key={emp.id}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "15px",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
              }}
            >
              <h3 style={{ margin: "5px 0", fontSize: "1rem", fontWeight: "600" }}>
                {emp.ism} {emp.familya}
              </h3>
              <p style={{ margin: "5px 0", color: "#777" }}>Yosh: {emp.yosh}</p>

              <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
                <button
                  onClick={() => handleEdit(emp)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#007bff",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  ✏️ Tahrirlash
                </button>

                <button
                  onClick={() => handleDelete(emp.id)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#dc3545",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  🗑 O‘chirish
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
