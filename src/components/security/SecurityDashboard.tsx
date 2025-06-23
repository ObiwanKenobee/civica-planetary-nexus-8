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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Progress } from "../ui/progress";
import {
  Shield,
  AlertTriangle,
  Activity,
  TrendingUp,
  Eye,
  Clock,
  Users,
  Globe,
  Server,
  Lock,
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
}

interface ThreatDetection {
  id: string;
  threatType: string;
  confidence: number;
  riskScore: number;
  status: "active" | "investigating" | "contained" | "resolved";
  detectionTime: Date;
  affectedAssets: string[];
  mitigationActions: string[];
}

interface SecurityEvent {
  id: string;
  timestamp: Date;
  source: string;
  eventType: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  description: string;
  ipAddress: string;
  userId?: string;
}

interface SecurityAlert {
  id: string;
  message: string;
  severity: "critical" | "warning" | "info";
  timestamp: Date;
  acknowledged: boolean;
}

export function SecurityDashboard() {
  const [metrics, setMetrics] = useState<SecurityMetrics | null>(null);
  const [threats, setThreats] = useState<ThreatDetection[]>([]);
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    loadSecurityData();
    const interval = setInterval(loadSecurityData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadSecurityData = async () => {
    try {
      setLoading(true);

      // Load metrics
      const metricsResponse = await fetch("/api/security/xdr?action=metrics");
      const metricsData = await metricsResponse.json();
      setMetrics(metricsData.metrics);

      // Load threats
      const threatsResponse = await fetch(
        "/api/security/xdr?action=threats&status=active",
      );
      const threatsData = await threatsResponse.json();
      setThreats(threatsData.threats);

      // Load recent events
      const eventsResponse = await fetch(
        "/api/security/xdr?action=events&limit=20&timeRange=24",
      );
      const eventsData = await eventsResponse.json();
      setEvents(eventsData.events);

      // Generate security alerts
      generateSecurityAlerts(metricsData.metrics, threatsData.threats);

      setLastUpdate(new Date());
    } catch (error) {
      console.error("Failed to load security data:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateSecurityAlerts = (
    metrics: SecurityMetrics,
    threats: ThreatDetection[],
  ) => {
    const newAlerts: SecurityAlert[] = [];

    if (metrics.activeThreats > 5) {
      newAlerts.push({
        id: "alert_high_threats",
        message: `High number of active threats detected: ${metrics.activeThreats}`,
        severity: "critical",
        timestamp: new Date(),
        acknowledged: false,
      });
    }

    if (metrics.securityScore < 70) {
      newAlerts.push({
        id: "alert_low_score",
        message: `Security score has dropped to ${metrics.securityScore}%`,
        severity: "warning",
        timestamp: new Date(),
        acknowledged: false,
      });
    }

    const criticalThreats = threats.filter((t) => t.riskScore >= 80);
    if (criticalThreats.length > 0) {
      newAlerts.push({
        id: "alert_critical_threats",
        message: `${criticalThreats.length} critical threats require immediate attention`,
        severity: "critical",
        timestamp: new Date(),
        acknowledged: false,
      });
    }

    setAlerts(newAlerts);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-600 bg-red-50 border-red-200";
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "destructive";
      case "investigating":
        return "secondary";
      case "contained":
        return "outline";
      case "resolved":
        return "default";
      default:
        return "secondary";
    }
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert,
      ),
    );
  };

  const handleThreatAction = async (threatId: string, action: string) => {
    try {
      const response = await fetch("/api/security/xdr?action=response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          threatId,
          responseAction: action,
          parameters: {},
        }),
      });

      if (response.ok) {
        // Reload threats to show updated status
        loadSecurityData();
      }
    } catch (error) {
      console.error("Failed to execute threat action:", error);
    }
  };

  if (loading && !metrics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading security dashboard...</span>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cisco XDR Security Dashboard</h1>
          <p className="text-muted-foreground">
            Extended Detection and Response - Real-time Security Monitoring
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </Badge>
          <Button
            onClick={loadSecurityData}
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

      {/* Security Alerts */}
      {alerts.filter((a) => !a.acknowledged).length > 0 && (
        <div className="space-y-2">
          {alerts
            .filter((a) => !a.acknowledged)
            .map((alert) => (
              <Alert
                key={alert.id}
                className={
                  alert.severity === "critical"
                    ? "border-red-500 bg-red-50"
                    : "border-yellow-500 bg-yellow-50"
                }
              >
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="flex items-center justify-between">
                  Security Alert
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => acknowledgeAlert(alert.id)}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Acknowledge
                  </Button>
                </AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            ))}
        </div>
      )}

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Security Score
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics?.securityScore || 0}%
            </div>
            <Progress value={metrics?.securityScore || 0} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Overall security posture
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Threats
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {metrics?.activeThreats || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Requiring immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events (24h)</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics?.totalEvents || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Security events detected
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MTTD/MTTR</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {metrics?.meanTimeToDetection.toFixed(1) || 0}m /{" "}
              {metrics?.meanTimeToResponse.toFixed(1) || 0}m
            </div>
            <p className="text-xs text-muted-foreground">
              Detection / Response time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="threats" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="threats">Threat Detection</TabsTrigger>
          <TabsTrigger value="events">Security Events</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="response">Incident Response</TabsTrigger>
        </TabsList>

        {/* Threat Detection Tab */}
        <TabsContent value="threats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Threat Detections</CardTitle>
              <CardDescription>
                Real-time threat detections from XDR analytics engine
              </CardDescription>
            </CardHeader>
            <CardContent>
              {threats.length === 0 ? (
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-lg font-medium text-green-600">
                    No Active Threats
                  </p>
                  <p className="text-muted-foreground">
                    Your environment is currently secure
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {threats.map((threat) => (
                    <div key={threat.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant={getStatusColor(threat.status)}>
                            {threat.status}
                          </Badge>
                          <span className="font-medium">
                            {threat.threatType}
                          </span>
                          <Badge variant="outline">
                            Risk: {threat.riskScore}%
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleThreatAction(threat.id, "isolate")
                            }
                          >
                            Isolate
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleThreatAction(threat.id, "block")
                            }
                          >
                            Block
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Detected: {threat.detectionTime.toLocaleString()}</p>
                        <p>
                          Affected Assets: {threat.affectedAssets.join(", ")}
                        </p>
                        <p>Confidence: {threat.confidence}%</p>
                      </div>
                      {threat.mitigationActions.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">
                            Mitigation Actions:
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {threat.mitigationActions.map((action, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="text-xs"
                              >
                                {action}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Events Tab */}
        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Security Events</CardTitle>
              <CardDescription>
                Latest security events from monitored systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className={`border rounded-lg p-3 ${getSeverityColor(event.severity)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{event.severity}</Badge>
                        <span className="font-medium">{event.eventType}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {event.timestamp.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{event.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-2">
                      <span>Source: {event.source}</span>
                      <span>IP: {event.ipAddress}</span>
                      {event.userId && <span>User: {event.userId}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Threat Trends</CardTitle>
                <CardDescription>7-day threat detection trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {metrics?.threatTrends.map((trend, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{trend.period}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">
                          {trend.count}
                        </span>
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
                <CardTitle>Security Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mean Time to Detection</span>
                    <span className="font-medium">
                      {metrics?.meanTimeToDetection.toFixed(1)}m
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mean Time to Response</span>
                    <span className="font-medium">
                      {metrics?.meanTimeToResponse.toFixed(1)}m
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Resolved Threats</span>
                    <span className="font-medium text-green-600">
                      {metrics?.resolvedThreats}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Security Score</span>
                    <div className="flex items-center space-x-2">
                      <Progress
                        value={metrics?.securityScore}
                        className="w-16"
                      />
                      <span className="font-medium">
                        {metrics?.securityScore}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Incident Response Tab */}
        <TabsContent value="response" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Incident Response Console</CardTitle>
              <CardDescription>
                Automated and manual incident response capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="h-20 flex flex-col items-center justify-center">
                  <Lock className="h-6 w-6 mb-2" />
                  Isolate Asset
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <XCircle className="h-6 w-6 mb-2" />
                  Block IP
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <Eye className="h-6 w-6 mb-2" />
                  Monitor User
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <Server className="h-6 w-6 mb-2" />
                  Quarantine File
                </Button>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-3">Response Playbooks</h4>
                <div className="space-y-2">
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        Malware Detection Response
                      </span>
                      <Badge variant="secondary">Auto</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Isolate → Scan → Quarantine → Report
                    </p>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        Brute Force Attack Response
                      </span>
                      <Badge variant="secondary">Auto</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Block IP → Account Lockout → Alert Admin
                    </p>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        Data Exfiltration Response
                      </span>
                      <Badge variant="outline">Manual</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Alert → Investigate → Contain → Report
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SecurityDashboard;
