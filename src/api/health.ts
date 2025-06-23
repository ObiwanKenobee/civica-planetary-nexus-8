// CIVICA 144 - Health Check Endpoint
// Production-ready health monitoring for AWS, Azure, and Vercel

import type { VercelRequest, VercelResponse } from "@vercel/node";

interface HealthStatus {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  version: string;
  environment: string;
  platform: string;
  uptime: number;
  checks: {
    [key: string]: {
      status: "pass" | "warn" | "fail";
      message?: string;
      responseTime?: number;
    };
  };
  system: {
    memory?: {
      used: number;
      total: number;
      percentage: number;
    };
    disk?: {
      used: number;
      total: number;
      percentage: number;
    };
  };
}

// Memory usage check (Node.js specific)
function getMemoryUsage() {
  const usage = process.memoryUsage();
  return {
    used: Math.round(usage.heapUsed / 1024 / 1024), // MB
    total: Math.round(usage.heapTotal / 1024 / 1024), // MB
    percentage: Math.round((usage.heapUsed / usage.heapTotal) * 100),
  };
}

// Check external service connectivity
async function checkExternalServices(): Promise<{ [key: string]: any }> {
  const checks: { [key: string]: any } = {};

  // Check Paystack API
  try {
    const start = Date.now();
    const response = await fetch("https://api.paystack.co/bank", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY || "test"}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    checks.paystack = {
      status: response.ok ? "pass" : "warn",
      message: response.ok
        ? "Paystack API accessible"
        : `HTTP ${response.status}`,
      responseTime: Date.now() - start,
    };
  } catch (error) {
    checks.paystack = {
      status: "fail",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }

  // Check PayPal API
  try {
    const start = Date.now();
    const response = await fetch("https://api.paypal.com/v1/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${process.env.VITE_PAYPAL_CLIENT_ID || "test"}:${process.env.PAYPAL_CLIENT_SECRET || "test"}`).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
      signal: AbortSignal.timeout(5000),
    });

    checks.paypal = {
      status: response.status === 401 ? "warn" : response.ok ? "pass" : "fail",
      message:
        response.status === 401
          ? "PayPal API accessible (auth expected)"
          : response.ok
            ? "PayPal API accessible"
            : `HTTP ${response.status}`,
      responseTime: Date.now() - start,
    };
  } catch (error) {
    checks.paypal = {
      status: "fail",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }

  return checks;
}

// Environment checks
function checkEnvironment(): { [key: string]: any } {
  const checks: { [key: string]: any } = {};

  // Check required environment variables
  const requiredEnvVars = [
    "VITE_APP_ENVIRONMENT",
    "VITE_PAYSTACK_PUBLIC_KEY",
    "VITE_PAYPAL_CLIENT_ID",
  ];

  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar],
  );

  checks.environment = {
    status: missingEnvVars.length === 0 ? "pass" : "warn",
    message:
      missingEnvVars.length === 0
        ? "All required environment variables present"
        : `Missing: ${missingEnvVars.join(", ")}`,
  };

  // Check Node.js version
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split(".")[0]);

  checks.nodejs = {
    status: majorVersion >= 18 ? "pass" : "warn",
    message: `Node.js ${nodeVersion} (recommended: >= 18.x)`,
  };

  return checks;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const startTime = Date.now();

  try {
    // Get basic system info
    const uptime = process.uptime();
    const memory = getMemoryUsage();

    // Perform health checks
    const [externalChecks, environmentChecks] = await Promise.allSettled([
      checkExternalServices(),
      Promise.resolve(checkEnvironment()),
    ]);

    const allChecks = {
      ...(environmentChecks.status === "fulfilled"
        ? environmentChecks.value
        : {}),
      ...(externalChecks.status === "fulfilled" ? externalChecks.value : {}),
    };

    // Determine overall status
    const hasFailures = Object.values(allChecks).some(
      (check) => check.status === "fail",
    );
    const hasWarnings = Object.values(allChecks).some(
      (check) => check.status === "warn",
    );

    let overallStatus: "healthy" | "degraded" | "unhealthy";
    if (hasFailures) {
      overallStatus = "unhealthy";
    } else if (hasWarnings) {
      overallStatus = "degraded";
    } else {
      overallStatus = "healthy";
    }

    const healthStatus: HealthStatus = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version: process.env.VITE_APP_VERSION || "1.0.0",
      environment: process.env.VITE_APP_ENVIRONMENT || "development",
      platform: process.env.VITE_DEPLOYMENT_PLATFORM || "unknown",
      uptime: Math.round(uptime),
      checks: allChecks,
      system: {
        memory,
      },
    };

    // Set appropriate HTTP status code
    const statusCode =
      overallStatus === "healthy"
        ? 200
        : overallStatus === "degraded"
          ? 200
          : 503;

    // Set cache headers
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Content-Type", "application/json");

    // Add custom headers for monitoring
    res.setHeader("X-Health-Status", overallStatus);
    res.setHeader("X-Response-Time", `${Date.now() - startTime}ms`);
    res.setHeader("X-Guardian-Health", "monitored");

    res.status(statusCode).json(healthStatus);
  } catch (error) {
    console.error("Health check error:", error);

    const errorResponse: HealthStatus = {
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      version: process.env.VITE_APP_VERSION || "1.0.0",
      environment: process.env.VITE_APP_ENVIRONMENT || "development",
      platform: process.env.VITE_DEPLOYMENT_PLATFORM || "unknown",
      uptime: Math.round(process.uptime()),
      checks: {
        healthcheck: {
          status: "fail",
          message:
            error instanceof Error
              ? error.message
              : "Unknown health check error",
        },
      },
      system: {},
    };

    res.setHeader("Content-Type", "application/json");
    res.setHeader("X-Health-Status", "unhealthy");
    res.status(503).json(errorResponse);
  }
}

// Export for testing
export { checkExternalServices, checkEnvironment, getMemoryUsage };
