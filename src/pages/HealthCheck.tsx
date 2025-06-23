// Simple health check page to verify basic app functionality
import React from "react";

const HealthCheck = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#00ff00",
        fontFamily: "monospace",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>
        🟢 CIVICA 144 HEALTH CHECK
      </h1>

      <div
        style={{
          background: "#1a1a1a",
          padding: "20px",
          borderRadius: "8px",
          border: "1px solid #00ff00",
          minWidth: "400px",
        }}
      >
        <h2 style={{ color: "#00ff00", marginBottom: "1rem" }}>
          System Status:
        </h2>

        <div style={{ marginBottom: "0.5rem" }}>✅ React: {React.version}</div>

        <div style={{ marginBottom: "0.5rem" }}>✅ JavaScript: Working</div>

        <div style={{ marginBottom: "0.5rem" }}>✅ CSS: Working</div>

        <div style={{ marginBottom: "0.5rem" }}>✅ Routing: Working</div>

        <div style={{ marginBottom: "1rem" }}>
          ✅ Timestamp: {new Date().toISOString()}
        </div>

        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <button
            style={{
              background: "#00ff00",
              color: "#000",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => {
              alert("✅ Event handling is working!");
              console.log(
                "Health check button clicked at:",
                new Date().toISOString(),
              );
            }}
          >
            Test Interaction
          </button>
        </div>
      </div>

      <div style={{ marginTop: "2rem", fontSize: "0.9rem", opacity: 0.7 }}>
        If you can see this page, the basic app infrastructure is working
        properly.
      </div>
    </div>
  );
};

export default HealthCheck;
