import React, { useContext, useState } from "react";
import { ProductsContext } from "./App";

export default function Market() {
  const { products } = useContext(ProductsContext);

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("none");

  const filteredProducts = products
    .filter((p) =>
      p.name.toLowerCase().includes(search.trim().toLowerCase())
    )
    .filter((p) => (minPrice ? p.price >= Number(minPrice) : true))
    .filter((p) => (maxPrice ? p.price <= Number(maxPrice) : true))
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      if (sortOrder === "az") return a.name.localeCompare(b.name);
      if (sortOrder === "za") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div style={{ padding: "30px", fontFamily: "Poppins, sans-serif", backgroundColor: "#fdf6f0", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#ff8c00", marginBottom: "25px" }}>1Tiyn Market 🛒</h1>

      {/* 🔧 Filtr paneli */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "25px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Qidiruv..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", width: "160px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          type="number"
          placeholder="Min narx"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          style={{ padding: "8px", width: "120px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          type="number"
          placeholder="Max narx"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{ padding: "8px", width: "120px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        >
          <option value="none">Tartiblash</option>
          <option value="asc">Narx (arzon → qimmat)</option>
          <option value="desc">Narx (qimmat → arzon)</option>
          <option value="az">Nom (A-Z)</option>
          <option value="za">Nom (Z-A)</option>
        </select>
        <button
          onClick={() => {
            setSearch("");
            setMinPrice("");
            setMaxPrice("");
            setSortOrder("none");
          }}
          style={{
            padding: "8px 12px",
            backgroundColor: "#ff8c00",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Tozalash
        </button>
      </div>

      {/* 📦 Mahsulotlar ro‘yxati */}
      {filteredProducts.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>Hech narsa topilmadi.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "15px",
                textAlign: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
              }}
            >
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "8px" }}
                />
              )}
              <h3 style={{ margin: "10px 0 5px", fontSize: "1rem", fontWeight: "600" }}>{p.name}</h3>
              <p style={{ margin: "0 0 10px", color: "#555", fontWeight: "bold" }}>{p.price} so'm</p>
              <button
                style={{
                  backgroundColor: "#ff8c00",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Savatga qo‘shish 🛍️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
