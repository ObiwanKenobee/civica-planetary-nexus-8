export interface ThreatSignature {
  id: string;
  name: string;
  severity: "critical" | "high" | "medium" | "low";
  type: "malware" | "phishing" | "anomaly" | "intrusion" | "data_exfiltration";
  confidence: number;
  iocs: string[]; // Indicators of Compromise
  mitreTactics: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SecurityEvent {
  id: string;
  timestamp: Date;
  source: string;
  eventType: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  description: string;
  userAgent?: string;
  ipAddress: string;
  userId?: string;
  correlationId?: string;
  metadata: Record<string, any>;
  geoLocation?: {
    country: string;
    region: string;
    city: string;
    coordinates: [number, number];
  };
}

export interface ThreatDetection {
  id: string;
  eventIds: string[];
  threatSignatureId: string;
  confidence: number;
  riskScore: number;
  status:
    | "active"
    | "investigating"
    | "contained"
    | "resolved"
    | "false_positive";
  detectionTime: Date;
  lastUpdated: Date;
  affectedAssets: string[];
  responseActions: ResponseAction[];
  timeline: DetectionTimelineEntry[];
}

export interface ResponseAction {
  id: string;
  type: "isolate" | "block" | "alert" | "quarantine" | "monitor" | "terminate";
  status: "pending" | "executed" | "failed" | "rollback";
  executedAt?: Date;
  executor: "system" | "analyst" | "ai";
  description: string;
  parameters: Record<string, any>;
}

export interface DetectionTimelineEntry {
  id: string;
  timestamp: Date;
  eventType: "detection" | "escalation" | "response" | "update" | "resolution";
  description: string;
  actor: string;
  metadata: Record<string, any>;
}

export interface SecurityMetrics {
  totalEvents: number;
  activeThreats: number;
  resolvedThreats: number;
  falsePositives: number;
  meanTimeToDetection: number; // in minutes
  meanTimeToResponse: number; // in minutes
  securityScore: number; // 0-100
  threatTrends: {
    period: string;
    count: number;
    severity: string;
  }[];
  topThreats: {
    name: string;
    count: number;
    severity: string;
  }[];
}

export interface XDRConfiguration {
  detection: {
    enabled: boolean;
    sensitivity: "low" | "medium" | "high" | "paranoid";
    machinelearning: boolean;
    behavioralAnalysis: boolean;
    threatIntelligence: boolean;
  };
  response: {
    autoResponse: boolean;
    isolationThreshold: number;
    blockingThreshold: number;
    alertThreshold: number;
  };
  monitoring: {
    realTimeAnalysis: boolean;
    retentionDays: number;
    samplingRate: number;
  };
}

export interface SecurityDashboardData {
  metrics: SecurityMetrics;
  recentEvents: SecurityEvent[];
  activeDetections: ThreatDetection[];
  threatMap: {
    location: [number, number];
    threatCount: number;
    severity: string;
  }[];
  securityAlerts: {
    id: string;
    message: string;
    severity: string;
    timestamp: Date;
    acknowledged: boolean;
  }[];
}

export interface MLSecurityModel {
  id: string;
  name: string;
  type: "anomaly_detection" | "threat_classification" | "behavioral_analysis";
  accuracy: number;
  lastTrained: Date;
  features: string[];
  status: "training" | "active" | "deprecated";
  version: string;
}

export interface SecurityTelemetry {
  timestamp: Date;
  source: string;
  telemetryType: "network" | "endpoint" | "application" | "user_behavior";
  data: Record<string, any>;
  processed: boolean;
  correlationIds: string[];
}

export interface ThreatIntelligence {
  id: string;
  source: string;
  threatType: string;
  indicators: string[];
  confidence: number;
  timestamp: Date;
  attribution: string;
  campaignId?: string;
  mitreMapping: string[];
}
