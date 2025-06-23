// CIVICA 144 - Vercel Health Check Endpoint
// Simple health check for Vercel Functions

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
    const healthData = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: process.env.VITE_APP_VERSION || "1.0.0",
      environment: process.env.VITE_APP_ENVIRONMENT || "production",
      platform: "vercel",
      uptime: Math.round(process.uptime()),
      checks: {
        server: {
          status: "pass",
          message: "Server is running",
        },
        memory: {
          status: "pass",
          usage:
            Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + "MB",
        },
      },
    };

    // Set cache headers
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("X-Health-Status", "healthy");

    res.status(200).json(healthData);
  } catch (error) {
    console.error("Health check error:", error);

    res.setHeader("Content-Type", "application/json");
    res.setHeader("X-Health-Status", "unhealthy");

    res.status(503).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: error.message || "Unknown error",
    });
  }
}
