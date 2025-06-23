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
import { Alert, AlertDescription } from "../ui/alert";
import { Progress } from "../ui/progress";
import {
  AlertTriangle,
  TrendingUp,
  Users,
  PieChart,
  ChevronRight,
  RefreshCw,
  Shield,
} from "lucide-react";
import { BalanceAlert } from "../../types/guardian";
import { mockBalanceAlerts } from "../../data/guardianData";

export function BalanceModule() {
  const [alerts, setAlerts] = useState<BalanceAlert[]>(mockBalanceAlerts);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === alertId
          ? { ...alert, status: "resolved" as const }
          : alert,
      ),
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive";
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  const activeAlerts = alerts.filter((alert) => alert.status === "active");
  const criticalAlerts = alerts.filter(
    (alert) => alert.severity === "critical" && alert.status === "active",
  );

  // Mock wealth distribution data
  const wealthDistribution = {
    top1Percent: 25,
    top5Percent: 45,
    top10Percent: 62,
    giniCoefficient: 0.42,
  };

  const governanceConcentration = {
    totalVotingPower: 100000,
    largestHolder: 15,
    top10Holders: 58,
    activeVoters: 1247,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            ⚖️ Balance Control
            <Shield className="h-8 w-8 text-cyan-400" />
          </h2>
          <p className="text-cyan-200 mt-2">
            Prevents financial centralization or governance capture
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
      {criticalAlerts.length > 0 && (
        <Alert className="bg-red-500/20 border-red-500/50">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-200">
            <strong>
              {criticalAlerts.length} Critical Alert
              {criticalAlerts.length !== 1 ? "s" : ""}
            </strong>{" "}
            require immediate attention. Wealth concentration exceeding safe
            thresholds.
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Wealth Concentration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {wealthDistribution.top5Percent}%
            </div>
            <p className="text-xs text-cyan-300 mt-1">Top 5% control</p>
            <div className="mt-3">
              <Progress
                value={wealthDistribution.top5Percent}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Gini Coefficient
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {wealthDistribution.giniCoefficient}
            </div>
            <p className="text-xs text-cyan-300 mt-1">Inequality index</p>
            <div className="mt-3">
              <Progress
                value={wealthDistribution.giniCoefficient * 100}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Voting Concentration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {governanceConcentration.largestHolder}%
            </div>
            <p className="text-xs text-cyan-300 mt-1">Largest single holder</p>
            <div className="mt-3">
              <Progress
                value={governanceConcentration.largestHolder}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {activeAlerts.length}
            </div>
            <p className="text-xs text-cyan-300 mt-1">Requiring attention</p>
            <div className="flex gap-1 mt-3">
              {["critical", "high", "medium"].map((severity) => {
                const count = activeAlerts.filter(
                  (a) => a.severity === severity,
                ).length;
                return (
                  count > 0 && (
                    <Badge
                      key={severity}
                      variant={getSeverityColor(severity)}
                      className="text-xs"
                    >
                      {count} {severity}
                    </Badge>
                  )
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts List */}
      <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            Active Balance Alerts
          </CardTitle>
          <CardDescription className="text-cyan-200">
            Real-time monitoring of wealth and governance concentration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start justify-between p-4 border border-cyan-500/20 rounded-lg bg-white/5"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant={getSeverityColor(alert.severity)}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <span className="text-white font-medium">
                      {alert.type.replace("_", " ").toUpperCase()}
                    </span>
                    <span className="text-cyan-300 text-sm">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-cyan-200 mb-2">{alert.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-cyan-300">
                      Flourish Value:{" "}
                      <span className="font-mono">
                        {alert.flourishValue.toLocaleString()}
                      </span>
                    </span>
                    <span className="text-cyan-300">
                      Regions: {alert.affectedRegions.join(", ")}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/20"
                  >
                    Investigate
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleResolveAlert(alert.id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Resolve
                  </Button>
                </div>
              </div>
            ))}

            {activeAlerts.length === 0 && (
              <div className="text-center py-8 text-cyan-300">
                <Shield className="h-12 w-12 mx-auto mb-3 text-green-400" />
                <p className="text-lg font-medium">All systems balanced</p>
                <p className="text-sm">
                  No active concentration alerts detected
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Wealth Distribution Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PieChart className="h-5 w-5 text-purple-400" />
              Wealth Distribution
            </CardTitle>
            <CardDescription className="text-cyan-200">
              Platform value concentration by user percentiles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-cyan-200">Top 1%</span>
                <span className="text-white font-mono">
                  {wealthDistribution.top1Percent}%
                </span>
              </div>
              <Progress
                value={wealthDistribution.top1Percent}
                className="h-2"
              />

              <div className="flex justify-between items-center">
                <span className="text-cyan-200">Top 5%</span>
                <span className="text-white font-mono">
                  {wealthDistribution.top5Percent}%
                </span>
              </div>
              <Progress
                value={wealthDistribution.top5Percent}
                className="h-2"
              />

              <div className="flex justify-between items-center">
                <span className="text-cyan-200">Top 10%</span>
                <span className="text-white font-mono">
                  {wealthDistribution.top10Percent}%
                </span>
              </div>
              <Progress
                value={wealthDistribution.top10Percent}
                className="h-2"
              />
            </div>

            <div className="pt-4 border-t border-cyan-500/20">
              <div className="flex justify-between items-center text-sm">
                <span className="text-cyan-300">Recommended Max (Top 5%)</span>
                <span className="text-yellow-400 font-medium">40%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-green-400" />
              Governance Distribution
            </CardTitle>
            <CardDescription className="text-cyan-200">
              Voting power and participation metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-cyan-200">Largest Single Holder</span>
                <span className="text-white font-mono">
                  {governanceConcentration.largestHolder}%
                </span>
              </div>
              <Progress
                value={governanceConcentration.largestHolder}
                className="h-2"
              />

              <div className="flex justify-between items-center">
                <span className="text-cyan-200">Top 10 Holders</span>
                <span className="text-white font-mono">
                  {governanceConcentration.top10Holders}%
                </span>
              </div>
              <Progress
                value={governanceConcentration.top10Holders}
                className="h-2"
              />

              <div className="flex justify-between items-center">
                <span className="text-cyan-200">Active Voters</span>
                <span className="text-white font-mono">
                  {governanceConcentration.activeVoters.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-cyan-500/20">
              <div className="flex justify-between items-center text-sm">
                <span className="text-cyan-300">Max Single Holder Limit</span>
                <span className="text-red-400 font-medium">20%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RevOps Binding Information */}
      <Card className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-400" />
            RevOps Integration Binding
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-purple-300 font-medium">Connected Systems</h4>
              <div className="space-y-1 text-cyan-200 text-sm">
                <div>• RevOps Dashboard</div>
                <div>• Flourish Ledger Watcher</div>
                <div>• Wealth Redistribution Engine</div>
                <div>• Governance Voting System</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-purple-300 font-medium">Automated Actions</h4>
              <div className="space-y-1 text-cyan-200 text-sm">
                <div>• Automatic redistribution triggers</div>
                <div>• Voting power rebalancing</div>
                <div>• Ceremonial override initiation</div>
                <div>• Alert escalation protocols</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
