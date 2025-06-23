import React, { useState, useEffect } from "react";

interface DiagnosticResult {
  test: string;
  status: "pass" | "fail" | "warning" | "pending";
  message: string;
  details?: string;
}

const LoadDiagnostic = () => {
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runDiagnostics = async () => {
    setIsRunning(true);
    const diagnostics: DiagnosticResult[] = [];

    // Test 1: Basic JavaScript
    try {
      const testObj = { test: "value" };
      diagnostics.push({
        test: "JavaScript Engine",
        status: "pass",
        message: "JavaScript execution working",
        details: `Object test: ${JSON.stringify(testObj)}`,
      });
    } catch (error) {
      diagnostics.push({
        test: "JavaScript Engine",
        status: "fail",
        message: "JavaScript execution failed",
        details: error.message,
      });
    }

    // Test 2: React
    try {
      const reactVersion = React.version;
      diagnostics.push({
        test: "React Framework",
        status: "pass",
        message: `React ${reactVersion} loaded successfully`,
      });
    } catch (error) {
      diagnostics.push({
        test: "React Framework",
        status: "fail",
        message: "React not accessible",
        details: error.message,
      });
    }

    // Test 3: Network connectivity
    try {
      const startTime = performance.now();
      const response = await fetch(window.location.origin + "/health", {
        method: "GET",
        cache: "no-cache",
      });
      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);

      if (response.ok) {
        diagnostics.push({
          test: "Network Connectivity",
          status: "pass",
          message: `Health check successful (${responseTime}ms)`,
          details: `Status: ${response.status} ${response.statusText}`,
        });
      } else {
        diagnostics.push({
          test: "Network Connectivity",
          status: "warning",
          message: `Health check responded but with status ${response.status}`,
          details: `Response time: ${responseTime}ms`,
        });
      }
    } catch (error) {
      diagnostics.push({
        test: "Network Connectivity",
        status: "fail",
        message: "Network request failed",
        details: error.message,
      });
    }

    // Test 4: Local Storage
    try {
      const testKey = "diagnostic_test";
      const testValue = "test_" + Date.now();
      localStorage.setItem(testKey, testValue);
      const retrieved = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);

      if (retrieved === testValue) {
        diagnostics.push({
          test: "Local Storage",
          status: "pass",
          message: "Local storage working correctly",
        });
      } else {
        diagnostics.push({
          test: "Local Storage",
          status: "fail",
          message: "Local storage data mismatch",
        });
      }
    } catch (error) {
      diagnostics.push({
        test: "Local Storage",
        status: "fail",
        message: "Local storage not accessible",
        details: error.message,
      });
    }

    // Test 5: Memory usage
    try {
      if ("memory" in performance) {
        const memory = (performance as any).memory;
        const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);
        const totalMB = Math.round(memory.totalJSHeapSize / 1024 / 1024);

        diagnostics.push({
          test: "Memory Usage",
          status: usedMB > 100 ? "warning" : "pass",
          message: `Using ${usedMB}MB of ${totalMB}MB`,
          details: `Limit: ${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)}MB`,
        });
      } else {
        diagnostics.push({
          test: "Memory Usage",
          status: "warning",
          message: "Memory API not available",
        });
      }
    } catch (error) {
      diagnostics.push({
        test: "Memory Usage",
        status: "fail",
        message: "Memory check failed",
        details: error.message,
      });
    }

    setResults(diagnostics);
    setIsRunning(false);
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass":
        return "#10b981";
      case "fail":
        return "#ef4444";
      case "warning":
        return "#f59e0b";
      case "pending":
        return "#6b7280";
      default:
        return "#6b7280";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return "✅";
      case "fail":
        return "❌";
      case "warning":
        return "⚠️";
      case "pending":
        return "⏳";
      default:
        return "❓";
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #1e293b 0%, #7c3aed 50%, #1e293b 100%)",
        color: "white",
        padding: "2rem",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "2rem",
            textAlign: "center",
            background: "linear-gradient(45deg, #06b6d4, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          🔧 Load Diagnostic
        </h1>

        <div
          style={{
            background: "rgba(0,0,0,0.3)",
            borderRadius: "12px",
            padding: "2rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", margin: 0 }}>System Tests</h2>
            <button
              onClick={runDiagnostics}
              disabled={isRunning}
              style={{
                background: isRunning
                  ? "#6b7280"
                  : "linear-gradient(45deg, #06b6d4, #8b5cf6)",
                color: "white",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                cursor: isRunning ? "not-allowed" : "pointer",
                fontWeight: "bold",
              }}
            >
              {isRunning ? "🔄 Running..." : "🔄 Run Tests"}
            </button>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {results.map((result, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "1rem",
                  borderLeft: `4px solid ${getStatusColor(result.status)}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: "1.1rem" }}>
                    {getStatusIcon(result.status)} {result.test}
                  </h3>
                  <span
                    style={{
                      background: getStatusColor(result.status),
                      color: "white",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "12px",
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                    }}
                  >
                    {result.status.toUpperCase()}
                  </span>
                </div>
                <p style={{ margin: "0 0 0.5rem 0", color: "#d1d5db" }}>
                  {result.message}
                </p>
                {result.details && (
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.85rem",
                      color: "#9ca3af",
                      fontFamily: "monospace",
                      background: "rgba(0,0,0,0.3)",
                      padding: "0.5rem",
                      borderRadius: "4px",
                    }}
                  >
                    {result.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "rgba(0,0,0,0.3)",
            borderRadius: "12px",
            padding: "2rem",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            Troubleshooting Steps
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {[
              "1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)",
              "2. Clear browser cache and cookies",
              "3. Try incognito/private browsing mode",
              "4. Disable browser extensions temporarily",
              "5. Check network connectivity",
              "6. Try a different browser (Chrome, Firefox, Safari)",
              "7. Check if antivirus/firewall is blocking the site",
            ].map((step, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "0.75rem",
                  borderRadius: "6px",
                }}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            onClick={() => (window.location.href = "/")}
            style={{
              background: "linear-gradient(45deg, #06b6d4, #8b5cf6)",
              color: "white",
              border: "none",
              padding: "1rem 2rem",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            🏠 Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadDiagnostic;
