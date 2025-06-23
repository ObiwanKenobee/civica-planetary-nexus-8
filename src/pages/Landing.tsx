import React from "react";

// Minimal, bulletproof Landing page with zero external dependencies
const Landing = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #1e293b 0%, #7c3aed 50%, #1e293b 100%)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "20px",
        textAlign: "center",
      }}
    >
      {/* Status Indicator */}
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: "#10b981",
          color: "white",
          padding: "8px 16px",
          borderRadius: "20px",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        ✅ SYSTEM ONLINE
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: "800px" }}>
        <h1
          style={{
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: "bold",
            background: "linear-gradient(45deg, #06b6d4, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "2rem",
            lineHeight: "1.1",
          }}
        >
          Sacred Portal
        </h1>

        <p
          style={{
            fontSize: "1.5rem",
            color: "#a78bfa",
            marginBottom: "3rem",
            fontWeight: "500",
          }}
        >
          Welcome to the Future of Collaboration
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "4rem",
          }}
        >
          <button
            onClick={() => (window.location.href = "/auth")}
            style={{
              background: "linear-gradient(45deg, #06b6d4, #8b5cf6)",
              color: "white",
              border: "none",
              padding: "1rem 2rem",
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "transform 0.2s ease",
              minWidth: "160px",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            🚀 Enter Portal
          </button>

          <button
            onClick={() => (window.location.href = "/billing")}
            style={{
              background: "transparent",
              color: "white",
              border: "2px solid rgba(255,255,255,0.3)",
              padding: "1rem 2rem",
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              minWidth: "160px",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "rgba(255,255,255,0.1)";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "transparent";
              e.target.style.transform = "scale(1)";
            }}
          >
            💳 View Plans
          </button>
        </div>

        {/* Quick Access Menu */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {[
            {
              name: "Dashboard",
              path: "/dashboard",
              icon: "🌐",
              desc: "Your intelligence nexus",
            },
            {
              name: "SignalTemple",
              path: "/signal-temple",
              icon: "💜",
              desc: "Sacred communication",
            },
            {
              name: "Guardian",
              path: "/guardian",
              icon: "🛡️",
              desc: "Oversight system",
            },
            {
              name: "Security",
              path: "/security",
              icon: "🧠",
              desc: "Advanced protection",
            },
          ].map((item) => (
            <div
              key={item.name}
              onClick={() => (window.location.href = item.path)}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "12px",
                padding: "1.5rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                backdropFilter: "blur(10px)",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "rgba(255,255,255,0.2)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "rgba(255,255,255,0.1)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                {item.icon}
              </div>
              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                {item.name}
              </div>
              <div style={{ fontSize: "0.9rem", color: "#d1d5db" }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "0.9rem",
          color: "#9ca3af",
          textAlign: "center",
        }}
      >
        CIVICA 144 • Sacred Technology Platform • {new Date().getFullYear()}
      </div>

      {/* Debug Info */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          fontSize: "0.8rem",
          color: "#6b7280",
          background: "rgba(0,0,0,0.5)",
          padding: "8px",
          borderRadius: "6px",
        }}
      >
        🔧 Load Status: SUCCESS
        <br />⚡ React: {React.version}
        <br />
        🕒 {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default Landing;
