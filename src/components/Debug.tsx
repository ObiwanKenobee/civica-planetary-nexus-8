export default function Debug() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>CIVICA 144 Debug Mode</h1>
        <p>✅ React is working</p>
        <p>✅ Component rendering is working</p>
        <p>✅ CSS is working</p>
        <p>Timestamp: {new Date().toISOString()}</p>
      </div>
    </div>
  );
}
