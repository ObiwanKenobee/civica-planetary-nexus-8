// CIVICA 144 Error Reporting Utility
// Comprehensive error tracking and debugging

export interface ErrorReport {
  type: "load_failure" | "import_error" | "runtime_error" | "network_error";
  message: string;
  stack?: string;
  url?: string;
  timestamp: string;
  userAgent: string;
  platform: string;
  environment: "development" | "production";
  context: {
    route?: string;
    component?: string;
    userAction?: string;
    additionalInfo?: Record<string, any>;
  };
}

export class ErrorReporter {
  private static instance: ErrorReporter;
  private errorQueue: ErrorReport[] = [];

  static getInstance(): ErrorReporter {
    if (!ErrorReporter.instance) {
      ErrorReporter.instance = new ErrorReporter();
    }
    return ErrorReporter.instance;
  }

  private constructor() {
    this.setupGlobalErrorHandlers();
  }

  private setupGlobalErrorHandlers() {
    // Enhanced JavaScript error handler
    if (typeof window !== "undefined") {
      window.addEventListener("error", (event) => {
        this.reportError({
          type: "runtime_error",
          message: event.message || "Unknown runtime error",
          stack: event.error?.stack,
          url: event.filename,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          platform: this.detectPlatform(),
          environment: this.getEnvironment(),
          context: {
            route: window.location.pathname,
            component: this.extractComponentFromStack(event.error?.stack),
            additionalInfo: {
              lineno: event.lineno,
              colno: event.colno,
              type: event.type,
            },
          },
        });

        // Enhanced load failure detection
        if (
          event.message?.includes("Load failed") ||
          event.message?.includes("Loading module") ||
          event.message?.includes("Failed to fetch")
        ) {
          console.warn("🔧 Load failure detected:", {
            message: event.message,
            filename: event.filename,
            suggestions: this.getLoadFailureSuggestions(),
          });
        }
      });

      // Unhandled promise rejection handler
      window.addEventListener("unhandledrejection", (event) => {
        this.reportError({
          type: "runtime_error",
          message: `Unhandled Promise Rejection: ${event.reason}`,
          stack: event.reason?.stack,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          platform: this.detectPlatform(),
          environment: this.getEnvironment(),
          context: {
            route: window.location.pathname,
            userAction: "promise_rejection",
            additionalInfo: {
              reason: event.reason,
              type: "unhandledrejection",
            },
          },
        });
      });

      // Enhanced network error detection
      window.addEventListener("offline", () => {
        this.reportError({
          type: "network_error",
          message: "Application went offline",
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          platform: this.detectPlatform(),
          environment: this.getEnvironment(),
          context: {
            route: window.location.pathname,
            userAction: "network_offline",
            additionalInfo: {
              connectionType: (navigator as any).connection?.type || "unknown",
              effectiveType:
                (navigator as any).connection?.effectiveType || "unknown",
              onlineStatus: navigator.onLine,
            },
          },
        });
      });

      window.addEventListener("online", () => {
        console.log("✅ Application back online");
        this.reportError({
          type: "network_error",
          message: "Application back online",
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          platform: this.detectPlatform(),
          environment: this.getEnvironment(),
          context: {
            route: window.location.pathname,
            userAction: "network_online",
            additionalInfo: {
              connectionType: (navigator as any).connection?.type || "unknown",
              effectiveType:
                (navigator as any).connection?.effectiveType || "unknown",
            },
          },
        });
      });
    }
  }

  reportError(errorReport: ErrorReport) {
    // Add to queue
    this.errorQueue.push(errorReport);

    // Console logging with enhanced formatting
    console.group(`🚨 ${errorReport.type.toUpperCase()}`);
    console.error("Message:", errorReport.message);
    console.error("Timestamp:", errorReport.timestamp);
    console.error("Route:", errorReport.context.route);
    if (errorReport.context.component) {
      console.error("Component:", errorReport.context.component);
    }
    if (errorReport.stack) {
      console.error("Stack trace:", errorReport.stack);
    }
    if (errorReport.context.additionalInfo) {
      console.error("Additional info:", errorReport.context.additionalInfo);
    }
    console.groupEnd();

    // In production, you could send to external error tracking service
    if (this.getEnvironment() === "production") {
      this.sendToExternalService(errorReport);
    }

    // Attempt recovery suggestions
    this.suggestRecovery(errorReport);
  }

  private detectPlatform(): string {
    if (typeof window === "undefined") return "server";

    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes("mobile")) return "mobile";
    if (userAgent.includes("tablet")) return "tablet";
    if (userAgent.includes("electron")) return "electron";
    return "desktop";
  }

  private getEnvironment(): "development" | "production" {
    return import.meta.env.DEV ? "development" : "production";
  }

  private extractComponentFromStack(stack?: string): string | undefined {
    if (!stack) return undefined;

    // Try to extract React component name from stack trace
    const componentMatch = stack.match(/at (\w+)(?:\s|\()/);
    return componentMatch?.[1];
  }

  private getLoadFailureSuggestions(): string[] {
    return [
      "Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)",
      "Clear browser cache and cookies",
      "Check network connectivity",
      "Disable browser extensions temporarily",
      "Try incognito/private browsing mode",
      "Check console for specific module import errors",
      "Verify all dependencies are installed correctly",
    ];
  }

  private suggestRecovery(errorReport: ErrorReport) {
    switch (errorReport.type) {
      case "load_failure":
        console.warn("💡 Recovery suggestions for load failure:");
        this.getLoadFailureSuggestions().forEach((suggestion) => {
          console.warn(`  • ${suggestion}`);
        });
        break;

      case "import_error":
        console.warn("💡 Recovery suggestions for import error:");
        console.warn("  • Check if all dependencies are installed");
        console.warn("  • Verify import paths are correct");
        console.warn("  • Restart the development server");
        break;

      case "network_error":
        console.warn("💡 Recovery suggestions for network error:");
        console.warn("  • Check internet connection");
        console.warn("  • Try switching between WiFi and mobile data");
        console.warn("  • Restart your router/modem");
        console.warn("  • Check if other websites work");
        console.warn("  • Disable VPN temporarily");
        console.warn("  • Clear browser cache and cookies");
        console.warn("  • Try incognito/private browsing mode");
        break;

      case "runtime_error":
        console.warn("💡 Recovery suggestions for runtime error:");
        console.warn("  • Check browser console for additional details");
        console.warn("  • Verify component props and state");
        console.warn("  • Check for missing environment variables");
        break;
    }
  }

  private sendToExternalService(errorReport: ErrorReport) {
    // In production, integrate with services like Sentry, LogRocket, etc.
    console.log("📡 Would send error report to external service:", errorReport);
  }

  // Public methods for manual error reporting
  reportLoadFailure(details: {
    url?: string;
    component?: string;
    action?: string;
  }) {
    this.reportError({
      type: "load_failure",
      message: "Manual load failure report",
      timestamp: new Date().toISOString(),
      userAgent:
        typeof window !== "undefined" ? navigator.userAgent : "unknown",
      platform: this.detectPlatform(),
      environment: this.getEnvironment(),
      context: {
        route:
          typeof window !== "undefined" ? window.location.pathname : "unknown",
        component: details.component,
        userAction: details.action,
        additionalInfo: details,
      },
    });
  }

  reportImportError(module: string, error: Error) {
    this.reportError({
      type: "import_error",
      message: `Failed to import module: ${module}`,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userAgent:
        typeof window !== "undefined" ? navigator.userAgent : "unknown",
      platform: this.detectPlatform(),
      environment: this.getEnvironment(),
      context: {
        route:
          typeof window !== "undefined" ? window.location.pathname : "unknown",
        component: module,
        additionalInfo: {
          moduleName: module,
          errorName: error.name,
          errorMessage: error.message,
        },
      },
    });
  }

  getErrorQueue(): ErrorReport[] {
    return [...this.errorQueue];
  }

  clearErrorQueue(): void {
    this.errorQueue = [];
  }

  // Debug information
  getDebugInfo() {
    return {
      platform: this.detectPlatform(),
      environment: this.getEnvironment(),
      userAgent:
        typeof window !== "undefined" ? navigator.userAgent : "unknown",
      errorCount: this.errorQueue.length,
      currentRoute:
        typeof window !== "undefined" ? window.location.pathname : "unknown",
      timestamp: new Date().toISOString(),
    };
  }
}

// Export singleton instance
export const errorReporter = ErrorReporter.getInstance();

// Export utility functions
export const reportLoadFailure = (
  details: Parameters<typeof errorReporter.reportLoadFailure>[0],
) => errorReporter.reportLoadFailure(details);

export const reportImportError = (module: string, error: Error) =>
  errorReporter.reportImportError(module, error);

export const getDebugInfo = () => errorReporter.getDebugInfo();
