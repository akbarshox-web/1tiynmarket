import React, { useContext, useState } from "react";
import { ProductsContext } from "./App";
import axios from "axios";

const API_CART = "https://298b1070ddfa6308.mokky.dev/cart";
const USER_ID = "temurbeybi123";

export default function Market() {
  const { products } = useContext(ProductsContext);

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(search.trim().toLowerCase()))
    .filter((p) => (minPrice ? p.price >= Number(minPrice) : true))
    .filter((p) => (maxPrice ? p.price <= Number(maxPrice) : true))
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      if (sortOrder === "az") return a.name.localeCompare(b.name);
      if (sortOrder === "za") return b.name.localeCompare(a.name);
      return 0;
    });

  const addToCart = async (product) => {
    try {
      await axios.post(API_CART, {
        userId: USER_ID,
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
      });
      alert(`${product.name} savatga qo‘shildi!`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Poppins, sans-serif", backgroundColor: "#fdf6f0", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#ff8c00", marginBottom: "25px" }}>1Tiyn Market 🛒</h1>

      {/* 🔹 Filtr */}
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

      {/* 🔹 Mahsulot kartalari */}
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
              onClick={() => setSelectedProduct(p)} // 🔹 Modalni ochish
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
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(p);
                }}
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

      {/* 🔹 Modal */}
      {selectedProduct && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            style={{
              background: "#fff",
              padding: 30,
              borderRadius: 12,
              width: "90%",
              maxWidth: 500,
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "#e74c3c",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: 30,
                height: 30,
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              ✖
            </button>

            {selectedProduct.imageUrl && (
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                style={{ width: "100%", height: 250, objectFit: "cover", borderRadius: 10, marginBottom: 15 }}
              />
            )}
            <h2>{selectedProduct.name}</h2>
            <p style={{ color: "#777", marginBottom: 10 }}>Narx: {selectedProduct.price} so‘m</p>
            <p>{selectedProduct.description || "Mahsulot haqida to‘liq ma’lumot mavjud emas."}</p>
            <button
              onClick={() => {
                addToCart(selectedProduct);
                setSelectedProduct(null);
              }}
              style={{
                marginTop: 15,
                backgroundColor: "#ff8c00",
                color: "#fff",
                border: "none",
                padding: "10px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Savatga qo‘shish 🛍️
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
