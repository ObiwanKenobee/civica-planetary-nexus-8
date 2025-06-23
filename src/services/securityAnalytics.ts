import {
  SecurityEvent,
  SecurityMetrics,
  ThreatDetection,
} from "../types/xdrSecurity";

interface SecurityInsight {
  id: string;
  type: "trend" | "anomaly" | "pattern" | "prediction";
  title: string;
  description: string;
  severity: "info" | "warning" | "critical";
  confidence: number;
  timestamp: Date;
  data: Record<string, any>;
  recommendations: string[];
}

interface RiskAssessment {
  overallRisk: number; // 0-100
  categories: {
    network: number;
    authentication: number;
    dataAccess: number;
    userBehavior: number;
    infrastructure: number;
  };
  trends: {
    direction: "increasing" | "decreasing" | "stable";
    percentage: number;
    period: string;
  };
  topRisks: {
    description: string;
    impact: number;
    likelihood: number;
    mitigation: string;
  }[];
}

interface ComplianceReport {
  framework: string; // ISO 27001, GDPR, SOC 2, etc.
  overallScore: number;
  controls: {
    id: string;
    name: string;
    status: "compliant" | "non_compliant" | "partial" | "not_applicable";
    score: number;
    evidence: string[];
    gaps: string[];
    remediation: string[];
  }[];
  lastAssessment: Date;
  nextAssessment: Date;
}

interface SecurityBenchmark {
  category: string;
  metric: string;
  current: number;
  target: number;
  industry: number;
  trend: "improving" | "degrading" | "stable";
  recommendations: string[];
}

class SecurityAnalyticsEngine {
  private static instance: SecurityAnalyticsEngine;
  private securityEvents: SecurityEvent[] = [];
  private threatDetections: ThreatDetection[] = [];
  private analyticsCache: Map<string, any> = new Map();
  private insightHistory: SecurityInsight[] = [];

  private constructor() {
    // Initialize analytics engine
    this.initializeBaselines();
  }

  public static getInstance(): SecurityAnalyticsEngine {
    if (!SecurityAnalyticsEngine.instance) {
      SecurityAnalyticsEngine.instance = new SecurityAnalyticsEngine();
    }
    return SecurityAnalyticsEngine.instance;
  }

  private initializeBaselines(): void {
    // Initialize security baselines and benchmarks
    this.analyticsCache.set("baselines", {
      loginFrequency: 50, // logins per day
      dataTransfer: 1024 * 1024 * 100, // 100MB per day
      sessionDuration: 30 * 60, // 30 minutes
      failureRate: 0.02, // 2% failure rate
      anomalyThreshold: 2.5, // Standard deviations
    });
  }

  public async ingestSecurityEvent(event: SecurityEvent): Promise<void> {
    this.securityEvents.push(event);
    this.maintainEventBuffer();

    // Real-time analytics processing
    await this.processEventForAnalytics(event);

    // Update cached metrics
    this.invalidateCache();
  }

  public async ingestThreatDetection(
    detection: ThreatDetection,
  ): Promise<void> {
    this.threatDetections.push(detection);

    // Analyze threat patterns
    await this.analyzeThreatPatterns(detection);
  }

  public async generateSecurityInsights(): Promise<SecurityInsight[]> {
    const insights: SecurityInsight[] = [];

    // Trend analysis
    const trendInsights = await this.analyzeTrends();
    insights.push(...trendInsights);

    // Anomaly detection
    const anomalyInsights = await this.detectAnomalies();
    insights.push(...anomalyInsights);

    // Pattern recognition
    const patternInsights = await this.recognizePatterns();
    insights.push(...patternInsights);

    // Predictive analytics
    const predictiveInsights = await this.generatePredictions();
    insights.push(...predictiveInsights);

    // Cache insights
    this.insightHistory.push(...insights);
    this.maintainInsightHistory();

    return insights;
  }

  private async analyzeTrends(): Promise<SecurityInsight[]> {
    const insights: SecurityInsight[] = [];
    const now = new Date();
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last14Days = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    // Security event trends
    const recentEvents = this.securityEvents.filter(
      (e) => e.timestamp > last7Days,
    );
    const previousEvents = this.securityEvents.filter(
      (e) => e.timestamp > last14Days && e.timestamp <= last7Days,
    );

    const recentCount = recentEvents.length;
    const previousCount = previousEvents.length;
    const trendPercentage =
      previousCount > 0
        ? ((recentCount - previousCount) / previousCount) * 100
        : 0;

    if (Math.abs(trendPercentage) > 20) {
      insights.push({
        id: this.generateInsightId(),
        type: "trend",
        title: `Security Events ${trendPercentage > 0 ? "Increasing" : "Decreasing"}`,
        description: `Security events have ${trendPercentage > 0 ? "increased" : "decreased"} by ${Math.abs(trendPercentage).toFixed(1)}% over the last week`,
        severity:
          trendPercentage > 50
            ? "critical"
            : trendPercentage > 20
              ? "warning"
              : "info",
        confidence: 0.85,
        timestamp: now,
        data: {
          recentCount,
          previousCount,
          trendPercentage,
          period: "7 days",
        },
        recommendations:
          trendPercentage > 0
            ? [
                "Investigate the root cause of increased security events",
                "Review and update security policies",
                "Consider implementing additional monitoring",
              ]
            : [
                "Continue current security practices",
                "Monitor for sustained improvement",
                "Document successful security measures",
              ],
      });
    }

    // Failed authentication trends
    const recentFailedAuth = recentEvents.filter(
      (e) => e.eventType === "authentication_failure",
    );
    const previousFailedAuth = previousEvents.filter(
      (e) => e.eventType === "authentication_failure",
    );

    const authTrendPercentage =
      previousFailedAuth.length > 0
        ? ((recentFailedAuth.length - previousFailedAuth.length) /
            previousFailedAuth.length) *
          100
        : 0;

    if (authTrendPercentage > 30) {
      insights.push({
        id: this.generateInsightId(),
        type: "trend",
        title: "Authentication Failures Spike",
        description: `Failed authentication attempts have increased by ${authTrendPercentage.toFixed(1)}%`,
        severity: "warning",
        confidence: 0.9,
        timestamp: now,
        data: {
          recentFailures: recentFailedAuth.length,
          previousFailures: previousFailedAuth.length,
          trendPercentage: authTrendPercentage,
        },
        recommendations: [
          "Implement account lockout policies",
          "Enable multi-factor authentication",
          "Monitor for brute force attacks",
          "Review password policies",
        ],
      });
    }

    return insights;
  }

  private async detectAnomalies(): Promise<SecurityInsight[]> {
    const insights: SecurityInsight[] = [];
    const baselines = this.analyticsCache.get("baselines");

    // Detect unusual login patterns
    const loginAnomalies = this.detectLoginAnomalies(baselines);
    insights.push(...loginAnomalies);

    // Detect data transfer anomalies
    const dataAnomalies = this.detectDataTransferAnomalies(baselines);
    insights.push(...dataAnomalies);

    // Detect geographic anomalies
    const geoAnomalies = this.detectGeographicAnomalies();
    insights.push(...geoAnomalies);

    return insights;
  }

  private detectLoginAnomalies(baselines: any): SecurityInsight[] {
    const insights: SecurityInsight[] = [];
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Group login events by user
    const userLogins = new Map<string, SecurityEvent[]>();

    this.securityEvents
      .filter((e) => e.eventType === "login" && e.timestamp > last24Hours)
      .forEach((event) => {
        if (event.userId) {
          if (!userLogins.has(event.userId)) {
            userLogins.set(event.userId, []);
          }
          userLogins.get(event.userId)!.push(event);
        }
      });

    // Detect anomalous login frequencies
    for (const [userId, logins] of userLogins.entries()) {
      if (logins.length > baselines.loginFrequency * 2) {
        insights.push({
          id: this.generateInsightId(),
          type: "anomaly",
          title: "Unusual Login Frequency",
          description: `User ${userId} has ${logins.length} logins in 24h (normal: ${baselines.loginFrequency})`,
          severity: "warning",
          confidence: 0.8,
          timestamp: new Date(),
          data: {
            userId,
            loginCount: logins.length,
            expected: baselines.loginFrequency,
            period: "24 hours",
          },
          recommendations: [
            "Verify user account has not been compromised",
            "Check for automated login scripts",
            "Review user behavior patterns",
            "Consider temporary account monitoring",
          ],
        });
      }
    }

    return insights;
  }

  private detectDataTransferAnomalies(baselines: any): SecurityInsight[] {
    const insights: SecurityInsight[] = [];
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const dataTransferEvents = this.securityEvents.filter(
      (e) => e.timestamp > last24Hours && e.metadata?.dataTransferSize,
    );

    const totalTransfer = dataTransferEvents.reduce(
      (sum, event) => sum + (event.metadata?.dataTransferSize || 0),
      0,
    );

    if (totalTransfer > baselines.dataTransfer * 3) {
      insights.push({
        id: this.generateInsightId(),
        type: "anomaly",
        title: "Unusual Data Transfer Volume",
        description: `Data transfer volume is ${(totalTransfer / baselines.dataTransfer).toFixed(1)}x higher than normal`,
        severity: "critical",
        confidence: 0.9,
        timestamp: new Date(),
        data: {
          actualTransfer: totalTransfer,
          expectedTransfer: baselines.dataTransfer,
          ratio: totalTransfer / baselines.dataTransfer,
        },
        recommendations: [
          "Investigate potential data exfiltration",
          "Review file access logs",
          "Check for unauthorized downloads",
          "Implement data loss prevention controls",
        ],
      });
    }

    return insights;
  }

  private detectGeographicAnomalies(): SecurityInsight[] {
    const insights: SecurityInsight[] = [];
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Group events by user and analyze geographic patterns
    const userLocations = new Map<
      string,
      Array<{ country: string; timestamp: Date }>
    >();

    this.securityEvents
      .filter((e) => e.timestamp > last24Hours && e.geoLocation && e.userId)
      .forEach((event) => {
        if (event.userId && event.geoLocation) {
          if (!userLocations.has(event.userId)) {
            userLocations.set(event.userId, []);
          }
          userLocations.get(event.userId)!.push({
            country: event.geoLocation.country,
            timestamp: event.timestamp,
          });
        }
      });

    // Detect impossible travel
    for (const [userId, locations] of userLocations.entries()) {
      const sortedLocations = locations.sort(
        (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
      );

      for (let i = 1; i < sortedLocations.length; i++) {
        const prev = sortedLocations[i - 1];
        const curr = sortedLocations[i];

        if (prev.country !== curr.country) {
          const timeDiff =
            (curr.timestamp.getTime() - prev.timestamp.getTime()) /
            (1000 * 60 * 60); // hours

          if (timeDiff < 4) {
            // Less than 4 hours between different countries
            insights.push({
              id: this.generateInsightId(),
              type: "anomaly",
              title: "Impossible Travel Detected",
              description: `User ${userId} appeared in ${prev.country} and ${curr.country} within ${timeDiff.toFixed(1)} hours`,
              severity: "critical",
              confidence: 0.95,
              timestamp: new Date(),
              data: {
                userId,
                fromCountry: prev.country,
                toCountry: curr.country,
                timeDifference: timeDiff,
              },
              recommendations: [
                "Immediately verify user account status",
                "Check for account compromise",
                "Review VPN usage patterns",
                "Consider account lockdown pending investigation",
              ],
            });
          }
        }
      }
    }

    return insights;
  }

  private async recognizePatterns(): Promise<SecurityInsight[]> {
    const insights: SecurityInsight[] = [];

    // Attack pattern recognition
    const attackPatterns = this.recognizeAttackPatterns();
    insights.push(...attackPatterns);

    // User behavior patterns
    const behaviorPatterns = this.recognizeUserBehaviorPatterns();
    insights.push(...behaviorPatterns);

    return insights;
  }

  private recognizeAttackPatterns(): SecurityInsight[] {
    const insights: SecurityInsight[] = [];
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Detect brute force patterns
    const authFailures = this.securityEvents.filter(
      (e) =>
        e.eventType === "authentication_failure" && e.timestamp > last24Hours,
    );

    // Group by IP address
    const ipFailures = new Map<string, SecurityEvent[]>();
    authFailures.forEach((event) => {
      if (!ipFailures.has(event.ipAddress)) {
        ipFailures.set(event.ipAddress, []);
      }
      ipFailures.get(event.ipAddress)!.push(event);
    });

    // Detect brute force attempts
    for (const [ip, failures] of ipFailures.entries()) {
      if (failures.length >= 10) {
        insights.push({
          id: this.generateInsightId(),
          type: "pattern",
          title: "Brute Force Attack Pattern",
          description: `IP ${ip} has attempted ${failures.length} failed logins`,
          severity: "critical",
          confidence: 0.95,
          timestamp: new Date(),
          data: {
            sourceIP: ip,
            attemptCount: failures.length,
            timespan: "24 hours",
            targetUsers: [
              ...new Set(failures.map((f) => f.userId).filter(Boolean)),
            ],
          },
          recommendations: [
            "Block the attacking IP address",
            "Implement rate limiting on login attempts",
            "Enable account lockout policies",
            "Monitor for continued attacks from different IPs",
          ],
        });
      }
    }

    return insights;
  }

  private recognizeUserBehaviorPatterns(): SecurityInsight[] {
    const insights: SecurityInsight[] = [];

    // Analyze user access patterns for anomalies
    const userSessions = this.analyzeUserSessions();

    for (const [userId, sessionData] of userSessions.entries()) {
      if (sessionData.anomalyScore > 0.7) {
        insights.push({
          id: this.generateInsightId(),
          type: "pattern",
          title: "Anomalous User Behavior",
          description: `User ${userId} showing unusual access patterns`,
          severity: "warning",
          confidence: sessionData.anomalyScore,
          timestamp: new Date(),
          data: {
            userId,
            anomalyScore: sessionData.anomalyScore,
            patterns: sessionData.anomalousPatterns,
          },
          recommendations: [
            "Review user account for compromise",
            "Verify recent user activities",
            "Consider additional authentication requirements",
            "Monitor user behavior closely",
          ],
        });
      }
    }

    return insights;
  }

  private async generatePredictions(): Promise<SecurityInsight[]> {
    const insights: SecurityInsight[] = [];

    // Predict security event trends
    const eventPrediction = this.predictSecurityEventTrends();
    if (eventPrediction) {
      insights.push(eventPrediction);
    }

    // Predict threat escalation
    const threatPrediction = this.predictThreatEscalation();
    if (threatPrediction) {
      insights.push(threatPrediction);
    }

    return insights;
  }

  private predictSecurityEventTrends(): SecurityInsight | null {
    const last30Days = this.securityEvents.filter(
      (e) => e.timestamp > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    );

    if (last30Days.length < 100) return null; // Need sufficient data

    // Simple linear regression for trend prediction
    const dailyCounts = this.groupEventsByDay(last30Days);
    const trend = this.calculateTrend(dailyCounts);

    if (Math.abs(trend.slope) > 0.1) {
      return {
        id: this.generateInsightId(),
        type: "prediction",
        title: "Security Event Trend Prediction",
        description: `Security events are predicted to ${trend.slope > 0 ? "increase" : "decrease"} by ${Math.abs(trend.slope * 7).toFixed(1)} events per week`,
        severity: trend.slope > 0.5 ? "warning" : "info",
        confidence: trend.confidence,
        timestamp: new Date(),
        data: {
          trend: trend.slope > 0 ? "increasing" : "decreasing",
          weeklyChange: trend.slope * 7,
          confidence: trend.confidence,
        },
        recommendations:
          trend.slope > 0
            ? [
                "Prepare for increased security workload",
                "Review resource allocation",
                "Consider proactive security measures",
              ]
            : [
                "Monitor sustained improvement",
                "Document effective security practices",
                "Maintain current security posture",
              ],
      };
    }

    return null;
  }

  private predictThreatEscalation(): SecurityInsight | null {
    const activeThreats = this.threatDetections.filter(
      (t) => t.status === "active",
    );

    if (activeThreats.length === 0) return null;

    const highRiskThreats = activeThreats.filter((t) => t.riskScore > 70);

    if (highRiskThreats.length > 0) {
      return {
        id: this.generateInsightId(),
        type: "prediction",
        title: "Threat Escalation Risk",
        description: `${highRiskThreats.length} high-risk threats may escalate without immediate action`,
        severity: "critical",
        confidence: 0.8,
        timestamp: new Date(),
        data: {
          highRiskCount: highRiskThreats.length,
          averageRiskScore:
            highRiskThreats.reduce((sum, t) => sum + t.riskScore, 0) /
            highRiskThreats.length,
          oldestThreat: Math.min(
            ...highRiskThreats.map((t) => t.detectionTime.getTime()),
          ),
        },
        recommendations: [
          "Prioritize response to high-risk threats",
          "Allocate additional security resources",
          "Consider escalating to senior security team",
          "Implement immediate containment measures",
        ],
      };
    }

    return null;
  }

  public async generateRiskAssessment(): Promise<RiskAssessment> {
    const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentEvents = this.securityEvents.filter(
      (e) => e.timestamp > last30Days,
    );
    const recentThreats = this.threatDetections.filter(
      (t) => t.detectionTime > last30Days,
    );

    // Calculate category risks
    const networkRisk = this.calculateNetworkRisk(recentEvents);
    const authRisk = this.calculateAuthenticationRisk(recentEvents);
    const dataRisk = this.calculateDataAccessRisk(recentEvents);
    const behaviorRisk = this.calculateUserBehaviorRisk(recentEvents);
    const infraRisk = this.calculateInfrastructureRisk(recentEvents);

    // Calculate overall risk
    const overallRisk = Math.round(
      (networkRisk + authRisk + dataRisk + behaviorRisk + infraRisk) / 5,
    );

    // Calculate trends
    const trends = this.calculateRiskTrends();

    // Identify top risks
    const topRisks = this.identifyTopRisks(recentEvents, recentThreats);

    return {
      overallRisk,
      categories: {
        network: networkRisk,
        authentication: authRisk,
        dataAccess: dataRisk,
        userBehavior: behaviorRisk,
        infrastructure: infraRisk,
      },
      trends,
      topRisks,
    };
  }

  public async generateSecurityMetrics(): Promise<SecurityMetrics> {
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentEvents = this.securityEvents.filter(
      (e) => e.timestamp > last24Hours,
    );
    const recentThreats = this.threatDetections.filter(
      (t) => t.detectionTime > last24Hours,
    );

    const activeThreats = recentThreats.filter(
      (t) => t.status === "active",
    ).length;
    const resolvedThreats = recentThreats.filter(
      (t) => t.status === "resolved",
    ).length;
    const falsePositives = recentThreats.filter(
      (t) => t.status === "false_positive",
    ).length;

    return {
      totalEvents: recentEvents.length,
      activeThreats,
      resolvedThreats,
      falsePositives,
      meanTimeToDetection: this.calculateMTTD(recentThreats),
      meanTimeToResponse: this.calculateMTTR(recentThreats),
      securityScore: this.calculateSecurityScore(),
      threatTrends: this.calculateThreatTrends(),
      topThreats: this.calculateTopThreats(recentEvents),
    };
  }

  private async processEventForAnalytics(event: SecurityEvent): Promise<void> {
    // Real-time processing for immediate insights
    if (event.severity === "critical") {
      // Immediate analysis for critical events
      await this.analyzeCriticalEvent(event);
    }
  }

  private async analyzeThreatPatterns(
    detection: ThreatDetection,
  ): Promise<void> {
    // Analyze threat patterns for learning
  }

  private async analyzeCriticalEvent(event: SecurityEvent): Promise<void> {
    // Immediate analysis for critical events
  }

  private analyzeUserSessions(): Map<
    string,
    { anomalyScore: number; anomalousPatterns: string[] }
  > {
    const userSessions = new Map();

    // Placeholder implementation
    return userSessions;
  }

  private groupEventsByDay(events: SecurityEvent[]): number[] {
    const dailyCounts: number[] = [];
    const now = new Date();

    for (let i = 29; i >= 0; i--) {
      const day = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
      );
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

      const dayEvents = events.filter(
        (e) => e.timestamp >= dayStart && e.timestamp < dayEnd,
      );

      dailyCounts.push(dayEvents.length);
    }

    return dailyCounts;
  }

  private calculateTrend(data: number[]): {
    slope: number;
    confidence: number;
  } {
    const n = data.length;
    const x = Array.from({ length: n }, (_, i) => i);
    const y = data;

    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const confidence = Math.min(0.95, Math.max(0.5, 1 - Math.abs(slope) / 10));

    return { slope, confidence };
  }

  private calculateNetworkRisk(events: SecurityEvent[]): number {
    const networkEvents = events.filter(
      (e) => e.source.includes("network") || e.source.includes("firewall"),
    );
    return Math.min(100, networkEvents.length * 2);
  }

  private calculateAuthenticationRisk(events: SecurityEvent[]): number {
    const authFailures = events.filter(
      (e) => e.eventType === "authentication_failure",
    );
    return Math.min(100, authFailures.length * 3);
  }

  private calculateDataAccessRisk(events: SecurityEvent[]): number {
    const dataEvents = events.filter(
      (e) => e.eventType.includes("data") || e.eventType.includes("file"),
    );
    return Math.min(100, dataEvents.length * 2.5);
  }

  private calculateUserBehaviorRisk(events: SecurityEvent[]): number {
    const userEvents = events.filter((e) => e.userId);
    const uniqueUsers = new Set(userEvents.map((e) => e.userId)).size;
    return Math.min(100, (userEvents.length / Math.max(uniqueUsers, 1)) * 5);
  }

  private calculateInfrastructureRisk(events: SecurityEvent[]): number {
    const infraEvents = events.filter(
      (e) => e.source.includes("server") || e.source.includes("database"),
    );
    return Math.min(100, infraEvents.length * 4);
  }

  private calculateRiskTrends(): {
    direction: "increasing" | "decreasing" | "stable";
    percentage: number;
    period: string;
  } {
    // Placeholder implementation
    return {
      direction: "stable",
      percentage: 2.5,
      period: "7 days",
    };
  }

  private identifyTopRisks(
    events: SecurityEvent[],
    threats: ThreatDetection[],
  ): Array<{
    description: string;
    impact: number;
    likelihood: number;
    mitigation: string;
  }> {
    return [
      {
        description: "Brute force authentication attacks",
        impact: 80,
        likelihood: 65,
        mitigation: "Implement account lockout and rate limiting",
      },
      {
        description: "Insider threat data access",
        impact: 95,
        likelihood: 30,
        mitigation: "Enhanced user behavior monitoring",
      },
      {
        description: "Network intrusion attempts",
        impact: 75,
        likelihood: 40,
        mitigation: "Deploy network segmentation and monitoring",
      },
    ];
  }

  private calculateMTTD(threats: ThreatDetection[]): number {
    if (threats.length === 0) return 0;

    const detectionTimes = threats.map((t) => {
      const firstEvent = this.securityEvents.find((e) =>
        t.eventIds.includes(e.id),
      );
      if (firstEvent) {
        return (
          (t.detectionTime.getTime() - firstEvent.timestamp.getTime()) /
          (1000 * 60)
        ); // minutes
      }
      return 0;
    });

    return (
      detectionTimes.reduce((sum, time) => sum + time, 0) /
      detectionTimes.length
    );
  }

  private calculateMTTR(threats: ThreatDetection[]): number {
    const resolvedThreats = threats.filter((t) => t.status === "resolved");

    if (resolvedThreats.length === 0) return 0;

    const responseTimes = resolvedThreats.map((t) => {
      const firstResponse = t.responseActions[0];
      if (firstResponse && firstResponse.executedAt) {
        return (
          (firstResponse.executedAt.getTime() - t.detectionTime.getTime()) /
          (1000 * 60)
        ); // minutes
      }
      return 0;
    });

    return (
      responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length
    );
  }

  private calculateSecurityScore(): number {
    const recentEvents = this.securityEvents.filter(
      (e) => e.timestamp > new Date(Date.now() - 24 * 60 * 60 * 1000),
    );

    const criticalEvents = recentEvents.filter(
      (e) => e.severity === "critical",
    ).length;
    const highEvents = recentEvents.filter((e) => e.severity === "high").length;

    let score = 100;
    score -= criticalEvents * 10;
    score -= highEvents * 5;

    return Math.max(0, score);
  }

  private calculateThreatTrends(): Array<{
    period: string;
    count: number;
    severity: string;
  }> {
    const trends = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const day = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayThreats = this.threatDetections.filter((t) => {
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

      const criticalThreats = dayThreats.filter(
        (t) => t.riskScore >= 80,
      ).length;
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

  private calculateTopThreats(
    events: SecurityEvent[],
  ): Array<{ name: string; count: number; severity: string }> {
    const threatCounts = new Map<string, { count: number; severity: string }>();

    events.forEach((event) => {
      const threatType = event.eventType;
      const existing = threatCounts.get(threatType) || {
        count: 0,
        severity: "low",
      };

      existing.count++;
      if (event.severity === "critical" || existing.severity === "critical") {
        existing.severity = "critical";
      } else if (event.severity === "high" || existing.severity === "high") {
        existing.severity = "high";
      } else if (
        event.severity === "medium" ||
        existing.severity === "medium"
      ) {
        existing.severity = "medium";
      }

      threatCounts.set(threatType, existing);
    });

    return Array.from(threatCounts.entries())
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }

  private maintainEventBuffer(): void {
    // Keep only last 10000 events
    if (this.securityEvents.length > 10000) {
      this.securityEvents = this.securityEvents.slice(-5000);
    }
  }

  private maintainInsightHistory(): void {
    // Keep only last 1000 insights
    if (this.insightHistory.length > 1000) {
      this.insightHistory = this.insightHistory.slice(-500);
    }
  }

  private invalidateCache(): void {
    // Clear relevant cache entries when new data arrives
    this.analyticsCache.delete("metrics");
    this.analyticsCache.delete("insights");
  }

  private generateInsightId(): string {
    return `insight_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  public getInsightHistory(): SecurityInsight[] {
    return [...this.insightHistory];
  }

  public clearInsightHistory(): void {
    this.insightHistory = [];
  }
}

export default SecurityAnalyticsEngine.getInstance();
