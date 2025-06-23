// CIVICA 144 ScrollSignal Analytics
// Production-level analytics, monitoring, and insights

import {
  CivicScroll,
  CommunityMember,
  IoTReading,
  SimulationResult,
  Blessing,
  ScrollType,
} from "@/types/scrollSignal";
import { scrollSignalLogger } from "./scrollSignalLogger";

export interface AnalyticsConfig {
  enableTracking: boolean;
  enableHeatmaps: boolean;
  enablePerformanceMonitoring: boolean;
  enableUserBehavior: boolean;
  anonymizeData: boolean;
  retentionDays: number;
  batchSize: number;
  flushInterval: number;
}

export interface CommunityMetrics {
  totalScrolls: number;
  activeUsers: number;
  averageBlessings: number;
  completionRate: number;
  responseTime: number;
  errorRate: number;
  culturalEngagement: number;
  ritualParticipation: number;
}

export interface ScrollPerformanceMetrics {
  generationTime: number;
  blessingTime: number;
  completionTime: number;
  aiAccuracy: number;
  communityAcceptance: number;
  impactScore: number;
}

export interface SDGImpactMetrics {
  [key: number]: {
    goal: number;
    name: string;
    scrollsContributing: number;
    averageImpact: number;
    totalBeneficiaries: number;
    improvementPercentage: number;
  };
}

export interface CulturalPreservationMetrics {
  storiesArchived: number;
  languagesSupported: number;
  elderParticipation: number;
  intergenerationalTransfer: number;
  traditionalWisdomIntegration: number;
}

export interface TechnicalPerformanceMetrics {
  voiceRecognitionAccuracy: number;
  aiResponseTime: number;
  edgeComputingLatency: number;
  iotDataQuality: number;
  systemUptime: number;
  bandwidthUsage: number;
}

export class ScrollSignalAnalytics {
  private static instance: ScrollSignalAnalytics;
  private config: AnalyticsConfig;
  private sessionMetrics: Map<string, any> = new Map();
  private performanceObserver: PerformanceObserver | null = null;

  private constructor() {
    this.config = this.getDefaultConfig();
    this.setupPerformanceMonitoring();
  }

  public static getInstance(): ScrollSignalAnalytics {
    if (!ScrollSignalAnalytics.instance) {
      ScrollSignalAnalytics.instance = new ScrollSignalAnalytics();
    }
    return ScrollSignalAnalytics.instance;
  }

  private getDefaultConfig(): AnalyticsConfig {
    const isDev = window.location.hostname.includes("localhost");
    return {
      enableTracking: true,
      enableHeatmaps: !isDev,
      enablePerformanceMonitoring: true,
      enableUserBehavior: true,
      anonymizeData: !isDev,
      retentionDays: isDev ? 7 : 30,
      batchSize: 20,
      flushInterval: 10000, // 10 seconds
    };
  }

  private setupPerformanceMonitoring(): void {
    if (
      !this.config.enablePerformanceMonitoring ||
      !window.PerformanceObserver
    ) {
      return;
    }

    try {
      this.performanceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.trackPerformanceEntry(entry);
        });
      });

      this.performanceObserver.observe({
        entryTypes: ["navigation", "resource", "measure", "paint"],
      });
    } catch (error) {
      scrollSignalLogger.warn("Failed to setup performance monitoring", {
        error,
      });
    }
  }

  private trackPerformanceEntry(entry: PerformanceEntry): void {
    const metric = {
      name: entry.name,
      type: entry.entryType,
      duration: entry.duration,
      startTime: entry.startTime,
      timestamp: Date.now(),
    };

    scrollSignalLogger.logPerformanceMetric(
      `${entry.entryType}_${entry.name}`,
      entry.duration,
      "ms",
    );

    this.sessionMetrics.set(`perf_${Date.now()}`, metric);
  }

  // Core tracking methods
  public trackScrollCreation(
    scroll: CivicScroll,
    user: CommunityMember,
    generationTime: number,
  ): void {
    const event = {
      type: "scroll_created",
      scrollId: scroll.id,
      scrollType: scroll.type,
      userId: this.config.anonymizeData ? this.hashUserId(user.id) : user.id,
      userRole: user.role,
      community: user.village,
      aiGenerated: scroll.aiGenerated,
      generationTime,
      contentLength: scroll.content.length,
      hasVoiceInput: !!scroll.voiceInput,
      language: scroll.metadata.language,
      timestamp: Date.now(),
    };

    this.recordEvent(event);
    scrollSignalLogger.info("Analytics: Scroll creation tracked", event);
  }

  public trackVoiceInteraction(
    transcript: string,
    confidence: number,
    language: string,
    duration: number,
  ): void {
    const event = {
      type: "voice_interaction",
      language,
      confidence,
      duration,
      transcriptLength: transcript.length,
      timestamp: Date.now(),
    };

    this.recordEvent(event);
  }

  public trackRitualBlessing(
    scroll: CivicScroll,
    blesser: CommunityMember,
    blessing: Blessing,
    ceremonyDuration: number,
  ): void {
    const event = {
      type: "ritual_blessing",
      scrollId: scroll.id,
      scrollType: scroll.type,
      blesserId: this.config.anonymizeData
        ? this.hashUserId(blesser.id)
        : blesser.id,
      blesserRole: blesser.role,
      blessingType: blessing.type,
      blessingPower: blessing.power,
      ceremonyDuration,
      community: blesser.village,
      timestamp: Date.now(),
    };

    this.recordEvent(event);
  }

  public trackSimulationRun(
    simulation: SimulationResult,
    scroll: CivicScroll,
    executionTime: number,
  ): void {
    const event = {
      type: "simulation_run",
      simulationId: simulation.id,
      scrollId: scroll.id,
      scenario: simulation.scenario,
      confidence: simulation.confidence,
      executionTime,
      predictionsCount: simulation.predictions.length,
      factorsCount: simulation.factors.length,
      recommendationsCount: simulation.recommendations.length,
      timestamp: Date.now(),
    };

    this.recordEvent(event);
  }

  public trackCulturalAccess(
    storyTitle: string,
    user: CommunityMember,
    accessType: "view" | "search" | "share",
  ): void {
    const event = {
      type: "cultural_access",
      storyTitle: this.config.anonymizeData
        ? this.hashString(storyTitle)
        : storyTitle,
      userId: this.config.anonymizeData ? this.hashUserId(user.id) : user.id,
      userRole: user.role,
      accessType,
      community: user.village,
      timestamp: Date.now(),
    };

    this.recordEvent(event);
  }

  public trackIoTDataUsage(reading: IoTReading, usageContext: string): void {
    const event = {
      type: "iot_data_usage",
      sensorType: reading.type,
      location: reading.location,
      quality: reading.quality,
      hasAlert: reading.alert,
      usageContext,
      timestamp: Date.now(),
    };

    this.recordEvent(event);
  }

  public trackUserSession(
    userId: string,
    sessionDuration: number,
    actionsCount: number,
    scrollsCreated: number,
  ): void {
    const event = {
      type: "user_session",
      userId: this.config.anonymizeData ? this.hashUserId(userId) : userId,
      sessionDuration,
      actionsCount,
      scrollsCreated,
      timestamp: Date.now(),
    };

    this.recordEvent(event);
  }

  // Analytics computation methods
  public async getCommunityMetrics(
    timeframe: "day" | "week" | "month" = "week",
  ): Promise<CommunityMetrics> {
    const events = this.getEventsInTimeframe(timeframe);

    const scrollEvents = events.filter((e) => e.type === "scroll_created");
    const userEvents = new Set(events.map((e) => e.userId)).size;
    const blessingEvents = events.filter((e) => e.type === "ritual_blessing");
    const sessionEvents = events.filter((e) => e.type === "user_session");

    return {
      totalScrolls: scrollEvents.length,
      activeUsers: userEvents,
      averageBlessings:
        scrollEvents.length > 0
          ? blessingEvents.length / scrollEvents.length
          : 0,
      completionRate: this.calculateCompletionRate(events),
      responseTime: this.calculateAverageResponseTime(events),
      errorRate: this.calculateErrorRate(events),
      culturalEngagement: this.calculateCulturalEngagement(events),
      ritualParticipation: this.calculateRitualParticipation(events),
    };
  }

  public async getScrollPerformanceMetrics(
    scrollType?: ScrollType,
  ): Promise<ScrollPerformanceMetrics> {
    const events = this.getRecentEvents(1000);
    const filteredEvents = scrollType
      ? events.filter((e) => e.scrollType === scrollType)
      : events;

    const scrollCreations = filteredEvents.filter(
      (e) => e.type === "scroll_created",
    );
    const blessings = filteredEvents.filter(
      (e) => e.type === "ritual_blessing",
    );
    const simulations = filteredEvents.filter(
      (e) => e.type === "simulation_run",
    );

    return {
      generationTime: this.average(
        scrollCreations.map((e) => e.generationTime),
      ),
      blessingTime: this.average(blessings.map((e) => e.ceremonyDuration)),
      completionTime: this.calculateAverageCompletionTime(filteredEvents),
      aiAccuracy: this.calculateAIAccuracy(scrollCreations),
      communityAcceptance: this.calculateCommunityAcceptance(blessings),
      impactScore: this.calculateImpactScore(simulations),
    };
  }

  public async getSDGImpactMetrics(): Promise<SDGImpactMetrics> {
    const scrollEvents = this.getRecentEvents(1000).filter(
      (e) => e.type === "scroll_created",
    );

    // Mock SDG mapping - in production this would come from actual scroll data
    const sdgMapping = {
      healthcare: [3, 6],
      education: [4, 5],
      environment: [6, 13, 15],
      governance: [16, 17],
      cultural: [11, 16],
    };

    const metrics: SDGImpactMetrics = {};

    Object.entries(sdgMapping).forEach(([scrollType, goals]) => {
      const typeScrolls = scrollEvents.filter(
        (e) => e.scrollType === scrollType,
      );

      goals.forEach((goal) => {
        if (!metrics[goal]) {
          metrics[goal] = {
            goal,
            name: this.getSDGName(goal),
            scrollsContributing: 0,
            averageImpact: 0,
            totalBeneficiaries: 0,
            improvementPercentage: 0,
          };
        }

        metrics[goal].scrollsContributing += typeScrolls.length;
        metrics[goal].averageImpact = this.calculateSDGImpact(
          goal,
          typeScrolls,
        );
        metrics[goal].totalBeneficiaries += typeScrolls.length * 50; // Estimated
        metrics[goal].improvementPercentage = metrics[goal].averageImpact * 100;
      });
    });

    return metrics;
  }

  public async getCulturalPreservationMetrics(): Promise<CulturalPreservationMetrics> {
    const culturalEvents = this.getRecentEvents(1000).filter(
      (e) => e.type === "cultural_access",
    );
    const scrollEvents = this.getRecentEvents(1000).filter(
      (e) => e.type === "scroll_created",
    );

    return {
      storiesArchived: new Set(culturalEvents.map((e) => e.storyTitle)).size,
      languagesSupported: new Set(scrollEvents.map((e) => e.language)).size,
      elderParticipation: this.calculateElderParticipation(scrollEvents),
      intergenerationalTransfer:
        this.calculateIntergenerationalTransfer(culturalEvents),
      traditionalWisdomIntegration:
        this.calculateWisdomIntegration(scrollEvents),
    };
  }

  public async getTechnicalPerformanceMetrics(): Promise<TechnicalPerformanceMetrics> {
    const voiceEvents = this.getRecentEvents(1000).filter(
      (e) => e.type === "voice_interaction",
    );
    const scrollEvents = this.getRecentEvents(1000).filter(
      (e) => e.type === "scroll_created",
    );
    const simulationEvents = this.getRecentEvents(1000).filter(
      (e) => e.type === "simulation_run",
    );
    const iotEvents = this.getRecentEvents(1000).filter(
      (e) => e.type === "iot_data_usage",
    );

    return {
      voiceRecognitionAccuracy: this.average(
        voiceEvents.map((e) => e.confidence),
      ),
      aiResponseTime: this.average(scrollEvents.map((e) => e.generationTime)),
      edgeComputingLatency: this.average(
        simulationEvents.map((e) => e.executionTime),
      ),
      iotDataQuality: this.calculateIoTQuality(iotEvents),
      systemUptime: this.calculateUptime(),
      bandwidthUsage: this.calculateBandwidthUsage(),
    };
  }

  // Helper methods
  private recordEvent(event: any): void {
    const eventId = `event_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    this.sessionMetrics.set(eventId, event);

    // Persist to local storage
    try {
      const stored = JSON.parse(
        localStorage.getItem("scrollsignal_analytics") || "[]",
      );
      stored.push(event);

      // Maintain size limit
      const trimmed = stored.slice(-this.config.batchSize * 10);
      localStorage.setItem("scrollsignal_analytics", JSON.stringify(trimmed));
    } catch (error) {
      scrollSignalLogger.warn("Failed to store analytics event", { error });
    }
  }

  private getEventsInTimeframe(timeframe: "day" | "week" | "month"): any[] {
    const now = Date.now();
    const timeframeDuration = {
      day: 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
    };

    const cutoff = now - timeframeDuration[timeframe];

    try {
      const stored = JSON.parse(
        localStorage.getItem("scrollsignal_analytics") || "[]",
      );
      return stored.filter((event: any) => event.timestamp > cutoff);
    } catch {
      return [];
    }
  }

  private getRecentEvents(count: number): any[] {
    try {
      const stored = JSON.parse(
        localStorage.getItem("scrollsignal_analytics") || "[]",
      );
      return stored.slice(-count);
    } catch {
      return [];
    }
  }

  private hashUserId(userId: string): string {
    // Simple hash for anonymization
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      const char = userId.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return `user_${Math.abs(hash)}`;
  }

  private hashString(str: string): string {
    return `hashed_${str.length}_${str.charCodeAt(0)}`;
  }

  private average(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    return numbers.reduce((sum, num) => sum + (num || 0), 0) / numbers.length;
  }

  private calculateCompletionRate(events: any[]): number {
    const scrollsCreated = events.filter(
      (e) => e.type === "scroll_created",
    ).length;
    const scrollsBlessed = events.filter(
      (e) => e.type === "ritual_blessing",
    ).length;
    return scrollsCreated > 0 ? scrollsBlessed / scrollsCreated : 0;
  }

  private calculateAverageResponseTime(events: any[]): number {
    const scrollEvents = events.filter((e) => e.type === "scroll_created");
    return this.average(scrollEvents.map((e) => e.generationTime));
  }

  private calculateErrorRate(events: any[]): number {
    // This would need to be implemented based on error tracking
    return 0.02; // Mock 2% error rate
  }

  private calculateCulturalEngagement(events: any[]): number {
    const culturalEvents = events.filter(
      (e) => e.type === "cultural_access",
    ).length;
    const totalEvents = events.length;
    return totalEvents > 0 ? culturalEvents / totalEvents : 0;
  }

  private calculateRitualParticipation(events: any[]): number {
    const blessingEvents = events.filter(
      (e) => e.type === "ritual_blessing",
    ).length;
    const scrollEvents = events.filter(
      (e) => e.type === "scroll_created",
    ).length;
    return scrollEvents > 0 ? blessingEvents / scrollEvents : 0;
  }

  private calculateAverageCompletionTime(events: any[]): number {
    // Mock implementation - would calculate from creation to blessing to completion
    return this.average([2000, 3000, 2500, 4000]); // Mock data
  }

  private calculateAIAccuracy(scrollEvents: any[]): number {
    // Mock implementation - would calculate based on community acceptance
    return 0.87; // Mock 87% accuracy
  }

  private calculateCommunityAcceptance(blessingEvents: any[]): number {
    const highPowerBlessings = blessingEvents.filter(
      (e) => e.blessingPower > 80,
    ).length;
    return blessingEvents.length > 0
      ? highPowerBlessings / blessingEvents.length
      : 0;
  }

  private calculateImpactScore(simulationEvents: any[]): number {
    return this.average(simulationEvents.map((e) => e.confidence));
  }

  private getSDGName(goal: number): string {
    const names = {
      3: "Good Health and Well-being",
      4: "Quality Education",
      5: "Gender Equality",
      6: "Clean Water and Sanitation",
      11: "Sustainable Cities and Communities",
      13: "Climate Action",
      15: "Life on Land",
      16: "Peace, Justice and Strong Institutions",
      17: "Partnerships for the Goals",
    };
    return names[goal as keyof typeof names] || `SDG ${goal}`;
  }

  private calculateSDGImpact(goal: number, scrollEvents: any[]): number {
    // Mock calculation - in production would use actual impact data
    return Math.random() * 0.3 + 0.6; // Random between 0.6-0.9
  }

  private calculateElderParticipation(scrollEvents: any[]): number {
    const elderEvents = scrollEvents.filter(
      (e) => e.userRole === "elder",
    ).length;
    return scrollEvents.length > 0 ? elderEvents / scrollEvents.length : 0;
  }

  private calculateIntergenerationalTransfer(culturalEvents: any[]): number {
    // Mock implementation
    return 0.73; // Mock 73% intergenerational transfer rate
  }

  private calculateWisdomIntegration(scrollEvents: any[]): number {
    // Mock implementation
    return 0.68; // Mock 68% wisdom integration rate
  }

  private calculateIoTQuality(iotEvents: any[]): number {
    const qualityScores = {
      excellent: 1.0,
      good: 0.8,
      fair: 0.6,
      poor: 0.3,
    };

    const totalScore = iotEvents.reduce((sum, event) => {
      return (
        sum + (qualityScores[event.quality as keyof typeof qualityScores] || 0)
      );
    }, 0);

    return iotEvents.length > 0 ? totalScore / iotEvents.length : 0;
  }

  private calculateUptime(): number {
    // Mock implementation - would calculate based on system monitoring
    return 0.998; // Mock 99.8% uptime
  }

  private calculateBandwidthUsage(): number {
    // Mock implementation - would calculate based on network monitoring
    return 1.2; // Mock 1.2 MB/s average usage
  }

  // Public configuration methods
  public updateConfig(newConfig: Partial<AnalyticsConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  public exportAnalytics(): string {
    const events = this.getRecentEvents(1000);
    return JSON.stringify(
      {
        config: this.config,
        sessionMetrics: Array.from(this.sessionMetrics.entries()),
        events,
        exportedAt: new Date().toISOString(),
      },
      null,
      2,
    );
  }

  public clearAnalytics(): void {
    this.sessionMetrics.clear();
    localStorage.removeItem("scrollsignal_analytics");
  }
}

// Export singleton instance
export const scrollSignalAnalytics = ScrollSignalAnalytics.getInstance();

// Convenience exports
export const trackScrollCreation = (
  scroll: CivicScroll,
  user: CommunityMember,
  time: number,
) => scrollSignalAnalytics.trackScrollCreation(scroll, user, time);

export const trackVoiceInteraction = (
  transcript: string,
  confidence: number,
  language: string,
  duration: number,
) =>
  scrollSignalAnalytics.trackVoiceInteraction(
    transcript,
    confidence,
    language,
    duration,
  );

export const trackRitualBlessing = (
  scroll: CivicScroll,
  blesser: CommunityMember,
  blessing: Blessing,
  duration: number,
) =>
  scrollSignalAnalytics.trackRitualBlessing(
    scroll,
    blesser,
    blessing,
    duration,
  );
