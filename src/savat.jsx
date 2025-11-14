import React, { useEffect, useState } from "react";
import axios from "axios";

const API_CART = "https://298b1070ddfa6308.mokky.dev/cart";
const USER_ID = "temurbeybi123";

export default function Savat() {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_CART}?userId=${USER_ID}`);
      setCartItems(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (cartItemId, newQty) => {
    try {
      await axios.patch(`${API_CART}/${cartItemId}`, { quantity: newQty });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete(`${API_CART}/${cartItemId}`);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = async () => {
    try {
      for (const item of cartItems) {
        await axios.delete(`${API_CART}/${item.id}`);
      }
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div style={{ padding: "40px", fontFamily: "Poppins, sans-serif", minHeight: "100vh" }}>
      <h1 style={{ color: "#ff8c00", marginBottom: "20px" }}>🛒 Savatingiz</h1>
      {cartItems.length === 0 ? (
        <p>Savat bo‘sh 😅</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          {cartItems.map(item => (
            <div key={item.id} style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10,
              borderRadius: 8,
              boxShadow: "0 3px 6px rgba(0,0,0,0.1)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                <img src={item.imageUrl} alt={item.name} width={80} style={{ borderRadius: 8 }} />
                <div>
                  <h3 style={{ margin: 0 }}>{item.name}</h3>
                  <p style={{ margin: 0, color: "#777" }}>{item.price} so‘m</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                  style={{ width: 60, padding: 5, borderRadius: 6, border: "1px solid #ccc" }}
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ padding: "6px 10px", backgroundColor: "#e74c3c", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}
                >❌</button>
              </div>
            </div>
          ))}
          <h2 style={{ marginTop: 20 }}>Jami: {total.toLocaleString()} so‘m</h2>
          <button
            onClick={clearCart}
            style={{ padding: "10px 20px", backgroundColor: "#ff8c00", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}
          >🧹 Savatni tozalash</button>
        </div>
      )}
    </div>
  );
}
