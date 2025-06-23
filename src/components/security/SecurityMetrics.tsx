import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Shield,
  AlertTriangle,
  Clock,
  Activity,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";

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
  topThreats: Array<{
    name: string;
    count: number;
    severity: string;
  }>;
}

interface SecurityBenchmark {
  metric: string;
  current: number;
  target: number;
  industry: number;
  unit: string;
  trend: "improving" | "degrading" | "stable";
  description: string;
}

interface SecurityMetricsProps {
  className?: string;
}

export function SecurityMetrics({ className }: SecurityMetricsProps) {
  const [metrics, setMetrics] = useState<SecurityMetrics | null>(null);
  const [benchmarks, setBenchmarks] = useState<SecurityBenchmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("24h");

  useEffect(() => {
    loadMetrics();
    const interval = setInterval(loadMetrics, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [timeRange]);

  const loadMetrics = async () => {
    try {
      setLoading(true);

      // Load security metrics
      const response = await fetch("/api/security/xdr?action=metrics");
      const data = await response.json();
      setMetrics(data.metrics);

      // Generate benchmarks
      generateBenchmarks(data.metrics);
    } catch (error) {
      console.error("Failed to load security metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateBenchmarks = (metricsData: SecurityMetrics) => {
    const benchmarks: SecurityBenchmark[] = [
      {
        metric: "Mean Time to Detection",
        current: metricsData.meanTimeToDetection,
        target: 5.0,
        industry: 8.5,
        unit: "minutes",
        trend: metricsData.meanTimeToDetection < 5 ? "improving" : "degrading",
        description: "Time from event occurrence to threat detection",
      },
      {
        metric: "Mean Time to Response",
        current: metricsData.meanTimeToResponse,
        target: 15.0,
        industry: 25.0,
        unit: "minutes",
        trend: metricsData.meanTimeToResponse < 15 ? "improving" : "degrading",
        description: "Time from detection to initial response action",
      },
      {
        metric: "Security Score",
        current: metricsData.securityScore,
        target: 95,
        industry: 78,
        unit: "%",
        trend:
          metricsData.securityScore > 90
            ? "improving"
            : metricsData.securityScore > 70
              ? "stable"
              : "degrading",
        description: "Overall security posture assessment",
      },
      {
        metric: "False Positive Rate",
        current: 5.2, // Simulated
        target: 3.0,
        industry: 12.0,
        unit: "%",
        trend: "improving",
        description: "Percentage of false positive threat detections",
      },
      {
        metric: "Threat Resolution Rate",
        current: 92.5, // Simulated
        target: 95.0,
        industry: 85.0,
        unit: "%",
        trend: "stable",
        description: "Percentage of threats successfully resolved",
      },
    ];

    setBenchmarks(benchmarks);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "degrading":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case "stable":
        return <Minus className="h-4 w-4 text-yellow-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getBenchmarkStatus = (
    current: number,
    target: number,
    isLowerBetter: boolean = false,
  ) => {
    const threshold = isLowerBetter ? current <= target : current >= target;
    return threshold ? "meeting" : "below";
  };

  const getPerformanceColor = (
    current: number,
    target: number,
    industry: number,
  ) => {
    if (current >= target) return "text-green-600";
    if (current >= industry) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading && !metrics) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading security metrics...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Key Performance Indicators */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Security Performance Metrics</span>
              </CardTitle>
              <CardDescription>
                Real-time security operations performance indicators
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <Button
                onClick={loadMetrics}
                disabled={loading}
                size="sm"
                variant="outline"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Security Score
                </span>
                <Shield className="h-4 w-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold">
                {metrics?.securityScore}%
              </div>
              <Progress value={metrics?.securityScore} className="mt-2" />
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Active Threats
                </span>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </div>
              <div className="text-2xl font-bold text-red-600">
                {metrics?.activeThreats}
              </div>
              <div className="text-xs text-muted-foreground">
                Requiring attention
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">MTTD</span>
                <Clock className="h-4 w-4 text-orange-500" />
              </div>
              <div className="text-2xl font-bold">
                {metrics?.meanTimeToDetection.toFixed(1)}m
              </div>
              <div className="text-xs text-muted-foreground">
                Mean time to detection
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">MTTR</span>
                <Clock className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold">
                {metrics?.meanTimeToResponse.toFixed(1)}m
              </div>
              <div className="text-xs text-muted-foreground">
                Mean time to response
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Benchmarks Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Security Benchmarks</CardTitle>
          <CardDescription>
            Performance comparison against targets and industry standards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {benchmarks.map((benchmark, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{benchmark.metric}</span>
                    {getTrendIcon(benchmark.trend)}
                  </div>
                  <Badge
                    variant={
                      getBenchmarkStatus(
                        benchmark.current,
                        benchmark.target,
                        benchmark.metric.includes("Time"),
                      ) === "meeting"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {getBenchmarkStatus(
                      benchmark.current,
                      benchmark.target,
                      benchmark.metric.includes("Time"),
                    ) === "meeting"
                      ? "Meeting Target"
                      : "Below Target"}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Current</div>
                    <div
                      className={`font-medium ${getPerformanceColor(benchmark.current, benchmark.target, benchmark.industry)}`}
                    >
                      {benchmark.current.toFixed(1)}
                      {benchmark.unit}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Target</div>
                    <div className="font-medium">
                      {benchmark.target.toFixed(1)}
                      {benchmark.unit}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Industry Avg</div>
                    <div className="font-medium">
                      {benchmark.industry.toFixed(1)}
                      {benchmark.unit}
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <Progress
                    value={Math.min(
                      (benchmark.current / benchmark.target) * 100,
                      100,
                    )}
                    className="h-2"
                  />
                </div>

                <div className="mt-2 text-xs text-muted-foreground">
                  {benchmark.description}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Threat Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Threat Trends</CardTitle>
            <CardDescription>7-day threat detection history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics?.threatTrends.map((trend, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <span className="text-sm">{trend.period}</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{trend.count}</span>
                    <Badge
                      variant={
                        trend.severity === "critical"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {trend.severity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Threat Types</CardTitle>
            <CardDescription>Most common threats detected</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics?.topThreats.map((threat, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <span className="text-sm font-medium">{threat.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{threat.count}</span>
                    <Badge
                      variant={
                        threat.severity === "critical"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {threat.severity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Status */}
      <Card>
        <CardHeader>
          <CardTitle>Security Compliance Status</CardTitle>
          <CardDescription>
            Compliance with security frameworks and standards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">ISO 27001</span>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-600">92%</div>
              <div className="text-xs text-muted-foreground">Compliant</div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">SOC 2 Type II</span>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-600">88%</div>
              <div className="text-xs text-muted-foreground">Compliant</div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">NIST CSF</span>
                <XCircle className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-yellow-600">76%</div>
              <div className="text-xs text-muted-foreground">Partial</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SecurityMetrics;
