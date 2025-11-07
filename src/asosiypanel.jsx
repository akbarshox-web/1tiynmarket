import React from "react";

export default function AsosiyPanel() {
  const buttonStyle = {
    display: "block",
    width: "160px",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "white",
    cursor: "pointer",
    fontWeight: "bold",
    textAlign: "center",
    textDecoration: "none",
    color: "black",
    marginBottom: "10px",
    transition: "0.2s",
  };

  const hover = (e) => (e.target.style.backgroundColor = "#ffd699");
  const leave = (e) => (e.target.style.backgroundColor = "white");

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      <div
        style={{
          width: "220px",
          backgroundColor: "#ff8c00", 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "40px",
        }}
      >
        <h2 style={{ color: "white", marginBottom: "40px" }}>Admin Panel</h2>

        <a
          href="/ishchilar"
          style={buttonStyle}
          onMouseEnter={hover}
          onMouseLeave={leave}
        >
          Ishchilar
        </a>

        <a
          href="/kameralar"
          style={buttonStyle}
          onMouseEnter={hover}
          onMouseLeave={leave}
        >
          Kameralar
        </a>

        <a
          href="/mahsulotlar"
          style={buttonStyle}
          onMouseEnter={hover}
          onMouseLeave={leave}
        >
          Mahsulotlar
        </a>
      </div>
      <div style={{ flex: 1, padding: "30px" }}>
        <h1>1Tiyn Market Admini</h1>
      </div>
    </div>
  );
}
