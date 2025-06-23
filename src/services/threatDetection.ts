import {
  SecurityEvent,
  ThreatSignature,
  ThreatDetection,
  MLSecurityModel,
} from "../types/xdrSecurity";

interface DetectionRule {
  id: string;
  name: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  pattern: RegExp | ((event: SecurityEvent) => boolean);
  action: "alert" | "block" | "monitor" | "quarantine";
  enabled: boolean;
  falsePositiveRate: number;
}

interface AnomalyScore {
  score: number;
  factors: {
    factor: string;
    contribution: number;
    description: string;
  }[];
  baseline: Record<string, number>;
  threshold: number;
}

class ThreatDetectionEngine {
  private static instance: ThreatDetectionEngine;
  private detectionRules: Map<string, DetectionRule> = new Map();
  private threatSignatures: Map<string, ThreatSignature> = new Map();
  private mlModels: Map<string, MLSecurityModel> = new Map();
  private eventHistory: SecurityEvent[] = [];
  private baselineMetrics: Map<string, number[]> = new Map();

  private constructor() {
    this.initializeDetectionRules();
    this.initializeThreatSignatures();
    this.initializeMLModels();
  }

  public static getInstance(): ThreatDetectionEngine {
    if (!ThreatDetectionEngine.instance) {
      ThreatDetectionEngine.instance = new ThreatDetectionEngine();
    }
    return ThreatDetectionEngine.instance;
  }

  private initializeDetectionRules(): void {
    const rules: DetectionRule[] = [
      {
        id: "BRUTE_FORCE_LOGIN",
        name: "Brute Force Login Attempt",
        description: "Multiple failed login attempts from same IP",
        severity: "high",
        pattern: (event: SecurityEvent) => {
          if (event.eventType !== "authentication_failure") return false;
          const recentFailures = this.eventHistory.filter(
            (e) =>
              e.ipAddress === event.ipAddress &&
              e.eventType === "authentication_failure" &&
              e.timestamp > new Date(Date.now() - 5 * 60 * 1000), // Last 5 minutes
          );
          return recentFailures.length >= 5;
        },
        action: "block",
        enabled: true,
        falsePositiveRate: 0.02,
      },
      {
        id: "ADMIN_ACCESS_ANOMALY",
        name: "Unusual Administrative Access",
        description: "Administrative access outside normal patterns",
        severity: "critical",
        pattern: (event: SecurityEvent) => {
          return (
            event.eventType.includes("admin") &&
            event.metadata?.privilegeEscalation === true
          );
        },
        action: "alert",
        enabled: true,
        falsePositiveRate: 0.05,
      },
      {
        id: "DATA_EXFILTRATION",
        name: "Potential Data Exfiltration",
        description: "Large data transfer outside normal patterns",
        severity: "critical",
        pattern: (event: SecurityEvent) => {
          const dataTransfer = event.metadata?.dataTransferSize || 0;
          return (
            dataTransfer > 100 * 1024 * 1024 && // > 100MB
            event.eventType.includes("download")
          );
        },
        action: "quarantine",
        enabled: true,
        falsePositiveRate: 0.1,
      },
      {
        id: "GEOLOCATION_ANOMALY",
        name: "Impossible Travel Detection",
        description: "User access from impossible geographic locations",
        severity: "high",
        pattern: (event: SecurityEvent) => {
          if (!event.userId || !event.geoLocation) return false;

          const lastUserEvent = this.eventHistory
            .filter((e) => e.userId === event.userId && e.geoLocation)
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];

          if (!lastUserEvent || !lastUserEvent.geoLocation) return false;

          const distance = this.calculateDistance(
            event.geoLocation.coordinates,
            lastUserEvent.geoLocation.coordinates,
          );

          const timeDiff =
            (event.timestamp.getTime() - lastUserEvent.timestamp.getTime()) /
            (1000 * 60 * 60); // hours
          const maxSpeed = 1000; // km/h (commercial jet speed)

          return distance > maxSpeed * timeDiff;
        },
        action: "alert",
        enabled: true,
        falsePositiveRate: 0.03,
      },
      {
        id: "MALWARE_SIGNATURE",
        name: "Known Malware Signature",
        description: "Detection of known malware signatures",
        severity: "critical",
        pattern: /malware|virus|trojan|ransomware|backdoor/i,
        action: "quarantine",
        enabled: true,
        falsePositiveRate: 0.001,
      },
      {
        id: "PRIVILEGE_ESCALATION",
        name: "Privilege Escalation Attempt",
        description: "Attempt to escalate user privileges",
        severity: "high",
        pattern: (event: SecurityEvent) => {
          return (
            event.eventType.includes("privilege") ||
            event.description.toLowerCase().includes("sudo") ||
            event.description.toLowerCase().includes("admin")
          );
        },
        action: "alert",
        enabled: true,
        falsePositiveRate: 0.08,
      },
    ];

    rules.forEach((rule) => this.detectionRules.set(rule.id, rule));
  }

  private initializeThreatSignatures(): void {
    const signatures: ThreatSignature[] = [
      {
        id: "APT_LATERAL_MOVEMENT",
        name: "APT Lateral Movement Pattern",
        severity: "critical",
        type: "intrusion",
        confidence: 0.85,
        iocs: ["psexec.exe", "wmic.exe", "powershell.exe -enc"],
        mitreTactics: ["T1021", "T1047", "T1059"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "PHISHING_EMAIL_PATTERN",
        name: "Phishing Email Detection",
        severity: "high",
        type: "phishing",
        confidence: 0.75,
        iocs: ["urgent", "verify account", "click here"],
        mitreTactics: ["T1566.001", "T1204.002"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "CRYPTO_MINING_BEHAVIOR",
        name: "Cryptocurrency Mining Activity",
        severity: "medium",
        type: "anomaly",
        confidence: 0.8,
        iocs: ["high cpu usage", "mining pool", "cryptocurrency"],
        mitreTactics: ["T1496"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    signatures.forEach((sig) => this.threatSignatures.set(sig.id, sig));
  }

  private initializeMLModels(): void {
    const models: MLSecurityModel[] = [
      {
        id: "ANOMALY_DETECTOR_V2",
        name: "User Behavior Anomaly Detector",
        type: "anomaly_detection",
        accuracy: 0.92,
        lastTrained: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        features: [
          "login_frequency",
          "access_patterns",
          "data_volume",
          "time_of_day",
        ],
        status: "active",
        version: "2.1.0",
      },
      {
        id: "THREAT_CLASSIFIER_V1",
        name: "Security Event Threat Classifier",
        type: "threat_classification",
        accuracy: 0.88,
        lastTrained: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        features: ["event_type", "source_ip", "user_agent", "payload_size"],
        status: "active",
        version: "1.3.2",
      },
      {
        id: "BEHAVIORAL_ANALYZER_V3",
        name: "Advanced Behavioral Analysis Engine",
        type: "behavioral_analysis",
        accuracy: 0.94,
        lastTrained: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        features: [
          "session_duration",
          "click_patterns",
          "navigation_flow",
          "interaction_speed",
        ],
        status: "active",
        version: "3.0.1",
      },
    ];

    models.forEach((model) => this.mlModels.set(model.id, model));
  }

  public async analyzeEvent(event: SecurityEvent): Promise<ThreatDetection[]> {
    const detections: ThreatDetection[] = [];

    // Add event to history for pattern analysis
    this.eventHistory.push(event);
    this.maintainEventHistory();

    // Rule-based detection
    const ruleDetections = await this.applyDetectionRules(event);
    detections.push(...ruleDetections);

    // Signature-based detection
    const signatureDetections = await this.applyThreatSignatures(event);
    detections.push(...signatureDetections);

    // ML-based detection
    const mlDetections = await this.applyMLModels(event);
    detections.push(...mlDetections);

    // Behavioral analysis
    const behavioralDetections = await this.performBehavioralAnalysis(event);
    detections.push(...behavioralDetections);

    return detections;
  }

  private async applyDetectionRules(
    event: SecurityEvent,
  ): Promise<ThreatDetection[]> {
    const detections: ThreatDetection[] = [];

    for (const rule of this.detectionRules.values()) {
      if (!rule.enabled) continue;

      let matches = false;
      if (rule.pattern instanceof RegExp) {
        const text = `${event.eventType} ${event.description}`;
        matches = rule.pattern.test(text);
      } else if (typeof rule.pattern === "function") {
        matches = rule.pattern(event);
      }

      if (matches) {
        const detection = this.createDetectionFromRule(event, rule);
        detections.push(detection);
      }
    }

    return detections;
  }

  private async applyThreatSignatures(
    event: SecurityEvent,
  ): Promise<ThreatDetection[]> {
    const detections: ThreatDetection[] = [];

    for (const signature of this.threatSignatures.values()) {
      const confidence = this.calculateSignatureMatch(event, signature);

      if (confidence > 0.5) {
        // 50% threshold
        const detection: ThreatDetection = {
          id: this.generateDetectionId(),
          eventIds: [event.id],
          threatSignatureId: signature.id,
          confidence: confidence * 100,
          riskScore: confidence * 100,
          status: "active",
          detectionTime: new Date(),
          lastUpdated: new Date(),
          affectedAssets: [event.source],
          responseActions: [],
          timeline: [
            {
              id: this.generateTimelineId(),
              timestamp: new Date(),
              eventType: "detection",
              description: `Threat signature match: ${signature.name}`,
              actor: "Threat Detection Engine",
              metadata: { signatureId: signature.id, confidence },
            },
          ],
        };

        detections.push(detection);
      }
    }

    return detections;
  }

  private async applyMLModels(
    event: SecurityEvent,
  ): Promise<ThreatDetection[]> {
    const detections: ThreatDetection[] = [];

    for (const model of this.mlModels.values()) {
      if (model.status !== "active") continue;

      const anomalyScore = await this.calculateMLAnomalyScore(event, model);

      if (anomalyScore.score > anomalyScore.threshold) {
        const detection: ThreatDetection = {
          id: this.generateDetectionId(),
          eventIds: [event.id],
          threatSignatureId: `ML_${model.id}`,
          confidence: anomalyScore.score,
          riskScore: anomalyScore.score,
          status: "active",
          detectionTime: new Date(),
          lastUpdated: new Date(),
          affectedAssets: [event.source],
          responseActions: [],
          timeline: [
            {
              id: this.generateTimelineId(),
              timestamp: new Date(),
              eventType: "detection",
              description: `ML model detection: ${model.name}`,
              actor: "ML Detection Engine",
              metadata: {
                modelId: model.id,
                score: anomalyScore.score,
                factors: anomalyScore.factors,
              },
            },
          ],
        };

        detections.push(detection);
      }
    }

    return detections;
  }

  private async performBehavioralAnalysis(
    event: SecurityEvent,
  ): Promise<ThreatDetection[]> {
    const detections: ThreatDetection[] = [];

    if (!event.userId) return detections;

    const userEvents = this.eventHistory.filter(
      (e) =>
        e.userId === event.userId &&
        e.timestamp > new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
    );

    const anomalies = this.detectBehavioralAnomalies(event, userEvents);

    for (const anomaly of anomalies) {
      if (anomaly.severity === "high" || anomaly.severity === "critical") {
        const detection: ThreatDetection = {
          id: this.generateDetectionId(),
          eventIds: [event.id],
          threatSignatureId: `BEHAVIORAL_${anomaly.type}`,
          confidence: anomaly.confidence,
          riskScore: anomaly.confidence,
          status: "active",
          detectionTime: new Date(),
          lastUpdated: new Date(),
          affectedAssets: [event.source],
          responseActions: [],
          timeline: [
            {
              id: this.generateTimelineId(),
              timestamp: new Date(),
              eventType: "detection",
              description: `Behavioral anomaly: ${anomaly.description}`,
              actor: "Behavioral Analysis Engine",
              metadata: { anomaly },
            },
          ],
        };

        detections.push(detection);
      }
    }

    return detections;
  }

  private createDetectionFromRule(
    event: SecurityEvent,
    rule: DetectionRule,
  ): ThreatDetection {
    const confidence = (1 - rule.falsePositiveRate) * 100;

    return {
      id: this.generateDetectionId(),
      eventIds: [event.id],
      threatSignatureId: rule.id,
      confidence,
      riskScore: this.mapSeverityToScore(rule.severity),
      status: "active",
      detectionTime: new Date(),
      lastUpdated: new Date(),
      affectedAssets: [event.source],
      responseActions: [],
      timeline: [
        {
          id: this.generateTimelineId(),
          timestamp: new Date(),
          eventType: "detection",
          description: `Rule triggered: ${rule.name}`,
          actor: "Rule Engine",
          metadata: { ruleId: rule.id, action: rule.action },
        },
      ],
    };
  }

  private calculateSignatureMatch(
    event: SecurityEvent,
    signature: ThreatSignature,
  ): number {
    let matchScore = 0;
    const totalIndicators = signature.iocs.length;

    if (totalIndicators === 0) return 0;

    const eventText =
      `${event.eventType} ${event.description} ${JSON.stringify(event.metadata)}`.toLowerCase();

    for (const ioc of signature.iocs) {
      if (eventText.includes(ioc.toLowerCase())) {
        matchScore += 1;
      }
    }

    return (matchScore / totalIndicators) * signature.confidence;
  }

  private async calculateMLAnomalyScore(
    event: SecurityEvent,
    model: MLSecurityModel,
  ): Promise<AnomalyScore> {
    // Simulated ML scoring - in production, this would call actual ML models
    const baseScore = Math.random() * 100;
    const factors = model.features.map((feature) => ({
      factor: feature,
      contribution: Math.random() * 20,
      description: `${feature} analysis result`,
    }));

    return {
      score: baseScore,
      factors,
      baseline: this.getModelBaseline(model.id),
      threshold: 70, // 70% threshold for anomaly detection
    };
  }

  private detectBehavioralAnomalies(
    currentEvent: SecurityEvent,
    userHistory: SecurityEvent[],
  ): Array<{
    type: string;
    severity: "low" | "medium" | "high" | "critical";
    confidence: number;
    description: string;
  }> {
    const anomalies = [];

    // Check for unusual access times
    const currentHour = currentEvent.timestamp.getHours();
    const historicalHours = userHistory.map((e) => e.timestamp.getHours());
    const avgHour =
      historicalHours.reduce((a, b) => a + b, 0) / historicalHours.length;

    if (Math.abs(currentHour - avgHour) > 6) {
      anomalies.push({
        type: "UNUSUAL_TIME",
        severity: "medium" as const,
        confidence: 65,
        description: "User accessing system at unusual time",
      });
    }

    // Check for rapid successive events
    const recentEvents = userHistory.filter(
      (e) => e.timestamp > new Date(Date.now() - 5 * 60 * 1000),
    );

    if (recentEvents.length > 50) {
      anomalies.push({
        type: "RAPID_ACTIVITY",
        severity: "high" as const,
        confidence: 80,
        description: "Unusually rapid user activity detected",
      });
    }

    return anomalies;
  }

  private calculateDistance(
    coord1: [number, number],
    coord2: [number, number],
  ): number {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;

    const R = 6371; // Earth's radius in km
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(lat1)) *
        Math.cos(this.degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  private mapSeverityToScore(severity: string): number {
    switch (severity) {
      case "critical":
        return 90;
      case "high":
        return 75;
      case "medium":
        return 50;
      case "low":
        return 25;
      default:
        return 10;
    }
  }

  private getModelBaseline(modelId: string): Record<string, number> {
    return this.baselineMetrics.get(modelId) || {};
  }

  private maintainEventHistory(): void {
    // Keep only last 1000 events to manage memory
    if (this.eventHistory.length > 1000) {
      this.eventHistory = this.eventHistory.slice(-500);
    }
  }

  private generateDetectionId(): string {
    return `det_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateTimelineId(): string {
    return `tl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  public getThreatSignatures(): ThreatSignature[] {
    return Array.from(this.threatSignatures.values());
  }

  public getDetectionRules(): DetectionRule[] {
    return Array.from(this.detectionRules.values());
  }

  public getMLModels(): MLSecurityModel[] {
    return Array.from(this.mlModels.values());
  }

  public updateDetectionRule(
    ruleId: string,
    updates: Partial<DetectionRule>,
  ): void {
    const rule = this.detectionRules.get(ruleId);
    if (rule) {
      this.detectionRules.set(ruleId, { ...rule, ...updates });
    }
  }

  public addCustomRule(rule: DetectionRule): void {
    this.detectionRules.set(rule.id, rule);
  }

  public removeDetectionRule(ruleId: string): void {
    this.detectionRules.delete(ruleId);
  }
}

export default ThreatDetectionEngine.getInstance();
