import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { SecurityDashboard } from "@/components/security/SecurityDashboard";
import PaymentGatedAccess from "@/components/PaymentGatedAccess";
import EnhancedNavigationBar from "@/components/navigation/EnhancedNavigationBar";
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
  Zap,
  Brain,
  Network,
} from "lucide-react";

interface SystemHealth {
  status: "operational" | "degraded" | "critical";
  uptime: number;
  version: string;
  components: {
    threatDetection: "operational" | "degraded" | "down";
    eventIngestion: "operational" | "degraded" | "down";
    responseOrchestration: "operational" | "degraded" | "down";
    analytics: "operational" | "degraded" | "down";
  };
  metrics: {
    eventsProcessed: number;
    threatsDetected: number;
    systemLoad: number;
    memoryUsage: number;
  };
}

function SecurityContent() {
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSystemHealth();
    const interval = setInterval(loadSystemHealth, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const loadSystemHealth = async () => {
    try {
      const response = await fetch("/api/security/xdr?action=status");
      const data = await response.json();
      setSystemHealth(data);
    } catch (error) {
      console.error("Failed to load system health:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-600 bg-green-50 border-green-200";
      case "degraded":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "down":
      case "critical":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Enhanced Navigation */}
      <div className="relative z-50">
        <EnhancedNavigationBar variant="floating" showLabels={true} />
      </div>

      <div className="container mx-auto px-4 py-8 pt-24 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CIVICA Security Operations Center
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cisco XDR-Powered Extended Detection and Response Platform
          </p>
          <p className="text-muted-foreground max-w-4xl mx-auto">
            Advanced threat detection, real-time analytics, and automated
            incident response protecting the sacred infrastructure of our
            decentralized civilization.
          </p>
        </div>

        {/* System Health Overview */}
        {systemHealth && (
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>System Health Status</span>
                  </CardTitle>
                  <CardDescription>
                    XDR Platform v{systemHealth.version} - Uptime:{" "}
                    {formatUptime(systemHealth.uptime)}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(systemHealth.status)}>
                  {systemHealth.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Component Status */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Components</h4>
                  {Object.entries(systemHealth.components).map(
                    ([component, status]) => (
                      <div
                        key={component}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="capitalize">
                          {component.replace(/([A-Z])/g, " $1")}
                        </span>
                        <Badge
                          variant="outline"
                          className={getStatusColor(status)}
                        >
                          {status}
                        </Badge>
                      </div>
                    ),
                  )}
                </div>

                {/* System Metrics */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Performance</h4>
                  <div className="text-sm space-y-1">
                    <div>
                      System Load: {systemHealth.metrics.systemLoad.toFixed(1)}%
                    </div>
                    <div>
                      Memory Usage:{" "}
                      {systemHealth.metrics.memoryUsage.toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Processing Stats */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Processing</h4>
                  <div className="text-sm space-y-1">
                    <div>
                      Events Processed:{" "}
                      {systemHealth.metrics.eventsProcessed.toLocaleString()}
                    </div>
                    <div>
                      Threats Detected:{" "}
                      {systemHealth.metrics.threatsDetected.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Actions</h4>
                  <div className="space-y-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={loadSystemHealth}
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Refresh
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cisco XDR Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-blue-600" />
                <span>AI-Powered Detection</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Machine Learning Threat Analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Behavioral Anomaly Detection</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Advanced Pattern Recognition</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Predictive Threat Intelligence</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-green-600" />
                <span>Automated Response</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Real-time Threat Isolation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Automated IP Blocking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Smart Quarantine Actions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Orchestrated Incident Response</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Network className="h-5 w-5 text-purple-600" />
                <span>Extended Visibility</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Cross-Platform Telemetry</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Endpoint-to-Cloud Monitoring</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Network Traffic Analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>User Behavior Analytics</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Security Architecture */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>XDR Security Architecture</span>
            </CardTitle>
            <CardDescription>
              Multi-layered defense strategy with extended detection and
              response capabilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Server className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h4 className="font-medium">Data Collection</h4>
                <p className="text-sm text-muted-foreground">
                  Telemetry-centric ingestion from all security tools
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Brain className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h4 className="font-medium">AI Analytics</h4>
                <p className="text-sm text-muted-foreground">
                  Machine learning and behavioral analysis
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Eye className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h4 className="font-medium">Threat Detection</h4>
                <p className="text-sm text-muted-foreground">
                  Advanced correlation and threat hunting
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Zap className="h-8 w-8 mx-auto mb-2 text-red-600" />
                <h4 className="font-medium">Automated Response</h4>
                <p className="text-sm text-muted-foreground">
                  Orchestrated incident response in minutes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Security Dashboard */}
        <SecurityDashboard />

        {/* Security Principles */}
        <Card>
          <CardHeader>
            <CardTitle>CIVICA Security Principles</CardTitle>
            <CardDescription>
              Our commitment to protecting the sacred infrastructure of
              decentralized civilization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Zero Trust Architecture</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Never trust, always verify approach</li>
                  <li>• Continuous authentication and authorization</li>
                  <li>• Micro-segmentation and least privilege access</li>
                  <li>• Real-time risk assessment and adaptation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Sacred Data Protection</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• End-to-end encryption for all communications</li>
                  <li>• Quantum-resistant cryptographic protocols</li>
                  <li>• Decentralized identity management</li>
                  <li>• Privacy-preserving analytics</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function Security() {
  return (
    <PaymentGatedAccess
      requiredPlan="intelligence_architect"
      requiredPayment={true}
      featureName="Cisco XDR Security Center"
      featureDescription="Advanced Extended Detection and Response platform with AI-powered threat detection, real-time analytics, and automated incident response. Protect your sacred infrastructure with enterprise-grade security."
      featureIcon={Brain}
      allowPreview={true}
      previewDuration={60}
    >
      <SecurityContent />
    </PaymentGatedAccess>
  );
}

export default Security;
