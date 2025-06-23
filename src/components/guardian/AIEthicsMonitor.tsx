import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Alert, AlertDescription } from "../ui/alert";
import {
  Brain,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Eye,
  Zap,
  Shield,
  RefreshCw,
} from "lucide-react";
import { AIEthicsAlert } from "../../types/guardian";
import { mockAIEthicsAlerts } from "../../data/guardianData";

export function AIEthicsMonitor() {
  const [alerts, setAlerts] = useState<AIEthicsAlert[]>(mockAIEthicsAlerts);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleAcknowledge = (alertId: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === alertId
          ? { ...alert, status: "acknowledged" as const }
          : alert,
      ),
    );
  };

  const handleResolve = (alertId: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === alertId
          ? { ...alert, status: "resolved" as const }
          : alert,
      ),
    );
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-400";
    if (score >= 60) return "text-yellow-400";
    if (score >= 40) return "text-orange-400";
    return "text-green-400";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "destructive";
      case "acknowledged":
        return "secondary";
      case "resolved":
        return "default";
      default:
        return "default";
    }
  };

  const pendingAlerts = alerts.filter((alert) => alert.status === "pending");
  const highRiskAlerts = alerts.filter((alert) => alert.riskScore >= 70);
  const avgRiskScore = Math.round(
    alerts.reduce((sum, alert) => sum + alert.riskScore, 0) / alerts.length,
  );

  // Mock AI system metrics
  const aiSystems = [
    {
      name: "Flourish Distribution Algorithm",
      ethicsScore: 72,
      status: "monitoring",
      lastCheck: new Date(Date.now() - 15 * 60 * 1000),
      issues: ["Bias toward tech projects", "Limited indigenous data"],
    },
    {
      name: "Ritual Technologist Matching",
      ethicsScore: 85,
      status: "optimal",
      lastCheck: new Date(Date.now() - 5 * 60 * 1000),
      issues: [],
    },
    {
      name: "Meta-Co-Pilot AI",
      ethicsScore: 91,
      status: "optimal",
      lastCheck: new Date(Date.now() - 2 * 60 * 1000),
      issues: [],
    },
    {
      name: "Subscription Trigger Guard",
      ethicsScore: 78,
      status: "attention",
      lastCheck: new Date(Date.now() - 30 * 60 * 1000),
      issues: ["Aggressive pricing recommendations"],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            🧠 AI Ethics Enforcement
            <Brain className="h-8 w-8 text-purple-400" />
          </h2>
          <p className="text-cyan-200 mt-2">
            Ensures AI & revenue logic follow moral code
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          variant="outline"
          className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/20"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Critical Alerts */}
      {highRiskAlerts.length > 0 && (
        <Alert className="bg-red-500/20 border-red-500/50">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-200">
            <strong>
              {highRiskAlerts.length} High-Risk Alert
              {highRiskAlerts.length !== 1 ? "s" : ""}
            </strong>{" "}
            detected in AI systems. Immediate review recommended.
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Average Ethics Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{avgRiskScore}</div>
            <p className="text-xs text-cyan-300 mt-1">Across all AI systems</p>
            <div className="mt-3">
              <Progress value={avgRiskScore} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Pending Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {pendingAlerts.length}
            </div>
            <p className="text-xs text-cyan-300 mt-1">Requiring attention</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              High Risk Systems
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {aiSystems.filter((s) => s.ethicsScore < 80).length}
            </div>
            <p className="text-xs text-cyan-300 mt-1">Ethics score &lt; 80</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {aiSystems.filter((s) => s.status === "optimal").length}/
              {aiSystems.length}
            </div>
            <p className="text-xs text-cyan-300 mt-1">Optimal performance</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Systems Overview */}
      <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Eye className="h-5 w-5 text-blue-400" />
            AI Systems Monitoring
          </CardTitle>
          <CardDescription className="text-cyan-200">
            Real-time ethics scores and system health
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiSystems.map((system, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-cyan-500/20 rounded-lg bg-white/5"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-white font-medium">{system.name}</h4>
                    <Badge
                      variant={
                        system.status === "optimal" ? "default" : "secondary"
                      }
                    >
                      {system.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-cyan-300 text-sm">Ethics Score</div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-lg font-mono ${getRiskColor(100 - system.ethicsScore)}`}
                        >
                          {system.ethicsScore}%
                        </span>
                        <Progress
                          value={system.ethicsScore}
                          className="h-2 flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="text-cyan-300 text-sm">Last Check</div>
                      <div className="text-white text-sm">
                        {Math.round(
                          (Date.now() - system.lastCheck.getTime()) / 1000 / 60,
                        )}{" "}
                        min ago
                      </div>
                    </div>

                    <div>
                      <div className="text-cyan-300 text-sm">Issues</div>
                      <div className="text-white text-sm">
                        {system.issues.length > 0
                          ? `${system.issues.length} detected`
                          : "None"}
                      </div>
                    </div>
                  </div>

                  {system.issues.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {system.issues.map((issue, issueIndex) => (
                        <div
                          key={issueIndex}
                          className="flex items-center gap-2 text-xs"
                        >
                          <AlertTriangle className="h-3 w-3 text-yellow-400" />
                          <span className="text-yellow-300">{issue}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/20"
                  >
                    Monitor
                  </Button>
                  {system.ethicsScore < 80 && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-yellow-500 text-yellow-300 hover:bg-yellow-500/20"
                    >
                      Calibrate
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active AI Ethics Alerts */}
      <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            Active Ethics Alerts
          </CardTitle>
          <CardDescription className="text-cyan-200">
            AI behavior requiring ethical review
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start justify-between p-4 border border-cyan-500/20 rounded-lg bg-white/5"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant={getStatusColor(alert.status)}>
                      {alert.status.toUpperCase()}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-purple-500 text-purple-300"
                    >
                      {alert.type.replace("_", " ").toUpperCase()}
                    </Badge>
                    <div
                      className={`text-sm font-mono ${getRiskColor(alert.riskScore)}`}
                    >
                      Risk: {alert.riskScore}/100
                    </div>
                    <span className="text-cyan-300 text-sm">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-cyan-300 text-sm">AI System:</span>
                      <span className="text-white ml-2">{alert.aiSystem}</span>
                    </div>
                    <div>
                      <span className="text-cyan-300 text-sm">
                        Description:
                      </span>
                      <p className="text-cyan-200 mt-1">{alert.description}</p>
                    </div>
                    {alert.recommendedAction && (
                      <div>
                        <span className="text-cyan-300 text-sm">
                          Recommended Action:
                        </span>
                        <p className="text-green-300 mt-1">
                          {alert.recommendedAction}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-3">
                    <div className="text-cyan-300 text-sm mb-1">Risk Level</div>
                    <Progress value={alert.riskScore} className="h-2" />
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  {alert.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAcknowledge(alert.id)}
                        className="border-yellow-500 text-yellow-300 hover:bg-yellow-500/20"
                      >
                        Acknowledge
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleResolve(alert.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Resolve
                      </Button>
                    </>
                  )}
                  {alert.status === "acknowledged" && (
                    <Button
                      size="sm"
                      onClick={() => handleResolve(alert.id)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Resolve
                    </Button>
                  )}
                  {alert.status === "resolved" && (
                    <div className="flex items-center gap-1 text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Resolved</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {alerts.length === 0 && (
              <div className="text-center py-8 text-cyan-300">
                <Brain className="h-12 w-12 mx-auto mb-3 text-green-400" />
                <p className="text-lg font-medium">
                  All AI systems operating ethically
                </p>
                <p className="text-sm">No ethics violations detected</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Ethics Configuration */}
      <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-orange-400" />
            Ethics Configuration
          </CardTitle>
          <CardDescription className="text-cyan-200">
            AI ethical guidelines and thresholds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-white font-medium">Ethics Thresholds</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-cyan-200">Minimum Ethics Score</span>
                  <span className="text-white font-mono">70%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cyan-200">
                    Bias Detection Sensitivity
                  </span>
                  <span className="text-white font-mono">High</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cyan-200">Auto-Pause Threshold</span>
                  <span className="text-white font-mono">Risk &gt; 80</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cyan-200">Review Frequency</span>
                  <span className="text-white font-mono">Every 5 minutes</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-medium">Ethics Principles</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span className="text-cyan-200">
                    No bias against any bioregion
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span className="text-cyan-200">
                    Indigenous knowledge prioritization
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span className="text-cyan-200">
                    Prevent user burnout detection
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span className="text-cyan-200">
                    Transparent decision making
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span className="text-cyan-200">
                    SDG alignment optimization
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RevOps Integration */}
      <Card className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-400" />
            RevOps Integration Binding
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-purple-300 font-medium">Connected Systems</h4>
              <div className="space-y-1 text-cyan-200 text-sm">
                <div>• AI Co-Pilot Ethics Layer</div>
                <div>• Subscription Trigger Guard</div>
                <div>• LangChain / Autogen Monitoring</div>
                <div>• Flourish Flow Analytics</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-purple-300 font-medium">Automated Actions</h4>
              <div className="space-y-1 text-cyan-200 text-sm">
                <div>• Bias detection and correction</div>
                <div>• Burnout prevention triggers</div>
                <div>• Ethical debt monitoring</div>
                <div>• AI system pause controls</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
