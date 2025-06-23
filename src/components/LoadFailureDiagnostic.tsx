// CIVICA 144 Load Failure Diagnostic Component
// Help identify and resolve load issues

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Shield,
  Globe,
  Zap,
  Clock,
  Info,
  ExternalLink,
} from "lucide-react";
import { errorReporter } from "@/utils/errorReporting";

interface DiagnosticResult {
  name: string;
  status: "pass" | "fail" | "warning" | "pending";
  message: string;
  suggestion?: string;
}

const LoadFailureDiagnostic: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [lastRun, setLastRun] = useState<Date | null>(null);

  const runDiagnostics = async () => {
    setIsRunning(true);
    const results: DiagnosticResult[] = [];

    try {
      // Test 1: Basic JavaScript execution
      results.push({
        name: "JavaScript Execution",
        status: "pass",
        message: "JavaScript is executing correctly",
      });

      // Test 2: React Runtime
      results.push({
        name: "React Runtime",
        status: "pass",
        message: "React is functioning properly",
      });

      // Test 3: Module imports
      try {
        const testModule = await import("@/components/ui/button");
        results.push({
          name: "Module Imports",
          status: testModule ? "pass" : "fail",
          message: testModule
            ? "UI components importing correctly"
            : "Module import failed",
        });
      } catch (error) {
        results.push({
          name: "Module Imports",
          status: "fail",
          message: `Import failed: ${error}`,
          suggestion:
            "Check if all dependencies are installed and paths are correct",
        });
      }

      // Test 4: Local Storage
      try {
        localStorage.setItem("civica_test", "test");
        localStorage.removeItem("civica_test");
        results.push({
          name: "Local Storage",
          status: "pass",
          message: "Local storage is accessible",
        });
      } catch (error) {
        results.push({
          name: "Local Storage",
          status: "warning",
          message: "Local storage access restricted",
          suggestion: "Check browser privacy settings",
        });
      }

      // Test 5: Network connectivity
      try {
        const response = await fetch("/src/main.tsx", { method: "HEAD" });
        results.push({
          name: "Network Connectivity",
          status: response.ok ? "pass" : "warning",
          message: response.ok
            ? "Dev server is reachable"
            : `HTTP ${response.status}`,
        });
      } catch (error) {
        results.push({
          name: "Network Connectivity",
          status: "fail",
          message: "Cannot reach development server",
          suggestion:
            "Check if the dev server is running and network connection is stable",
        });
      }

      // Test 6: Browser compatibility
      const isModernBrowser =
        "fetch" in window && "Promise" in window && "Map" in window;
      results.push({
        name: "Browser Compatibility",
        status: isModernBrowser ? "pass" : "warning",
        message: isModernBrowser
          ? "Browser supports modern features"
          : "Browser may be outdated",
        suggestion: isModernBrowser
          ? undefined
          : "Consider updating to a modern browser",
      });

      // Test 7: Console errors
      const errorQueue = errorReporter.getErrorQueue();
      results.push({
        name: "Console Errors",
        status: errorQueue.length === 0 ? "pass" : "warning",
        message:
          errorQueue.length === 0
            ? "No recent errors detected"
            : `${errorQueue.length} error(s) in queue`,
        suggestion:
          errorQueue.length > 0
            ? "Check browser console for detailed error information"
            : undefined,
      });

      // Test 8: Environment variables
      const hasEnvVars = import.meta.env.VITE_APP_ENVIRONMENT !== undefined;
      results.push({
        name: "Environment Configuration",
        status: hasEnvVars ? "pass" : "warning",
        message: hasEnvVars
          ? "Environment variables loaded"
          : "Some environment variables missing",
        suggestion: hasEnvVars ? undefined : "Check .env file configuration",
      });

      setDiagnostics(results);
      setLastRun(new Date());
    } catch (error) {
      console.error("Diagnostic error:", error);
      results.push({
        name: "Diagnostic System",
        status: "fail",
        message: `Diagnostic failed: ${error}`,
        suggestion: "Contact support if this persists",
      });
      setDiagnostics(results);
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    // Run diagnostics on mount
    runDiagnostics();
  }, []);

  const getStatusIcon = (status: DiagnosticResult["status"]) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "fail":
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case "pending":
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: DiagnosticResult["status"]) => {
    switch (status) {
      case "pass":
        return "border-green-400/20 bg-green-500/10";
      case "fail":
        return "border-red-400/20 bg-red-500/10";
      case "warning":
        return "border-yellow-400/20 bg-yellow-500/10";
      case "pending":
        return "border-gray-400/20 bg-gray-500/10";
    }
  };

  const hasFailures = diagnostics.some((d) => d.status === "fail");
  const hasWarnings = diagnostics.some((d) => d.status === "warning");

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-400/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-400">
            <Shield className="w-5 h-5" />
            <span>CIVICA 144 Load Failure Diagnostic</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button
                onClick={runDiagnostics}
                disabled={isRunning}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Run Diagnostics
                  </>
                )}
              </Button>
              {lastRun && (
                <span className="text-sm text-gray-400">
                  Last run: {lastRun.toLocaleTimeString()}
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <Badge
                variant={
                  hasFailures
                    ? "destructive"
                    : hasWarnings
                      ? "secondary"
                      : "default"
                }
              >
                {hasFailures
                  ? "Issues Found"
                  : hasWarnings
                    ? "Warnings"
                    : "All Good"}
              </Badge>
            </div>
          </div>

          {/* Overall Status */}
          {hasFailures && (
            <Alert className="mb-4 border-red-400/20 bg-red-500/10">
              <AlertTriangle className="w-4 h-4" />
              <AlertDescription className="text-red-200">
                Critical issues detected that may cause load failures. Please
                address the failing diagnostics below.
              </AlertDescription>
            </Alert>
          )}

          {hasWarnings && !hasFailures && (
            <Alert className="mb-4 border-yellow-400/20 bg-yellow-500/10">
              <Info className="w-4 h-4" />
              <AlertDescription className="text-yellow-200">
                Some warnings detected. The application should work but you may
                experience issues.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Diagnostic Results */}
      <div className="grid gap-4">
        {diagnostics.map((diagnostic, index) => (
          <Card
            key={index}
            className={`${getStatusColor(diagnostic.status)} border backdrop-blur-md`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getStatusIcon(diagnostic.status)}
                  <div>
                    <h4 className="font-semibold text-white">
                      {diagnostic.name}
                    </h4>
                    <p className="text-sm text-gray-300 mt-1">
                      {diagnostic.message}
                    </p>
                    {diagnostic.suggestion && (
                      <p className="text-xs text-gray-400 mt-2 italic">
                        💡 {diagnostic.suggestion}
                      </p>
                    )}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {diagnostic.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-black/40 border-white/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-cyan-400">
            Quick Recovery Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/20"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Hard Refresh
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
              }}
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/20"
            >
              <Shield className="w-4 h-4 mr-2" />
              Clear Cache
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open("/", "_blank")}
              className="border-green-400 text-green-400 hover:bg-green-400/20"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              New Tab
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Debug Information */}
      <Card className="bg-black/40 border-white/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-gray-400">Debug Information</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs text-gray-400 overflow-auto">
            {JSON.stringify(errorReporter.getDebugInfo(), null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadFailureDiagnostic;
