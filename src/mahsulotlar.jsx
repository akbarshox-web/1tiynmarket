import React, { useContext, useState } from "react";
import { ProductsContext } from "./App";

export default function Mahsulotlar() {
  const { products, setProducts } = useContext(ProductsContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const addProduct = () => {
    if (!name.trim() || !price) {
      alert("Iltimos nom va narx kiriting.");
      return;
    }
    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      price: Number(price),
      imageUrl: imageUrl.trim(),
    };
    setProducts([...products, newProduct]);
    setName("");
    setPrice("");
    setImageUrl("");
  };

  const deleteProduct = (id) => {
    if (!window.confirm("Mahsulotni o‘chirmoqchimisiz?")) return;
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "linear-gradient(180deg, #fff, #fff5e6)",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
      }}
    >
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
      <h1 style={{ color: "#ff8c00", marginBottom: "20px" }}>🧺 Mahsulotlarni boshqarish</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Mahsulot nomi"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            flex: "1",
            minWidth: "150px",
          }}
        />
        <input
          type="number"
          placeholder="Narx (so‘m)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "130px",
          }}
        />
        <input
          type="text"
          placeholder="Rasm URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            flex: "1.5",
            minWidth: "200px",
          }}
        />
        <button
          onClick={addProduct}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff8c00",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          ➕ Qo‘shish
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
              padding: "12px",
              textAlign: "center",
              transition: "transform 0.2s",
            }}
          >
            {p.imageUrl ? (
              <img
                src={p.imageUrl}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "150px",
                  backgroundColor: "#ffe0b3",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ff8c00",
                  fontWeight: "600",
                }}
              >
                Rasm yo‘q
              </div>
            )}
            <h3>{p.name}</h3>
            <p style={{ color: "#777", margin: "5px 0" }}>{p.price} so‘m</p>
            <button
              onClick={() => deleteProduct(p.id)}
              style={{
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "6px 10px",
                cursor: "pointer",
              }}
            >
              🗑 O‘chirish
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
