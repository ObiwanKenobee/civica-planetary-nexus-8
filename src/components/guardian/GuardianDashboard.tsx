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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Shield,
  Brain,
  Settings,
  Activity,
  AlertTriangle,
  TrendingUp,
  Users,
  Globe,
} from "lucide-react";

import { BalanceModule } from "./BalanceModule";
import { RegionalOversight } from "./RegionalOversight";
import { AuditLogs } from "./AuditLogs";
import { AIEthicsMonitor } from "./AIEthicsMonitor";
import { DisputeMediation } from "./DisputeMediation";
import { RitualFailsafes } from "./RitualFailsafes";
import { RevOpsIntegration } from "./RevOpsIntegration";
import { MetaCoPilot } from "./MetaCoPilot";
import { GuardianToolsConsole } from "./GuardianToolsConsole";

import { useGuardianAuth } from "../../hooks/useGuardianAuth";
import { mockRevOpsMetrics } from "../../data/guardianData";

export function GuardianDashboard() {
  const { session, logout } = useGuardianAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const metrics = mockRevOpsMetrics;

  const getSystemStatus = () => {
    const criticalAlerts =
      metrics.aiAlerts + (metrics.ethicsScore < 70 ? 1 : 0);
    if (criticalAlerts > 5) return { status: "critical", color: "destructive" };
    if (criticalAlerts > 2) return { status: "warning", color: "secondary" };
    return { status: "optimal", color: "default" };
  };

  const systemStatus = getSystemStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              🧬 Guardian Intelligence Layer
              <Shield className="h-10 w-10 text-cyan-400" />
            </h1>
            <p className="text-cyan-200 text-lg mt-2">
              Sacred Intelligence & Revenue Oversight Membrane
            </p>
            <p className="text-indigo-300 text-sm">
              Session: {session?.user} | Access Level:{" "}
              {session?.accessLevel?.toUpperCase()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={systemStatus.color} className="text-sm">
              System {systemStatus.status.toUpperCase()}
            </Badge>
            <Button
              onClick={logout}
              variant="outline"
              className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/20"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-cyan-200">
                Ethics Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {metrics.ethicsScore}%
              </div>
              <div className="flex items-center gap-1 mt-1">
                {metrics.ethicsScore >= 80 ? (
                  <TrendingUp className="h-3 w-3 text-green-400" />
                ) : (
                  <AlertTriangle className="h-3 w-3 text-yellow-400" />
                )}
                <span
                  className={`text-xs ${metrics.ethicsScore >= 80 ? "text-green-400" : "text-yellow-400"}`}
                >
                  {metrics.ethicsScore >= 80 ? "Optimal" : "Attention Needed"}
                </span>
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
                {metrics.aiAlerts}
              </div>
              <p className="text-xs text-cyan-300 mt-1">Requiring attention</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-cyan-200">
                Revenue Flow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${metrics.totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-cyan-300 mt-1">
                Total platform revenue
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-cyan-200">
                Flourish Circulation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {metrics.flourishCirculation.toLocaleString()}
              </div>
              <p className="text-xs text-cyan-300 mt-1">
                Sacred tokens flowing
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-9 bg-white/10 backdrop-blur-lg">
            <TabsTrigger value="overview" className="text-xs">
              Overview
            </TabsTrigger>
            <TabsTrigger value="balance" className="text-xs">
              ⚖️ Balance
            </TabsTrigger>
            <TabsTrigger value="regional" className="text-xs">
              🌍 Regional
            </TabsTrigger>
            <TabsTrigger value="audit" className="text-xs">
              🧾 Audit
            </TabsTrigger>
            <TabsTrigger value="ai-ethics" className="text-xs">
              🧠 AI Ethics
            </TabsTrigger>
            <TabsTrigger value="mediation" className="text-xs">
              🕊️ Mediation
            </TabsTrigger>
            <TabsTrigger value="failsafes" className="text-xs">
              🛡️ Failsafes
            </TabsTrigger>
            <TabsTrigger value="revops" className="text-xs">
              📊 RevOps
            </TabsTrigger>
            <TabsTrigger value="tools" className="text-xs">
              🛠️ Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Meta Co-Pilot */}
              <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-400" />
                    Meta Co-Pilot AI
                  </CardTitle>
                  <CardDescription className="text-cyan-200">
                    Latest insights and recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MetaCoPilot isCompact />
                </CardContent>
              </Card>

              {/* System Health */}
              <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-400" />
                    System Health
                  </CardTitle>
                  <CardDescription className="text-cyan-200">
                    Guardian layer status overview
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-cyan-300">Active Subscriptions</div>
                      <div className="text-white font-mono text-lg">
                        {metrics.activeSubscriptions}
                      </div>
                    </div>
                    <div>
                      <div className="text-cyan-300">Refund Requests</div>
                      <div className="text-white font-mono text-lg">
                        {metrics.refundRequests}
                      </div>
                    </div>
                    <div>
                      <div className="text-cyan-300">Region Balance</div>
                      <div className="text-white font-mono text-lg">
                        {metrics.regionBalance}%
                      </div>
                    </div>
                    <div>
                      <div className="text-cyan-300">Ceremonial Overrides</div>
                      <div className="text-white font-mono text-lg">
                        {metrics.ceremonialOverrides}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Guardian Modules Overview */}
            <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-white">
                  Guardian Functional Modules
                </CardTitle>
                <CardDescription className="text-cyan-200">
                  Core oversight capabilities with RevOps integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      id: "balance",
                      icon: "⚖️",
                      name: "Balance Control",
                      status: "active",
                    },
                    {
                      id: "regional",
                      icon: "🌍",
                      name: "Regional Oversight",
                      status: "active",
                    },
                    {
                      id: "audit",
                      icon: "🧾",
                      name: "Audit & Consent",
                      status: "active",
                    },
                    {
                      id: "ai-ethics",
                      icon: "🧠",
                      name: "AI Ethics",
                      status: "monitoring",
                    },
                    {
                      id: "mediation",
                      icon: "🕊️",
                      name: "Dispute Mediation",
                      status: "active",
                    },
                    {
                      id: "failsafes",
                      icon: "🛡️",
                      name: "Ritual Failsafes",
                      status: "standby",
                    },
                  ].map((module) => (
                    <Card
                      key={module.id}
                      className="bg-white/5 border-cyan-500/20 cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => setActiveTab(module.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{module.icon}</span>
                          <div className="flex-1">
                            <div className="text-white font-medium">
                              {module.name}
                            </div>
                            <Badge
                              variant={
                                module.status === "active"
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs mt-1"
                            >
                              {module.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="balance">
            <BalanceModule />
          </TabsContent>

          <TabsContent value="regional">
            <RegionalOversight />
          </TabsContent>

          <TabsContent value="audit">
            <AuditLogs />
          </TabsContent>

          <TabsContent value="ai-ethics">
            <AIEthicsMonitor />
          </TabsContent>

          <TabsContent value="mediation">
            <DisputeMediation />
          </TabsContent>

          <TabsContent value="failsafes">
            <RitualFailsafes />
          </TabsContent>

          <TabsContent value="revops">
            <RevOpsIntegration />
          </TabsContent>

          <TabsContent value="tools">
            <GuardianToolsConsole />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
