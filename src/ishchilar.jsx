import React, { useState } from "react";

export default function Ishchilar() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ ism: "", familya: "", yosh: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = { id: Date.now(), ...formData };
    setEmployees([...employees, newEmployee]);
    setFormData({ ism: "", familya: "", yosh: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <div>
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

      <h1>Ishchilar bo‘limi</h1>

      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          cursor: "pointer",
          borderRadius: "6px",
          backgroundColor: "#ff8c00",
          color: "white",
          border: "none",
          fontWeight: "bold",
        }}
      >
        ADD
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginBottom: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            maxWidth: "400px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <label>Ism: </label>
            <input
              type="text"
              name="ism"
              value={formData.ism}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Familya: </label>
            <input
              type="text"
              name="familya"
              value={formData.familya}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Yosh: </label>
            <input
              type="number"
              name="yosh"
              value={formData.yosh}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "8px 15px",
              cursor: "pointer",
              borderRadius: "6px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              fontWeight: "bold",
            }}
          >
            Submit
          </button>
        </form>
      )}

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Ism</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Familya</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Yosh</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Amallar</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{emp.ism}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{emp.familya}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{emp.yosh}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <button
                  onClick={() => handleDelete(emp.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "10px" }}>
                Ishchi yo‘q
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
