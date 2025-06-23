// CIVICA 144 - Metrics Endpoint
// Production metrics for monitoring and observability

import type { VercelRequest, VercelResponse } from "@vercel/node";

interface MetricsData {
  timestamp: string;
  application: {
    name: string;
    version: string;
    environment: string;
    platform: string;
    uptime_seconds: number;
  };
  system: {
    memory_usage_bytes: number;
    memory_total_bytes: number;
    memory_usage_percentage: number;
    heap_used_bytes: number;
    heap_total_bytes: number;
    external_bytes: number;
    process_cpu_user_seconds: number;
    process_cpu_system_seconds: number;
  };
  guardian: {
    active_sessions: number;
    total_alerts: number;
    ethics_score: number;
    regional_balance: number;
    ceremonial_overrides: number;
    flourish_circulation: number;
  };
  performance: {
    request_duration_seconds?: number;
    response_size_bytes?: number;
    error_rate: number;
    availability: number;
  };
  business: {
    total_revenue: number;
    active_subscriptions: number;
    refund_requests: number;
    payment_success_rate: number;
  };
}

// Get system metrics
function getSystemMetrics() {
  const usage = process.memoryUsage();
  const cpuUsage = process.cpuUsage();

  return {
    memory_usage_bytes: usage.rss,
    memory_total_bytes: usage.heapTotal + usage.external + usage.arrayBuffers,
    memory_usage_percentage: Math.round(
      (usage.heapUsed / usage.heapTotal) * 100,
    ),
    heap_used_bytes: usage.heapUsed,
    heap_total_bytes: usage.heapTotal,
    external_bytes: usage.external,
    process_cpu_user_seconds: cpuUsage.user / 1000000, // Convert microseconds to seconds
    process_cpu_system_seconds: cpuUsage.system / 1000000,
  };
}

// Mock Guardian metrics (in production, these would come from database/cache)
function getGuardianMetrics() {
  return {
    active_sessions: Math.floor(Math.random() * 50) + 10, // Mock active sessions
    total_alerts: Math.floor(Math.random() * 20) + 5,
    ethics_score: Math.floor(Math.random() * 20) + 80, // 80-100
    regional_balance: Math.floor(Math.random() * 30) + 70, // 70-100
    ceremonial_overrides: Math.floor(Math.random() * 5),
    flourish_circulation: Math.floor(Math.random() * 50000) + 80000, // 80k-130k
  };
}

// Mock performance metrics
function getPerformanceMetrics(requestStartTime: number) {
  return {
    request_duration_seconds: (Date.now() - requestStartTime) / 1000,
    response_size_bytes: 0, // Will be calculated after response
    error_rate: 0.02, // Mock 2% error rate
    availability: 99.9, // Mock 99.9% availability
  };
}

// Mock business metrics
function getBusinessMetrics() {
  return {
    total_revenue: Math.floor(Math.random() * 100000) + 200000, // $200k-$300k
    active_subscriptions: Math.floor(Math.random() * 500) + 1000, // 1000-1500
    refund_requests: Math.floor(Math.random() * 20) + 5, // 5-25
    payment_success_rate: 97.5 + Math.random() * 2, // 97.5-99.5%
  };
}

// Format metrics in Prometheus format
function formatPrometheusMetrics(metrics: MetricsData): string {
  const lines: string[] = [];

  // Add help and type comments
  lines.push("# HELP civica144_uptime_seconds Application uptime in seconds");
  lines.push("# TYPE civica144_uptime_seconds counter");
  lines.push(
    `civica144_uptime_seconds{environment="${metrics.application.environment}",platform="${metrics.application.platform}"} ${metrics.application.uptime_seconds}`,
  );
  lines.push("");

  lines.push("# HELP civica144_memory_usage_bytes Memory usage in bytes");
  lines.push("# TYPE civica144_memory_usage_bytes gauge");
  lines.push(
    `civica144_memory_usage_bytes{type="rss"} ${metrics.system.memory_usage_bytes}`,
  );
  lines.push(
    `civica144_memory_usage_bytes{type="heap_used"} ${metrics.system.heap_used_bytes}`,
  );
  lines.push(
    `civica144_memory_usage_bytes{type="heap_total"} ${metrics.system.heap_total_bytes}`,
  );
  lines.push(
    `civica144_memory_usage_bytes{type="external"} ${metrics.system.external_bytes}`,
  );
  lines.push("");

  lines.push(
    "# HELP civica144_memory_usage_percentage Memory usage percentage",
  );
  lines.push("# TYPE civica144_memory_usage_percentage gauge");
  lines.push(
    `civica144_memory_usage_percentage ${metrics.system.memory_usage_percentage}`,
  );
  lines.push("");

  lines.push("# HELP civica144_cpu_seconds CPU time in seconds");
  lines.push("# TYPE civica144_cpu_seconds counter");
  lines.push(
    `civica144_cpu_seconds{mode="user"} ${metrics.system.process_cpu_user_seconds}`,
  );
  lines.push(
    `civica144_cpu_seconds{mode="system"} ${metrics.system.process_cpu_system_seconds}`,
  );
  lines.push("");

  // Guardian metrics
  lines.push("# HELP civica144_guardian_sessions Active Guardian sessions");
  lines.push("# TYPE civica144_guardian_sessions gauge");
  lines.push(`civica144_guardian_sessions ${metrics.guardian.active_sessions}`);
  lines.push("");

  lines.push("# HELP civica144_guardian_alerts Total Guardian alerts");
  lines.push("# TYPE civica144_guardian_alerts gauge");
  lines.push(`civica144_guardian_alerts ${metrics.guardian.total_alerts}`);
  lines.push("");

  lines.push("# HELP civica144_guardian_ethics_score Guardian ethics score");
  lines.push("# TYPE civica144_guardian_ethics_score gauge");
  lines.push(
    `civica144_guardian_ethics_score ${metrics.guardian.ethics_score}`,
  );
  lines.push("");

  lines.push(
    "# HELP civica144_guardian_regional_balance Regional balance percentage",
  );
  lines.push("# TYPE civica144_guardian_regional_balance gauge");
  lines.push(
    `civica144_guardian_regional_balance ${metrics.guardian.regional_balance}`,
  );
  lines.push("");

  lines.push(
    "# HELP civica144_guardian_ceremonial_overrides Ceremonial overrides count",
  );
  lines.push("# TYPE civica144_guardian_ceremonial_overrides counter");
  lines.push(
    `civica144_guardian_ceremonial_overrides ${metrics.guardian.ceremonial_overrides}`,
  );
  lines.push("");

  lines.push(
    "# HELP civica144_flourish_circulation Flourish token circulation",
  );
  lines.push("# TYPE civica144_flourish_circulation gauge");
  lines.push(
    `civica144_flourish_circulation ${metrics.guardian.flourish_circulation}`,
  );
  lines.push("");

  // Performance metrics
  if (metrics.performance.request_duration_seconds) {
    lines.push(
      "# HELP civica144_request_duration_seconds Request duration in seconds",
    );
    lines.push("# TYPE civica144_request_duration_seconds histogram");
    lines.push(
      `civica144_request_duration_seconds ${metrics.performance.request_duration_seconds}`,
    );
    lines.push("");
  }

  lines.push("# HELP civica144_error_rate Error rate percentage");
  lines.push("# TYPE civica144_error_rate gauge");
  lines.push(`civica144_error_rate ${metrics.performance.error_rate}`);
  lines.push("");

  lines.push("# HELP civica144_availability Availability percentage");
  lines.push("# TYPE civica144_availability gauge");
  lines.push(`civica144_availability ${metrics.performance.availability}`);
  lines.push("");

  // Business metrics
  lines.push("# HELP civica144_revenue_total Total revenue");
  lines.push("# TYPE civica144_revenue_total gauge");
  lines.push(`civica144_revenue_total ${metrics.business.total_revenue}`);
  lines.push("");

  lines.push("# HELP civica144_subscriptions_active Active subscriptions");
  lines.push("# TYPE civica144_subscriptions_active gauge");
  lines.push(
    `civica144_subscriptions_active ${metrics.business.active_subscriptions}`,
  );
  lines.push("");

  lines.push("# HELP civica144_refund_requests Refund requests count");
  lines.push("# TYPE civica144_refund_requests gauge");
  lines.push(`civica144_refund_requests ${metrics.business.refund_requests}`);
  lines.push("");

  lines.push(
    "# HELP civica144_payment_success_rate Payment success rate percentage",
  );
  lines.push("# TYPE civica144_payment_success_rate gauge");
  lines.push(
    `civica144_payment_success_rate ${metrics.business.payment_success_rate}`,
  );
  lines.push("");

  return lines.join("\n");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const startTime = Date.now();

  try {
    // Collect all metrics
    const metrics: MetricsData = {
      timestamp: new Date().toISOString(),
      application: {
        name: "civica144",
        version: process.env.VITE_APP_VERSION || "1.0.0",
        environment: process.env.VITE_APP_ENVIRONMENT || "development",
        platform: process.env.VITE_DEPLOYMENT_PLATFORM || "unknown",
        uptime_seconds: Math.round(process.uptime()),
      },
      system: getSystemMetrics(),
      guardian: getGuardianMetrics(),
      performance: getPerformanceMetrics(startTime),
      business: getBusinessMetrics(),
    };

    // Determine response format based on Accept header
    const acceptHeader = req.headers.accept || "";
    const format = (req.query.format as string) || "json";

    if (format === "prometheus" || acceptHeader.includes("text/plain")) {
      // Prometheus format
      const prometheusMetrics = formatPrometheusMetrics(metrics);

      res.setHeader("Content-Type", "text/plain; version=0.0.4; charset=utf-8");
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("X-Metrics-Format", "prometheus");
      res.status(200).send(prometheusMetrics);
    } else {
      // JSON format (default)
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("X-Metrics-Format", "json");
      res.status(200).json(metrics);
    }

    // Add custom headers for monitoring
    res.setHeader("X-Response-Time", `${Date.now() - startTime}ms`);
    res.setHeader("X-Guardian-Metrics", "active");
  } catch (error) {
    console.error("Metrics endpoint error:", error);

    const errorResponse = {
      error: "Failed to collect metrics",
      message: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    };

    res.setHeader("Content-Type", "application/json");
    res.status(500).json(errorResponse);
  }
}

// Export for testing
export { getSystemMetrics, getGuardianMetrics, formatPrometheusMetrics };
