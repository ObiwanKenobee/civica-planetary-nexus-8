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
import {
  TrendingUp,
  DollarSign,
  Users,
  Activity,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  RefreshCw,
} from "lucide-react";
import { mockRevOpsMetrics } from "../../data/guardianData";

export function RevOpsIntegration() {
  const [metrics] = useState(mockRevOpsMetrics);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState("7d");

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  // Mock revenue flow data
  const revenueFlows = [
    {
      source: "Ritual Tech Services",
      amount: 89456,
      percentage: 38,
      growth: 12,
    },
    { source: "Sacred Scrolls", amount: 67892, percentage: 29, growth: 8 },
    {
      source: "Platform Subscriptions",
      amount: 45123,
      percentage: 19,
      growth: 15,
    },
    {
      source: "Flourish Transactions",
      amount: 32096,
      percentage: 14,
      growth: -3,
    },
  ];

  const flourishFlows = [
    { region: "Global South", allocation: 35, target: 30, status: "above" },
    {
      region: "Indigenous Communities",
      allocation: 28,
      target: 25,
      status: "above",
    },
    {
      region: "Regenerative Tech",
      allocation: 22,
      target: 20,
      status: "above",
    },
    { region: "Sacred Arts", allocation: 15, target: 25, status: "below" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            📊 RevOps Integration
            <TrendingUp className="h-8 w-8 text-green-400" />
          </h2>
          <p className="text-cyan-200 mt-2">
            Revenue operations dashboard with Guardian intelligence integration
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white/20 border border-cyan-500/30 text-white rounded px-3 py-2 text-sm"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
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

      {/* Key Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-lg border-green-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-200">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${metrics.totalRevenue.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-400" />
              <span className="text-green-400 text-xs">
                +18% from last period
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-purple-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-200">
              Flourish Circulation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              🌸 {metrics.flourishCirculation.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3 text-purple-400" />
              <span className="text-purple-400 text-xs">+24% circulation</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-blue-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-200">
              Active Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {metrics.activeSubscriptions.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3 text-blue-400" />
              <span className="text-blue-400 text-xs">+12% new signups</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-yellow-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-200">
              Refund Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {(
                (metrics.refundRequests / metrics.activeSubscriptions) *
                100
              ).toFixed(1)}
              %
            </div>
            <div className="flex items-center gap-1 mt-1">
              <ArrowDownRight className="h-3 w-3 text-green-400" />
              <span className="text-green-400 text-xs">-5% improvement</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Flow Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-400" />
              Revenue Streams
            </CardTitle>
            <CardDescription className="text-cyan-200">
              Income distribution across sacred offerings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {revenueFlows.map((flow, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-cyan-200 text-sm">{flow.source}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-mono">
                      ${flow.amount.toLocaleString()}
                    </span>
                    <div
                      className={`flex items-center gap-1 ${flow.growth >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {flow.growth >= 0 ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      <span className="text-xs">{Math.abs(flow.growth)}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={flow.percentage} className="h-2 flex-1" />
                  <span className="text-cyan-300 text-xs">
                    {flow.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PieChart className="h-5 w-5 text-purple-400" />
              Flourish Distribution
            </CardTitle>
            <CardDescription className="text-cyan-200">
              Sacred token allocation by region and purpose
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {flourishFlows.map((flow, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-cyan-200 text-sm">{flow.region}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-mono">
                      {flow.allocation}%
                    </span>
                    <Badge
                      variant={
                        flow.status === "above" ? "default" : "destructive"
                      }
                    >
                      {flow.status === "above"
                        ? "Above Target"
                        : "Below Target"}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={flow.allocation} className="h-2 flex-1" />
                  <span className="text-cyan-300 text-xs">
                    Target: {flow.target}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Guardian Integration Metrics */}
      <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-cyan-400" />
            Guardian Intelligence Integration
          </CardTitle>
          <CardDescription className="text-cyan-200">
            How Guardian oversight affects revenue operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-cyan-200 text-sm">
                  Ethics Score Impact
                </span>
              </div>
              <div className="text-2xl font-bold text-white">
                {metrics.ethicsScore}%
              </div>
              <p className="text-xs text-cyan-300">Revenue quality index</p>
              <Progress value={metrics.ethicsScore} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-cyan-200 text-sm">Regional Balance</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {metrics.regionBalance}%
              </div>
              <p className="text-xs text-cyan-300">Distribution equity</p>
              <Progress value={metrics.regionBalance} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-cyan-200 text-sm">AI Oversight</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {metrics.aiAlerts}
              </div>
              <p className="text-xs text-cyan-300">Active monitoring alerts</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-cyan-200 text-sm">
                  Ceremony Overrides
                </span>
              </div>
              <div className="text-2xl font-bold text-white">
                {metrics.ceremonialOverrides}
              </div>
              <p className="text-xs text-cyan-300">Sacred interventions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Operations Actions */}
      <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-orange-400" />
            Revenue Operations Actions
          </CardTitle>
          <CardDescription className="text-cyan-200">
            Guardian-triggered revenue adjustments and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="border-green-500 text-green-300 hover:bg-green-500/20 h-auto p-4"
            >
              <div className="text-center">
                <DollarSign className="h-6 w-6 mx-auto mb-2" />
                <div className="font-medium">Initiate Redistribution</div>
                <div className="text-xs opacity-70">Balance regional flows</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="border-purple-500 text-purple-300 hover:bg-purple-500/20 h-auto p-4"
            >
              <div className="text-center">
                <Users className="h-6 w-6 mx-auto mb-2" />
                <div className="font-medium">Ethics Adjustment</div>
                <div className="text-xs opacity-70">Optimize AI scoring</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="border-blue-500 text-blue-300 hover:bg-blue-500/20 h-auto p-4"
            >
              <div className="text-center">
                <Activity className="h-6 w-6 mx-auto mb-2" />
                <div className="font-medium">Flow Analysis</div>
                <div className="text-xs opacity-70">Deep dive metrics</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="border-yellow-500 text-yellow-300 hover:bg-yellow-500/20 h-auto p-4"
            >
              <div className="text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2" />
                <div className="font-medium">Growth Forecast</div>
                <div className="text-xs opacity-70">Predictive modeling</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/20 h-auto p-4"
            >
              <div className="text-center">
                <BarChart3 className="h-6 w-6 mx-auto mb-2" />
                <div className="font-medium">Revenue Audit</div>
                <div className="text-xs opacity-70">
                  Sacred transaction review
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="border-pink-500 text-pink-300 hover:bg-pink-500/20 h-auto p-4"
            >
              <div className="text-center">
                <PieChart className="h-6 w-6 mx-auto mb-2" />
                <div className="font-medium">Ceremony Planning</div>
                <div className="text-xs opacity-70">Stakeholder alignment</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Technical Implementation Map */}
      <Card className="bg-gradient-to-r from-green-500/20 to-purple-500/20 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-400" />
            Technical Implementation Map
          </CardTitle>
          <CardDescription className="text-cyan-200">
            Guardian + RevOps system architecture overview
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="text-green-300 font-medium">Data Sources</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-cyan-200">Flourish Ledger</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-cyan-200">
                    Fiat Gateway (Paystack/PayPal)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-cyan-200">
                    Sacred Transaction Archive
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-cyan-200">AI Ethics Monitoring</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-purple-300 font-medium">Processing Layer</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-cyan-200">Meta-Co-Pilot AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-cyan-200">Audit Spiral</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-cyan-200">Guardian Tools Console</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-cyan-200">Ritual Override System</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-cyan-300 font-medium">Output Actions</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-cyan-200">Multispecies DAO Votes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-cyan-200">Flourish Rebalancing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-cyan-200">Ritual Refunds</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-cyan-200">Covenant Generation</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
