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
import { Switch } from "../ui/switch";
import { Alert, AlertDescription } from "../ui/alert";
import {
  Shield,
  AlertTriangle,
  Pause,
  Play,
  RotateCcw,
  Zap,
  Settings,
  Clock,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { RitualFailsafe } from "../../types/guardian";
import { mockFailsafes } from "../../data/guardianData";

export function RitualFailsafes() {
  const [failsafes, setFailsafes] = useState<RitualFailsafe[]>(mockFailsafes);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [ceremonyInProgress, setCeremonyInProgress] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleToggleFailsafe = (failsafeId: string) => {
    setFailsafes(
      failsafes.map((failsafe) =>
        failsafe.id === failsafeId
          ? { ...failsafe, isActive: !failsafe.isActive }
          : failsafe,
      ),
    );
  };

  const handleTriggerFailsafe = (failsafeId: string) => {
    setFailsafes(
      failsafes.map((failsafe) =>
        failsafe.id === failsafeId
          ? { ...failsafe, lastTriggered: new Date() }
          : failsafe,
      ),
    );
  };

  const handleCeremonialOverride = () => {
    setCeremonyInProgress(true);
    // Simulate ceremonial override process
    setTimeout(() => {
      setCeremonyInProgress(false);
    }, 5000);
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "pause":
        return Pause;
      case "redirect":
        return RotateCcw;
      case "override":
        return Zap;
      case "ceremonial_review":
        return Settings;
      default:
        return Shield;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "pause":
        return "text-red-400";
      case "redirect":
        return "text-yellow-400";
      case "override":
        return "text-orange-400";
      case "ceremonial_review":
        return "text-purple-400";
      default:
        return "text-cyan-400";
    }
  };

  const activeFailsafes = failsafes.filter((f) => f.isActive);
  const recentlyTriggered = failsafes.filter(
    (f) =>
      f.lastTriggered &&
      Date.now() - f.lastTriggered.getTime() < 24 * 60 * 60 * 1000, // Last 24 hours
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            🛡️ Ritualized Failsafes
            <Shield className="h-8 w-8 text-cyan-400" />
          </h2>
          <p className="text-cyan-200 mt-2">
            Pauses systems ritually when misalignment is detected
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleCeremonialOverride}
            disabled={ceremonyInProgress}
            variant="outline"
            className="border-purple-500 text-purple-300 hover:bg-purple-500/20"
          >
            {ceremonyInProgress ? (
              <>
                <Settings className="h-4 w-4 mr-2 animate-spin" />
                Ceremony in Progress...
              </>
            ) : (
              <>
                <Settings className="h-4 w-4 mr-2" />
                Ceremonial Override
              </>
            )}
          </Button>
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
      </div>

      {/* Ceremony Progress */}
      {ceremonyInProgress && (
        <Alert className="bg-purple-500/20 border-purple-500/50">
          <Settings className="h-4 w-4 text-purple-400 animate-spin" />
          <AlertDescription className="text-purple-200">
            <strong>Sacred Override Ceremony in Progress</strong> All
            stakeholders are being consulted for consensual system
            modifications.
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Active Failsafes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {activeFailsafes.length}
            </div>
            <p className="text-xs text-cyan-300 mt-1">Monitoring systems</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Recent Triggers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {recentlyTriggered.length}
            </div>
            <p className="text-xs text-cyan-300 mt-1">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">98%</div>
            <p className="text-xs text-cyan-300 mt-1">Operational status</p>
            <div className="flex items-center gap-1 mt-1">
              <CheckCircle className="h-3 w-3 text-green-400" />
              <span className="text-green-400 text-xs">All systems stable</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Override Authority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">🗳️</div>
            <p className="text-xs text-cyan-300 mt-1">Stakeholder consensus</p>
            <div className="flex items-center gap-1 mt-1">
              <Settings className="h-3 w-3 text-purple-400" />
              <span className="text-purple-400 text-xs">Sacred ceremony</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Failsafe Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {failsafes.map((failsafe) => {
          const ActionIcon = getActionIcon(failsafe.action);
          const actionColor = getActionColor(failsafe.action);

          return (
            <Card
              key={failsafe.id}
              className="bg-white/10 backdrop-blur-lg border-cyan-500/30"
            >
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ActionIcon className={`h-5 w-5 ${actionColor}`} />
                    {failsafe.name}
                  </div>
                  <Switch
                    checked={failsafe.isActive}
                    onCheckedChange={() => handleToggleFailsafe(failsafe.id)}
                  />
                </CardTitle>
                <div className="flex gap-2">
                  <Badge variant={failsafe.isActive ? "default" : "secondary"}>
                    {failsafe.isActive ? "ACTIVE" : "INACTIVE"}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-purple-500 text-purple-300"
                  >
                    {failsafe.action.replace("_", " ").toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Trigger Condition */}
                <div>
                  <div className="text-cyan-300 text-sm mb-1">
                    Trigger Condition
                  </div>
                  <p className="text-cyan-200 text-sm">
                    {failsafe.triggerCondition}
                  </p>
                </div>

                {/* Affected Systems */}
                <div>
                  <div className="text-cyan-300 text-sm mb-2">
                    Affected Systems
                  </div>
                  <div className="space-y-1">
                    {failsafe.affectedSystems.map((system, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span className="text-white">{system}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Last Triggered */}
                {failsafe.lastTriggered && (
                  <div>
                    <div className="text-cyan-300 text-sm mb-1">
                      Last Triggered
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-3 w-3 text-yellow-400" />
                      <span className="text-white">
                        {new Date(failsafe.lastTriggered).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleTriggerFailsafe(failsafe.id)}
                    disabled={!failsafe.isActive}
                    className="flex-1 border-yellow-500 text-yellow-300 hover:bg-yellow-500/20"
                  >
                    Test Trigger
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-cyan-500 text-cyan-300 hover:bg-cyan-500/20"
                  >
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* System Status Overview */}
      <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-400" />
            Sacred Covenant System Status
          </CardTitle>
          <CardDescription className="text-cyan-200">
            Real-time monitoring of critical system thresholds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Wealth Concentration Monitor */}
            <div className="space-y-3">
              <h4 className="text-white font-medium">Wealth Concentration</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-cyan-200 text-sm">
                    Single Entity Max
                  </span>
                  <span className="text-white font-mono">15% / 20%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span className="text-green-400 text-xs">
                    Within safe limits
                  </span>
                </div>
              </div>
            </div>

            {/* AI Ethics Monitor */}
            <div className="space-y-3">
              <h4 className="text-white font-medium">AI Ethics Score</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-cyan-200 text-sm">Current Score</span>
                  <span className="text-white font-mono">87% / 70%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "87%" }}
                  ></div>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span className="text-green-400 text-xs">
                    Ethical operations
                  </span>
                </div>
              </div>
            </div>

            {/* Regional Extraction */}
            <div className="space-y-3">
              <h4 className="text-white font-medium">Regional Balance</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-cyan-200 text-sm">
                    Extraction Ratio
                  </span>
                  <span className="text-white font-mono">0.8x / 1.0x</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "80%" }}
                  ></div>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span className="text-green-400 text-xs">
                    Sustainable flow
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ceremonial Override Process */}
      <Card className="bg-white/10 backdrop-blur-lg border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="h-5 w-5 text-purple-400" />
            Sacred Override Ceremony
          </CardTitle>
          <CardDescription className="text-cyan-200">
            Consensual system modifications through stakeholder ritual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-purple-300 font-medium">Ceremony Process</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">1</span>
                  </div>
                  <span className="text-cyan-200 text-sm">
                    Stakeholder notification
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">2</span>
                  </div>
                  <span className="text-cyan-200 text-sm">
                    Sacred circle convening
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">3</span>
                  </div>
                  <span className="text-cyan-200 text-sm">
                    Consensus building
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">4</span>
                  </div>
                  <span className="text-cyan-200 text-sm">
                    Ritual implementation
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-purple-300 font-medium">
                Override Capabilities
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Pause className="h-3 w-3 text-red-400" />
                  <span className="text-cyan-200">
                    Transaction freeze protocols
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-3 w-3 text-yellow-400" />
                  <span className="text-cyan-200">
                    Payment redirection systems
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-orange-400" />
                  <span className="text-cyan-200">
                    Smart contract overrides
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="h-3 w-3 text-purple-400" />
                  <span className="text-cyan-200">
                    Covenant contract rewrites
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RevOps Integration */}
      <Card className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-cyan-400" />
            RevOps Integration Binding
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-cyan-300 font-medium">Connected Systems</h4>
              <div className="space-y-1 text-cyan-200 text-sm">
                <div>• Smart Kill-Switch Contracts</div>
                <div>• Sacred Covenant Contracts</div>
                <div>• Chainlink Keeper Networks</div>
                <div>• Ceremonial Override UI</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-cyan-300 font-medium">Automated Triggers</h4>
              <div className="space-y-1 text-cyan-200 text-sm">
                <div>• Wealth concentration breaches</div>
                <div>• AI ethics score violations</div>
                <div>• Regional extraction imbalances</div>
                <div>• Stakeholder consensus requirements</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
