import React, { useContext, useState } from "react";
import { ProductsContext } from "./App";

export default function Mahsulotlar() {
  const { products, setProducts } = useContext(ProductsContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(""); // ✅ Description qo‘shildi
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const filePreview = URL.createObjectURL(file);
      setPreview(filePreview);
    }
  };

  const addOrUpdateProduct = () => {
    if (!name.trim() || !price) {
      alert("Iltimos nom va narx kiriting.");
      return;
    }

    const finalImage = imageUrl.trim() ? imageUrl.trim() : preview || "";

    if (editingId) {
      const updated = products.map((p) =>
        p.id === editingId
          ? { ...p, name: name.trim(), price: Number(price), imageUrl: finalImage, description: description.trim() }
          : p
      );
      setProducts(updated);
      setEditingId(null);
    } else {
      const newProduct = {
        id: Date.now(),
        name: name.trim(),
        price: Number(price),
        imageUrl: finalImage,
        description: description.trim(), // ✅ Yangi description
      };
      setProducts([...products, newProduct]);
    }

    setName("");
    setPrice("");
    setDescription(""); // ✅ Tozalash
    setImageUrl("");
    setImageFile(null);
    setPreview(null);
  };

  const deleteProduct = (id) => {
    if (!window.confirm("Mahsulotni o‘chirmoqchimisiz?")) return;
    setProducts(products.filter((p) => p.id !== id));
  };

  const editProduct = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description || ""); // ✅ Editda description
    setImageUrl(product.imageUrl);
    setPreview(product.imageUrl);
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

      <h1 style={{ color: "#ff8c00", marginBottom: "20px" }}>
        🧺 Mahsulotlarni boshqarish
      </h1>

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
          placeholder="Rasm URL (ixtiyoriy)"
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
            if (e.target.value) setPreview(e.target.value);
          }}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            flex: "1.5",
            minWidth: "200px",
          }}
        />

        <label
          htmlFor="image-upload"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px dashed #ff8c00",
            borderRadius: "10px",
            padding: "10px 15px",
            cursor: "pointer",
            backgroundColor: "#fff8f0",
            color: "#ff8c00",
            fontWeight: "600",
            flex: "1",
            transition: "0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ffe6cc")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff8f0")}
        >
          📁 Fayldan tanlash
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </label>

        <input
          type="text"
          placeholder="Mahsulot tarifi (ixtiyoriy)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            flex: "2",
            minWidth: "200px",
          }}
        />

        <button
          onClick={addOrUpdateProduct}
          style={{
            padding: "10px 20px",
            backgroundColor: editingId ? "#28a745" : "#ff8c00",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {editingId ? "💾 Yangilash" : "➕ Qo‘shish"}
        </button>
      </div>

      {preview && (
        <div style={{ marginBottom: "25px" }}>
          <p style={{ fontWeight: "600", color: "#555" }}>🖼 Rasm preview:</p>
          <img
            src={preview}
            alt="Preview"
            style={{
              width: "220px",
              height: "160px",
              objectFit: "cover",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          />
        </div>
      )}

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
            <p style={{ color: "#555", fontSize: "0.9rem" }}>{p.description}</p> {/* ✅ Tarif ko‘rsatish */}

            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <button
                onClick={() => editProduct(p)}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                ✏️ Edit
              </button>

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
          </div>
        ))}
      </div>
    </div>
  );
}
