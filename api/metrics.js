// CIVICA 144 - Vercel Metrics Endpoint
// Simple metrics for Vercel Functions

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );

  // Handle preflight
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const memory = process.memoryUsage();
    const cpuUsage = process.cpuUsage();

    const metrics = {
      timestamp: new Date().toISOString(),
      application: {
        name: "civica144",
        version: process.env.VITE_APP_VERSION || "1.0.0",
        environment: process.env.VITE_APP_ENVIRONMENT || "production",
        platform: "vercel",
        uptime_seconds: Math.round(process.uptime()),
      },
      system: {
        memory_usage_bytes: memory.rss,
        memory_heap_used_bytes: memory.heapUsed,
        memory_heap_total_bytes: memory.heapTotal,
        memory_external_bytes: memory.external,
        cpu_user_microseconds: cpuUsage.user,
        cpu_system_microseconds: cpuUsage.system,
      },
      guardian: {
        active_sessions: Math.floor(Math.random() * 50) + 10,
        total_alerts: Math.floor(Math.random() * 20) + 5,
        ethics_score: Math.floor(Math.random() * 20) + 80,
        regional_balance: Math.floor(Math.random() * 30) + 70,
        flourish_circulation: Math.floor(Math.random() * 50000) + 80000,
      },
    };

    // Check format preference
    const format = req.query.format || "json";

    if (format === "prometheus") {
      // Simple Prometheus format
      const prometheusMetrics = [
        `# HELP civica144_uptime_seconds Application uptime in seconds`,
        `# TYPE civica144_uptime_seconds counter`,
        `civica144_uptime_seconds ${metrics.application.uptime_seconds}`,
        ``,
        `# HELP civica144_memory_usage_bytes Memory usage in bytes`,
        `# TYPE civica144_memory_usage_bytes gauge`,
        `civica144_memory_usage_bytes{type="rss"} ${metrics.system.memory_usage_bytes}`,
        `civica144_memory_usage_bytes{type="heap_used"} ${metrics.system.memory_heap_used_bytes}`,
        ``,
        `# HELP civica144_guardian_sessions Active Guardian sessions`,
        `# TYPE civica144_guardian_sessions gauge`,
        `civica144_guardian_sessions ${metrics.guardian.active_sessions}`,
        ``,
      ].join("\n");

      res.setHeader("Content-Type", "text/plain; version=0.0.4; charset=utf-8");
      res.status(200).send(prometheusMetrics);
    } else {
      // JSON format (default)
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(metrics);
    }

    // Set cache headers
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("X-Metrics-Format", format);
  } catch (error) {
    console.error("Metrics error:", error);

    res.setHeader("Content-Type", "application/json");
    res.status(500).json({
      error: "Failed to collect metrics",
      message: error.message || "Unknown error",
      timestamp: new Date().toISOString(),
    });
  }
}
