import { VercelRequest, VercelResponse } from "@vercel/node";

// Simulated XDR security service for backend processing
// In production, this would connect to actual security infrastructure

interface SecurityEvent {
  id: string;
  timestamp: Date;
  source: string;
  eventType: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  description: string;
  ipAddress: string;
  userId?: string;
  metadata: Record<string, any>;
}

interface ThreatDetection {
  id: string;
  eventIds: string[];
  threatType: string;
  confidence: number;
  riskScore: number;
  status: "active" | "investigating" | "contained" | "resolved";
  detectionTime: Date;
  affectedAssets: string[];
  mitigationActions: string[];
}

interface SecurityMetrics {
  totalEvents: number;
  activeThreats: number;
  resolvedThreats: number;
  securityScore: number;
  meanTimeToDetection: number;
  meanTimeToResponse: number;
  threatTrends: Array<{
    period: string;
    count: number;
    severity: string;
  }>;
}

// Mock data storage (in production, use actual database)
let securityEvents: SecurityEvent[] = [];
let threatDetections: ThreatDetection[] = [];

// Initialize with sample data
const initializeSampleData = () => {
  if (securityEvents.length === 0) {
    // Generate sample security events
    const sampleEvents: SecurityEvent[] = [
      {
        id: "evt_001",
        timestamp: new Date(Date.now() - 60000),
        source: "web_application",
        eventType: "authentication_failure",
        severity: "medium",
        description: "Failed login attempt with invalid credentials",
        ipAddress: "192.168.1.100",
        userId: "user_123",
        metadata: { userAgent: "Mozilla/5.0...", attemptCount: 3 },
      },
      {
        id: "evt_002",
        timestamp: new Date(Date.now() - 120000),
        source: "network_firewall",
        eventType: "intrusion_attempt",
        severity: "high",
        description: "Suspicious network traffic detected from external IP",
        ipAddress: "203.0.113.42",
        metadata: { protocol: "TCP", port: 22, payloadSize: 1024 },
      },
      {
        id: "evt_003",
        timestamp: new Date(Date.now() - 180000),
        source: "endpoint_security",
        eventType: "malware_detection",
        severity: "critical",
        description: "Potential malware detected in file upload",
        ipAddress: "10.0.0.15",
        userId: "user_456",
        metadata: {
          fileName: "document.exe",
          fileSize: 2048000,
          quarantined: true,
        },
      },
    ];

    securityEvents.push(...sampleEvents);

    // Generate sample threat detections
    const sampleThreats: ThreatDetection[] = [
      {
        id: "threat_001",
        eventIds: ["evt_001"],
        threatType: "brute_force_attack",
        confidence: 75,
        riskScore: 70,
        status: "active",
        detectionTime: new Date(Date.now() - 45000),
        affectedAssets: ["web_application"],
        mitigationActions: ["rate_limiting", "account_lockout"],
      },
      {
        id: "threat_002",
        eventIds: ["evt_003"],
        threatType: "malware_infection",
        confidence: 95,
        riskScore: 90,
        status: "contained",
        detectionTime: new Date(Date.now() - 150000),
        affectedAssets: ["endpoint_user_456"],
        mitigationActions: [
          "file_quarantine",
          "system_scan",
          "network_isolation",
        ],
      },
    ];

    threatDetections.push(...sampleThreats);
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Initialize sample data
  initializeSampleData();

  const { action } = req.query;

  try {
    switch (action) {
      case "events":
        return handleSecurityEvents(req, res);

      case "threats":
        return handleThreatDetections(req, res);

      case "metrics":
        return handleSecurityMetrics(req, res);

      case "analyze":
        return handleThreatAnalysis(req, res);

      case "response":
        return handleIncidentResponse(req, res);

      case "status":
        return handleSystemStatus(req, res);

      default:
        return res.status(400).json({
          error: "Invalid action",
          supportedActions: [
            "events",
            "threats",
            "metrics",
            "analyze",
            "response",
            "status",
          ],
        });
    }
  } catch (error) {
    console.error("XDR API Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

async function handleSecurityEvents(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    const { limit = "50", severity, timeRange } = req.query;

    let filteredEvents = [...securityEvents];

    // Filter by severity
    if (severity && typeof severity === "string") {
      filteredEvents = filteredEvents.filter(
        (event) => event.severity === severity,
      );
    }

    // Filter by time range
    if (timeRange && typeof timeRange === "string") {
      const hours = parseInt(timeRange);
      const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
      filteredEvents = filteredEvents.filter(
        (event) => event.timestamp > cutoff,
      );
    }

    // Sort by timestamp (newest first)
    filteredEvents.sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
    );

    // Limit results
    const limitNum = parseInt(limit as string);
    filteredEvents = filteredEvents.slice(0, limitNum);

    return res.json({
      events: filteredEvents,
      total: filteredEvents.length,
      timestamp: new Date().toISOString(),
    });
  }

  if (req.method === "POST") {
    const newEvent: Omit<SecurityEvent, "id"> = req.body;

    // Validate required fields
    if (!newEvent.eventType || !newEvent.source || !newEvent.severity) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["eventType", "source", "severity"],
      });
    }

    // Generate ID and add to storage
    const event: SecurityEvent = {
      ...newEvent,
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    };

    securityEvents.push(event);

    // Trigger threat analysis for high/critical events
    if (event.severity === "high" || event.severity === "critical") {
      await performAutomatedThreatAnalysis(event);
    }

    return res.status(201).json({
      event,
      message: "Security event ingested successfully",
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}

async function handleThreatDetections(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    const { status, riskThreshold } = req.query;

    let filteredThreats = [...threatDetections];

    // Filter by status
    if (status && typeof status === "string") {
      filteredThreats = filteredThreats.filter(
        (threat) => threat.status === status,
      );
    }

    // Filter by risk threshold
    if (riskThreshold && typeof riskThreshold === "string") {
      const threshold = parseInt(riskThreshold);
      filteredThreats = filteredThreats.filter(
        (threat) => threat.riskScore >= threshold,
      );
    }

    // Sort by risk score (highest first)
    filteredThreats.sort((a, b) => b.riskScore - a.riskScore);

    return res.json({
      threats: filteredThreats,
      total: filteredThreats.length,
      activeCount: threatDetections.filter((t) => t.status === "active").length,
      timestamp: new Date().toISOString(),
    });
  }

  if (req.method === "PUT") {
    const { threatId, status, analyst } = req.body;

    const threat = threatDetections.find((t) => t.id === threatId);
    if (!threat) {
      return res.status(404).json({ error: "Threat not found" });
    }

    threat.status = status;

    return res.json({
      threat,
      message: `Threat ${threatId} updated to ${status}`,
      updatedBy: analyst || "system",
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}

async function handleSecurityMetrics(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentEvents = securityEvents.filter(
      (e) => e.timestamp > last24Hours,
    );
    const recentThreats = threatDetections.filter(
      (t) => t.detectionTime > last24Hours,
    );

    const metrics: SecurityMetrics = {
      totalEvents: recentEvents.length,
      activeThreats: threatDetections.filter((t) => t.status === "active")
        .length,
      resolvedThreats: threatDetections.filter((t) => t.status === "resolved")
        .length,
      securityScore: calculateSecurityScore(recentEvents, threatDetections),
      meanTimeToDetection: calculateMTTD(recentThreats, securityEvents),
      meanTimeToResponse: calculateMTTR(recentThreats),
      threatTrends: calculateThreatTrends(),
    };

    return res.json({
      metrics,
      timestamp: new Date().toISOString(),
      period: "24 hours",
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}

async function handleThreatAnalysis(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    const { eventIds, analysisType = "comprehensive" } = req.body;

    if (!eventIds || !Array.isArray(eventIds)) {
      return res.status(400).json({
        error: "eventIds array required",
      });
    }

    const events = securityEvents.filter((e) => eventIds.includes(e.id));
    if (events.length === 0) {
      return res.status(404).json({
        error: "No events found for provided IDs",
      });
    }

    // Perform threat analysis
    const analysis = await performComprehensiveThreatAnalysis(
      events,
      analysisType,
    );

    return res.json({
      analysis,
      analyzedEvents: events.length,
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}

async function handleIncidentResponse(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    const { threatId, responseAction, parameters = {} } = req.body;

    const threat = threatDetections.find((t) => t.id === threatId);
    if (!threat) {
      return res.status(404).json({ error: "Threat not found" });
    }

    // Execute response action
    const response = await executeResponseAction(
      threat,
      responseAction,
      parameters,
    );

    // Update threat with response action
    threat.mitigationActions.push(responseAction);
    if (responseAction === "isolate" || responseAction === "contain") {
      threat.status = "contained";
    }

    return res.json({
      threat,
      response,
      message: `Response action ${responseAction} executed for threat ${threatId}`,
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}

async function handleSystemStatus(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    const systemStatus = {
      status: "operational",
      version: "1.0.0",
      uptime: process.uptime(),
      components: {
        threatDetection: "operational",
        eventIngestion: "operational",
        responseOrchestration: "operational",
        analytics: "operational",
      },
      lastHealthCheck: new Date().toISOString(),
      metrics: {
        eventsProcessed: securityEvents.length,
        threatsDetected: threatDetections.length,
        systemLoad: Math.random() * 100, // Simulated
        memoryUsage: Math.random() * 100, // Simulated
      },
    };

    return res.json(systemStatus);
  }

  return res.status(405).json({ error: "Method not allowed" });
}

// Helper functions
async function performAutomatedThreatAnalysis(
  event: SecurityEvent,
): Promise<void> {
  // Simulate threat analysis based on event characteristics
  let threatType = "unknown";
  let confidence = 50;
  let riskScore = 30;

  // Analyze event type and characteristics
  switch (event.eventType) {
    case "authentication_failure":
      threatType = "brute_force_attack";
      confidence = 70;
      riskScore = 60;
      break;
    case "malware_detection":
      threatType = "malware_infection";
      confidence = 95;
      riskScore = 90;
      break;
    case "intrusion_attempt":
      threatType = "network_intrusion";
      confidence = 80;
      riskScore = 75;
      break;
    case "data_exfiltration":
      threatType = "data_breach";
      confidence = 85;
      riskScore = 95;
      break;
  }

  // Adjust based on severity
  if (event.severity === "critical") {
    confidence += 10;
    riskScore += 20;
  } else if (event.severity === "high") {
    confidence += 5;
    riskScore += 10;
  }

  // Create threat detection if risk is significant
  if (riskScore >= 50) {
    const threat: ThreatDetection = {
      id: `threat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      eventIds: [event.id],
      threatType,
      confidence: Math.min(confidence, 100),
      riskScore: Math.min(riskScore, 100),
      status: "active",
      detectionTime: new Date(),
      affectedAssets: [event.source],
      mitigationActions: [],
    };

    threatDetections.push(threat);
  }
}

async function performComprehensiveThreatAnalysis(
  events: SecurityEvent[],
  analysisType: string,
) {
  const analysis = {
    threatLevel: "medium",
    confidence: 75,
    patterns: [] as string[],
    recommendations: [] as string[],
    riskFactors: [] as string[],
    timeline: events.map((e) => ({
      timestamp: e.timestamp,
      event: e.eventType,
      severity: e.severity,
    })),
  };

  // Analyze event patterns
  const eventTypes = events.map((e) => e.eventType);
  const uniqueTypes = [...new Set(eventTypes)];

  if (
    uniqueTypes.includes("authentication_failure") &&
    uniqueTypes.includes("intrusion_attempt")
  ) {
    analysis.patterns.push("Multi-stage attack pattern detected");
    analysis.threatLevel = "high";
    analysis.confidence = 85;
  }

  if (events.some((e) => e.severity === "critical")) {
    analysis.threatLevel = "critical";
    analysis.riskFactors.push("Critical severity events present");
  }

  // Generate recommendations
  if (uniqueTypes.includes("authentication_failure")) {
    analysis.recommendations.push("Implement stronger authentication controls");
    analysis.recommendations.push("Enable account lockout policies");
  }

  if (uniqueTypes.includes("malware_detection")) {
    analysis.recommendations.push("Perform full system scan");
    analysis.recommendations.push("Update antivirus signatures");
  }

  return analysis;
}

async function executeResponseAction(
  threat: ThreatDetection,
  action: string,
  parameters: any,
) {
  const response = {
    action,
    status: "success",
    timestamp: new Date().toISOString(),
    details: {} as any,
  };

  switch (action) {
    case "isolate":
      response.details = {
        isolatedAssets: threat.affectedAssets,
        networkAccess: "blocked",
        duration: parameters.duration || "1 hour",
      };
      break;

    case "block":
      response.details = {
        blockedIPs: parameters.ipAddresses || [],
        duration: parameters.duration || "24 hours",
        method: "firewall_rule",
      };
      break;

    case "alert":
      response.details = {
        alertLevel: "high",
        notificationsSent: parameters.recipients || [
          "security-team@company.com",
        ],
        escalation: parameters.escalate || false,
      };
      break;

    case "quarantine":
      response.details = {
        quarantinedFiles: parameters.files || [],
        location: "secure_quarantine_vault",
        reversible: true,
      };
      break;

    default:
      response.status = "failed";
      response.details = { error: "Unknown response action" };
  }

  return response;
}

function calculateSecurityScore(
  events: SecurityEvent[],
  threats: ThreatDetection[],
): number {
  let score = 100;

  // Deduct points for security events
  const criticalEvents = events.filter((e) => e.severity === "critical").length;
  const highEvents = events.filter((e) => e.severity === "high").length;

  score -= criticalEvents * 15;
  score -= highEvents * 10;

  // Deduct points for active threats
  const activeThreats = threats.filter((t) => t.status === "active").length;
  score -= activeThreats * 20;

  return Math.max(0, Math.min(100, score));
}

function calculateMTTD(
  threats: ThreatDetection[],
  events: SecurityEvent[],
): number {
  if (threats.length === 0) return 0;

  const detectionTimes = threats.map((threat) => {
    const firstEvent = events.find((e) => threat.eventIds.includes(e.id));
    if (firstEvent) {
      return (
        (threat.detectionTime.getTime() - firstEvent.timestamp.getTime()) /
        (1000 * 60)
      ); // minutes
    }
    return 0;
  });

  return (
    detectionTimes.reduce((sum, time) => sum + time, 0) / detectionTimes.length
  );
}

function calculateMTTR(threats: ThreatDetection[]): number {
  const resolvedThreats = threats.filter((t) => t.status === "resolved");

  if (resolvedThreats.length === 0) return 0;

  // Simulate response times (in production, track actual response times)
  const responseTimes = resolvedThreats.map(() => Math.random() * 60 + 10); // 10-70 minutes

  return (
    responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length
  );
}

function calculateThreatTrends(): Array<{
  period: string;
  count: number;
  severity: string;
}> {
  const trends = [];
  const now = new Date();

  for (let i = 6; i >= 0; i--) {
    const day = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dayThreats = threatDetections.filter((t) => {
      const threatDay = new Date(
        t.detectionTime.getFullYear(),
        t.detectionTime.getMonth(),
        t.detectionTime.getDate(),
      );
      const currentDay = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
      );
      return threatDay.getTime() === currentDay.getTime();
    });

    const criticalThreats = dayThreats.filter((t) => t.riskScore >= 80).length;
    const severity =
      criticalThreats > 0
        ? "critical"
        : dayThreats.length > 0
          ? "medium"
          : "low";

    trends.push({
      period: day.toISOString().split("T")[0],
      count: dayThreats.length,
      severity,
    });
  }

  return trends;
}
