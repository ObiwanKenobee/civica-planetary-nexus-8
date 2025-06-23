// CIVICA 144 ScrollSignal Logger
// Production-level logging, error handling, and monitoring

import { CivicScroll, CommunityMember, IoTReading } from "@/types/scrollSignal";

export type LogLevel = "debug" | "info" | "warn" | "error" | "critical";

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: LogLevel;
  category: string;
  message: string;
  data?: any;
  userId?: string;
  sessionId?: string;
  scrollId?: string;
  communityId?: string;
  stack?: string;
  context?: Record<string, any>;
}

export interface LoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableRemote: boolean;
  enableLocalStorage: boolean;
  maxLocalEntries: number;
  remoteEndpoint?: string;
  batchSize: number;
  flushInterval: number;
}

export class ScrollSignalLogger {
  private static instance: ScrollSignalLogger;
  private config: LoggerConfig;
  private localBuffer: LogEntry[] = [];
  private sessionId: string;
  private flushTimer: NodeJS.Timeout | null = null;

  private constructor() {
    this.sessionId = this.generateSessionId();
    this.config = this.getDefaultConfig();
    this.setupFlushTimer();
    this.setupErrorHandlers();
  }

  public static getInstance(): ScrollSignalLogger {
    if (!ScrollSignalLogger.instance) {
      ScrollSignalLogger.instance = new ScrollSignalLogger();
    }
    return ScrollSignalLogger.instance;
  }

  private getDefaultConfig(): LoggerConfig {
    const isDev = window.location.hostname.includes("localhost");
    return {
      level: isDev ? "debug" : "info",
      enableConsole: isDev,
      enableRemote: !isDev,
      enableLocalStorage: true,
      maxLocalEntries: 1000,
      remoteEndpoint: isDev ? undefined : "https://api.civica144.com/logs",
      batchSize: 10,
      flushInterval: 5000, // 5 seconds
    };
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupFlushTimer(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }

    this.flushTimer = setInterval(() => {
      this.flush();
    }, this.config.flushInterval);
  }

  private setupErrorHandlers(): void {
    // Global error handler
    window.addEventListener("error", (event) => {
      this.error("Global Error", {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener("unhandledrejection", (event) => {
      this.error("Unhandled Promise Rejection", {
        reason: event.reason,
        stack: event.reason?.stack,
      });
    });
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = ["debug", "info", "warn", "error", "critical"];
    const currentLevelIndex = levels.indexOf(this.config.level);
    const messageLevelIndex = levels.indexOf(level);
    return messageLevelIndex >= currentLevelIndex;
  }

  private createLogEntry(
    level: LogLevel,
    category: string,
    message: string,
    data?: any,
    context?: Record<string, any>,
  ): LogEntry {
    return {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      timestamp: new Date(),
      level,
      category,
      message,
      data,
      sessionId: this.sessionId,
      context: {
        userAgent: navigator.userAgent,
        url: window.location.href,
        ...context,
      },
    };
  }

  private log(
    level: LogLevel,
    category: string,
    message: string,
    data?: any,
    context?: Record<string, any>,
  ): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const entry = this.createLogEntry(level, category, message, data, context);

    // Console logging
    if (this.config.enableConsole) {
      const style = this.getConsoleStyle(level);
      console.log(
        `%c[${level.toUpperCase()}] ${category}: ${message}`,
        style,
        data || "",
      );
    }

    // Add to local buffer
    this.localBuffer.push(entry);

    // Manage buffer size
    if (this.localBuffer.length > this.config.maxLocalEntries) {
      this.localBuffer = this.localBuffer.slice(-this.config.maxLocalEntries);
    }

    // Local storage persistence
    if (this.config.enableLocalStorage) {
      try {
        const stored = JSON.parse(
          localStorage.getItem("scrollsignal_logs") || "[]",
        );
        stored.push(entry);
        const trimmed = stored.slice(-this.config.maxLocalEntries);
        localStorage.setItem("scrollsignal_logs", JSON.stringify(trimmed));
      } catch (error) {
        console.warn("Failed to store log entry:", error);
      }
    }

    // Auto-flush for critical errors
    if (level === "critical" || level === "error") {
      this.flush();
    }
  }

  private getConsoleStyle(level: LogLevel): string {
    const styles = {
      debug: "color: #6B7280; font-weight: normal;",
      info: "color: #3B82F6; font-weight: bold;",
      warn: "color: #F59E0B; font-weight: bold;",
      error: "color: #EF4444; font-weight: bold;",
      critical:
        "color: #DC2626; font-weight: bold; background: #FEE2E2; padding: 2px 4px;",
    };
    return styles[level];
  }

  // Public logging methods
  public debug(
    message: string,
    data?: any,
    context?: Record<string, any>,
  ): void {
    this.log("debug", "Debug", message, data, context);
  }

  public info(
    message: string,
    data?: any,
    context?: Record<string, any>,
  ): void {
    this.log("info", "Info", message, data, context);
  }

  public warn(
    message: string,
    data?: any,
    context?: Record<string, any>,
  ): void {
    this.log("warn", "Warning", message, data, context);
  }

  public error(
    message: string,
    data?: any,
    context?: Record<string, any>,
  ): void {
    this.log("error", "Error", message, data, context);
  }

  public critical(
    message: string,
    data?: any,
    context?: Record<string, any>,
  ): void {
    this.log("critical", "Critical", message, data, context);
  }

  // Specialized logging methods for ScrollSignal
  public logScrollCreation(scroll: CivicScroll, user: CommunityMember): void {
    this.info(
      "Scroll Created",
      {
        scrollId: scroll.id,
        type: scroll.type,
        userId: user.id,
        title: scroll.title,
        aiGenerated: scroll.aiGenerated,
      },
      {
        scrollId: scroll.id,
        userId: user.id,
        communityId: user.village,
      },
    );
  }

  public logVoiceInput(
    transcript: string,
    confidence: number,
    language: string,
  ): void {
    this.debug("Voice Input Received", {
      transcript: transcript.substring(0, 100), // Truncate for privacy
      confidence,
      language,
      length: transcript.length,
    });
  }

  public logAIGeneration(
    prompt: string,
    response: string,
    model: string,
    duration: number,
  ): void {
    this.info("AI Generation Completed", {
      model,
      duration,
      promptLength: prompt.length,
      responseLength: response.length,
    });
  }

  public logRitualBlessing(
    scroll: CivicScroll,
    blesser: CommunityMember,
    power: number,
  ): void {
    this.info(
      "Ritual Blessing Performed",
      {
        scrollId: scroll.id,
        blesserId: blesser.id,
        blesserRole: blesser.role,
        power,
        scrollType: scroll.type,
      },
      {
        scrollId: scroll.id,
        userId: blesser.id,
        communityId: blesser.village,
      },
    );
  }

  public logIoTReading(reading: IoTReading): void {
    this.debug("IoT Reading Received", {
      sensorId: reading.sensorId,
      type: reading.type,
      value: reading.value,
      quality: reading.quality,
      alert: reading.alert,
      location: reading.location,
    });
  }

  public logSimulationRun(
    scenario: string,
    confidence: number,
    duration: number,
  ): void {
    this.info("Simulation Completed", {
      scenario,
      confidence,
      duration,
    });
  }

  public logCulturalAccess(
    storyTitle: string,
    user: CommunityMember,
    accessType: string,
  ): void {
    this.info(
      "Cultural Content Accessed",
      {
        storyTitle,
        userId: user.id,
        userRole: user.role,
        accessType,
      },
      {
        userId: user.id,
        communityId: user.village,
      },
    );
  }

  public logPerformanceMetric(
    metric: string,
    value: number,
    unit: string,
  ): void {
    this.debug("Performance Metric", {
      metric,
      value,
      unit,
    });
  }

  // Batch operations
  public async flush(): Promise<void> {
    if (!this.config.enableRemote || this.localBuffer.length === 0) {
      return;
    }

    const toFlush = this.localBuffer.splice(0, this.config.batchSize);

    if (this.config.remoteEndpoint) {
      try {
        await fetch(this.config.remoteEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            logs: toFlush,
            sessionId: this.sessionId,
            platform: "scrollsignal",
            version: "1.0.0",
          }),
        });
      } catch (error) {
        // If remote logging fails, put entries back in buffer
        this.localBuffer.unshift(...toFlush);
        this.warn("Failed to send logs to remote endpoint", {
          error: error.message,
        });
      }
    }
  }

  // Configuration management
  public updateConfig(newConfig: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.setupFlushTimer();
  }

  public getConfig(): LoggerConfig {
    return { ...this.config };
  }

  // Retrieval and analysis
  public getRecentLogs(count: number = 100): LogEntry[] {
    return this.localBuffer.slice(-count);
  }

  public getLogsByLevel(level: LogLevel, count: number = 50): LogEntry[] {
    return this.localBuffer
      .filter((entry) => entry.level === level)
      .slice(-count);
  }

  public getLogsByCategory(category: string, count: number = 50): LogEntry[] {
    return this.localBuffer
      .filter((entry) => entry.category === category)
      .slice(-count);
  }

  public exportLogs(): string {
    return JSON.stringify(
      {
        sessionId: this.sessionId,
        exportedAt: new Date().toISOString(),
        config: this.config,
        logs: this.localBuffer,
      },
      null,
      2,
    );
  }

  public clearLogs(): void {
    this.localBuffer = [];
    if (this.config.enableLocalStorage) {
      localStorage.removeItem("scrollsignal_logs");
    }
  }

  // Analytics helpers
  public getLogStats(): Record<string, number> {
    const stats: Record<string, number> = {
      total: this.localBuffer.length,
      debug: 0,
      info: 0,
      warn: 0,
      error: 0,
      critical: 0,
    };

    this.localBuffer.forEach((entry) => {
      stats[entry.level]++;
    });

    return stats;
  }

  public getErrorRate(): number {
    const total = this.localBuffer.length;
    if (total === 0) return 0;

    const errors = this.localBuffer.filter(
      (entry) => entry.level === "error" || entry.level === "critical",
    ).length;

    return errors / total;
  }

  // Cleanup
  public destroy(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    this.flush();
  }
}

// Export singleton instance
export const scrollSignalLogger = ScrollSignalLogger.getInstance();

// Convenience exports
export const logScrollCreation = (scroll: CivicScroll, user: CommunityMember) =>
  scrollSignalLogger.logScrollCreation(scroll, user);

export const logVoiceInput = (
  transcript: string,
  confidence: number,
  language: string,
) => scrollSignalLogger.logVoiceInput(transcript, confidence, language);

export const logAIGeneration = (
  prompt: string,
  response: string,
  model: string,
  duration: number,
) => scrollSignalLogger.logAIGeneration(prompt, response, model, duration);

export const logRitualBlessing = (
  scroll: CivicScroll,
  blesser: CommunityMember,
  power: number,
) => scrollSignalLogger.logRitualBlessing(scroll, blesser, power);

export const logIoTReading = (reading: IoTReading) =>
  scrollSignalLogger.logIoTReading(reading);

export const logPerformance = (metric: string, value: number, unit: string) =>
  scrollSignalLogger.logPerformanceMetric(metric, value, unit);
