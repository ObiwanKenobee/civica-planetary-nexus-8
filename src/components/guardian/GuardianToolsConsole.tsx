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
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Settings,
  Wrench,
  Database,
  Shield,
  Zap,
  TrendingUp,
  Users,
  FileText,
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export function GuardianToolsConsole() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [flourishScore, setFlourishScore] = useState(87);
  const [sdgAlignment, setSDGAlignment] = useState(92);
  const [blessingDistribution, setBlessingDistribution] = useState(78);
  const [systemHealth, setSystemHealth] = useState(96);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleExportData = () => {
    // Mock export functionality
    const exportData = {
      timestamp: new Date().toISOString(),
      flourishScore,
      sdgAlignment,
      blessingDistribution,
      systemHealth,
      guardianMetrics: "comprehensive-audit-data",
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `guardian-console-export-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            🛠️ Guardian Tools Console
            <Wrench className="h-8 w-8 text-orange-400" />
          </h2>
          <p className="text-cyan-200 mt-2">
            Light-weight UI for sacred admin + revenue clarity
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleExportData}
            variant="outline"
            className="border-purple-500 text-purple-300 hover:bg-purple-500/20"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
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

      {/* Quick Actions Panel */}
      <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            Quick Actions
          </CardTitle>
          <CardDescription className="text-cyan-200">
            Immediate Guardian oversight capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-auto p-4 bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30 hover:from-green-500/30 hover:to-green-600/30">
              <div className="text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-400" />
                <div className="font-medium text-white">Flourish Boost</div>
                <div className="text-xs text-green-200">
                  Emergency distribution
                </div>
              </div>
            </Button>

            <Button className="h-auto p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30 hover:from-blue-500/30 hover:to-blue-600/30">
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                <div className="font-medium text-white">Ethics Calibration</div>
                <div className="text-xs text-blue-200">
                  AI system adjustment
                </div>
              </div>
            </Button>

            <Button className="h-auto p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30 hover:from-purple-500/30 hover:to-purple-600/30">
              <div className="text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-purple-400" />
                <div className="font-medium text-white">Ceremony Trigger</div>
                <div className="text-xs text-purple-200">
                  Stakeholder gathering
                </div>
              </div>
            </Button>

            <Button className="h-auto p-4 bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-500/30 hover:from-orange-500/30 hover:to-orange-600/30">
              <div className="text-center">
                <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-orange-400" />
                <div className="font-medium text-white">Emergency Pause</div>
                <div className="text-xs text-orange-200">System-wide halt</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Flourish Scoring Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              Flourish Scoring System
            </CardTitle>
            <CardDescription className="text-cyan-200">
              Adjust and monitor sacred token distribution algorithms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Flourish Score Adjustment */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-cyan-200 text-sm">
                  Global Flourish Score
                </label>
                <span className="text-white font-mono">{flourishScore}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={flourishScore}
                onChange={(e) => setFlourishScore(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-cyan-300">
                <span>Conservative</span>
                <span>Balanced</span>
                <span>Abundant</span>
              </div>
            </div>

            {/* SDG Alignment */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-cyan-200 text-sm">
                  SDG Alignment Weight
                </label>
                <span className="text-white font-mono">{sdgAlignment}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sdgAlignment}
                onChange={(e) => setSDGAlignment(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Blessing Distribution */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-cyan-200 text-sm">
                  Blessing Distribution Rate
                </label>
                <span className="text-white font-mono">
                  {blessingDistribution}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={blessingDistribution}
                onChange={(e) =>
                  setBlessingDistribution(Number(e.target.value))
                }
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Apply Changes
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/20"
              >
                Reset to Default
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-400" />
              System Configuration
            </CardTitle>
            <CardDescription className="text-cyan-200">
              Guardian layer operational parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Toggle Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-cyan-200 text-sm">Auto-Rebalancing</div>
                  <div className="text-cyan-300 text-xs">
                    Automatic wealth redistribution
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-cyan-200 text-sm">Ceremonial Alerts</div>
                  <div className="text-cyan-300 text-xs">
                    Sacred override notifications
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-cyan-200 text-sm">
                    AI Ethics Monitoring
                  </div>
                  <div className="text-cyan-300 text-xs">
                    Real-time bias detection
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-cyan-200 text-sm">
                    Regional Oversight
                  </div>
                  <div className="text-cyan-300 text-xs">
                    Bioregional balance monitoring
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            {/* System Health */}
            <div className="space-y-3 pt-4 border-t border-cyan-500/20">
              <div className="flex justify-between items-center">
                <span className="text-cyan-200 text-sm">System Health</span>
                <span className="text-white font-mono">{systemHealth}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${systemHealth}%` }}
                ></div>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-400" />
                <span className="text-green-400 text-xs">
                  All systems operational
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Management */}
      <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Database className="h-5 w-5 text-cyan-400" />
            Data Management & Analytics
          </CardTitle>
          <CardDescription className="text-cyan-200">
            Guardian data flows and sacred analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Data Sources */}
            <div className="space-y-4">
              <h4 className="text-white font-medium">Active Data Sources</h4>
              <div className="space-y-3">
                {[
                  {
                    name: "Flourish Ledger",
                    status: "connected",
                    count: "1.2M",
                  },
                  {
                    name: "Sacred Transactions",
                    status: "connected",
                    count: "456K",
                  },
                  { name: "AI Ethics Logs", status: "connected", count: "89K" },
                  {
                    name: "Ritual Outcomes",
                    status: "connected",
                    count: "12K",
                  },
                  {
                    name: "Covenant Contracts",
                    status: "connected",
                    count: "3K",
                  },
                ].map((source, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-white/5 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-cyan-200 text-sm">
                        {source.name}
                      </span>
                    </div>
                    <span className="text-white font-mono text-xs">
                      {source.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Processing Status */}
            <div className="space-y-4">
              <h4 className="text-white font-medium">Processing Status</h4>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-cyan-200">Real-time Analysis</span>
                    <span className="text-green-400">98.7%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "98.7%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-cyan-200">Audit Trail Sync</span>
                    <span className="text-blue-400">100%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-cyan-200">AI Model Training</span>
                    <span className="text-purple-400">87.3%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: "87.3%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <h4 className="text-white font-medium">Data Actions</h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-green-500 text-green-300 hover:bg-green-500/20"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Audit Trail
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-blue-500 text-blue-300 hover:bg-blue-500/20"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import Sacred Data
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-purple-500 text-purple-300 hover:bg-purple-500/20"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-cyan-500 text-cyan-300 hover:bg-cyan-500/20"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics Dashboard
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Covenant Management */}
      <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-400" />
            Sacred Covenant Management
          </CardTitle>
          <CardDescription className="text-cyan-200">
            Create and modify platform governance contracts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Covenant Creator */}
            <div className="space-y-4">
              <h4 className="text-white font-medium">Create New Covenant</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-cyan-200 text-sm mb-1 block">
                    Covenant Title
                  </label>
                  <Input
                    placeholder="Sacred Agreement Name"
                    className="bg-white/20 border-cyan-500/30 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <label className="text-cyan-200 text-sm mb-1 block">
                    Scope
                  </label>
                  <Select>
                    <SelectTrigger className="bg-white/20 border-cyan-500/30 text-white">
                      <SelectValue placeholder="Select covenant scope" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="platform">Platform-wide</SelectItem>
                      <SelectItem value="bioregional">Bioregional</SelectItem>
                      <SelectItem value="cluster">Service Cluster</SelectItem>
                      <SelectItem value="individual">
                        Individual Agreement
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-cyan-200 text-sm mb-1 block">
                    Sacred Terms
                  </label>
                  <Textarea
                    placeholder="Enter the sacred terms and conditions..."
                    className="bg-white/20 border-cyan-500/30 text-white placeholder:text-white/50 min-h-[100px]"
                  />
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Draft Covenant
                </Button>
              </div>
            </div>

            {/* Active Covenants */}
            <div className="space-y-4">
              <h4 className="text-white font-medium">Active Covenants</h4>
              <div className="space-y-3">
                {[
                  {
                    name: "Platform Operating Covenant",
                    parties: "All Participants",
                    status: "active",
                  },
                  {
                    name: "Bioregional Distribution Accord",
                    parties: "Regional Guardians",
                    status: "active",
                  },
                  {
                    name: "AI Ethics Agreement",
                    parties: "Tech Collectives",
                    status: "pending",
                  },
                  {
                    name: "Sacred Service Standards",
                    parties: "Service Providers",
                    status: "review",
                  },
                ].map((covenant, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white/5 rounded border border-cyan-500/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm font-medium">
                        {covenant.name}
                      </span>
                      <Badge
                        variant={
                          covenant.status === "active" ? "default" : "secondary"
                        }
                      >
                        {covenant.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-cyan-300 text-xs">
                      {covenant.parties}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-cyan-500 text-cyan-300 hover:bg-cyan-500/20"
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-purple-500 text-purple-300 hover:bg-purple-500/20"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RevOps Integration */}
      <Card className="bg-gradient-to-r from-orange-500/20 to-cyan-500/20 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Wrench className="h-5 w-5 text-orange-400" />
            RevOps Integration Binding
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-orange-300 font-medium">Connected Systems</h4>
              <div className="space-y-1 text-cyan-200 text-sm">
                <div>• Metabase + Hasura Analytics</div>
                <div>• D3.js Annotated Views</div>
                <div>• Guardian Tools Console UI</div>
                <div>• Sacred Admin Dashboard</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-orange-300 font-medium">
                Admin Capabilities
              </h4>
              <div className="space-y-1 text-cyan-200 text-sm">
                <div>• Real-time Flourish scoring adjustments</div>
                <div>• SDG-alignment payout controls</div>
                <div>• Blessing distribution management</div>
                <div>• Covenant contract creation tools</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
