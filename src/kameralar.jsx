import React from "react";

export default function Kameralar() {
  const rooms = 5;
  const camerasPerRoom = 5;

  const roomStyle = {
    marginBottom: "30px",
  };

  const cameraCardStyle = {
    display: "inline-block",
    width: "150px",
    height: "100px",
    margin: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
    lineHeight: "100px",
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.2s",
  };

  const hoverCard = (e) => (e.target.style.backgroundColor = "#d1e7dd");
  const leaveCard = (e) => (e.target.style.backgroundColor = "#f0f0f0");

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

      <h1>Kameralar bo‘limi</h1>

      {[...Array(rooms)].map((_, roomIndex) => (
        <div key={roomIndex} style={roomStyle}>
          <h2>{roomIndex + 1}chi xona</h2>
          <div>
            {[...Array(camerasPerRoom)].map((_, camIndex) => (
              <div
                key={camIndex}
                style={cameraCardStyle}
                onMouseEnter={hoverCard}
                onMouseLeave={leaveCard}
              >
                 {camIndex + 1}-kamera
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
