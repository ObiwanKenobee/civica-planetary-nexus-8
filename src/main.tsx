import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { errorReporter } from "./utils/errorReporting";

// Initialize error reporting
console.log("🔧 CIVICA 144 Error Reporting System Initialized");
console.log("📊 Debug info:", errorReporter.getDebugInfo());

// Enhanced global error handler to catch unhandled errors
window.addEventListener("error", (event) => {
  console.error("🚨 Global error caught:", event.error);
  console.error("📋 Error details:", {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error,
    timestamp: new Date().toISOString(),
  });

  // Show user-friendly error for load failures
  if (
    event.message?.includes("Load failed") ||
    event.error?.message?.includes("Load failed")
  ) {
    console.warn("🔧 Load failed detected - TROUBLESHOOTING STEPS:");
    console.warn("1. Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)");
    console.warn("2. Clear browser cache completely");
    console.warn("3. Try different browser (Chrome, Firefox, Safari)");
    console.warn("4. Check network connectivity");
    console.warn("5. Disable browser extensions temporarily");
    console.warn("6. Check dev tools Network tab for failed requests");

    // Show on-screen notification
    const notification = document.createElement("div");
    notification.style.cssText = `
      position: fixed; top: 10px; left: 50%; transform: translateX(-50%);
      background: #ff4444; color: white; padding: 15px 20px;
      border-radius: 8px; z-index: 10000; font-family: monospace;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3); max-width: 500px;
      text-align: center; border: 2px solid #ff6666;
    `;
    notification.innerHTML = `
      <strong>⚠️ LOAD FAILED ERROR DETECTED</strong><br>
      <small>Try: Ctrl+Shift+R (hard refresh) or clear browser cache</small><br>
      <button onclick="location.reload(true)" style="margin-top: 8px; padding: 4px 8px; background: white; color: #ff4444; border: none; border-radius: 4px; cursor: pointer;">🔄 Force Reload</button>
    `;
    document.body.appendChild(notification);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 10000);
  }
});

// Enhanced promise rejection handler
window.addEventListener("unhandledrejection", (event) => {
  console.error("🚨 Unhandled promise rejection:", event.reason);
  console.error("📋 Rejection details:", {
    reason: event.reason,
    timestamp: new Date().toISOString(),
  });
});

// Load event handlers
window.addEventListener("load", () => {
  console.log("✅ Window loaded successfully at", new Date().toISOString());
});

window.addEventListener("beforeunload", () => {
  console.log("👋 Window unloading at", new Date().toISOString());
});

createRoot(document.getElementById("root")!).render(<App />);
