// CIVICA 144 SimulationEngine Component
// Real-time edge computing simulation for scroll impact analysis

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Cpu,
  Wifi,
  BarChart3,
  Target,
  Users,
  Leaf,
  Heart,
} from "lucide-react";
import {
  SimulationResult,
  IoTReading,
  CivicScroll,
  CommunityImpact,
} from "@/types/scrollSignal";

interface SimulationEngineProps {
  activeSimulations: SimulationResult[];
  iotData: IoTReading[];
  scrollHistory: CivicScroll[];
}

export const SimulationEngine: React.FC<SimulationEngineProps> = ({
  activeSimulations,
  iotData,
  scrollHistory,
}) => {
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    edgeLatency: 12,
    fiveGSignal: 95,
    iotConnections: 24,
    aiProcessing: 87,
  });

  const [simulationLoad, setSimulationLoad] = useState(0);
  const [runningSimulation, setRunningSimulation] = useState<string | null>(
    null,
  );

  // Simulate real-time metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics((prev) => ({
        edgeLatency: Math.max(5, prev.edgeLatency + (Math.random() - 0.5) * 4),
        fiveGSignal: Math.max(
          80,
          Math.min(100, prev.fiveGSignal + (Math.random() - 0.5) * 8),
        ),
        iotConnections: Math.max(
          20,
          prev.iotConnections + Math.floor((Math.random() - 0.5) * 6),
        ),
        aiProcessing: Math.max(
          70,
          Math.min(100, prev.aiProcessing + (Math.random() - 0.5) * 10),
        ),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const runNewSimulation = async (type: string) => {
    setRunningSimulation(type);
    setSimulationLoad(0);

    // Simulate processing steps
    const steps = [
      "Initializing edge compute nodes...",
      "Collecting IoT sensor data...",
      "Processing SageMaker models...",
      "Analyzing community impact...",
      "Generating predictions...",
      "Finalizing results...",
    ];

    for (let i = 0; i < steps.length; i++) {
      await delay(800);
      setSimulationLoad((i + 1) * (100 / steps.length));
    }

    await delay(500);
    setRunningSimulation(null);
    setSimulationLoad(0);
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const getImpactColor = (impact: number) => {
    if (impact >= 0.8) return "text-green-400 border-green-400";
    if (impact >= 0.6) return "text-yellow-400 border-yellow-400";
    if (impact >= 0.4) return "text-orange-400 border-orange-400";
    return "text-red-400 border-red-400";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return TrendingUp;
      case "decreasing":
        return TrendingDown;
      default:
        return Activity;
    }
  };

  const mockSimulations: SimulationResult[] = [
    {
      id: "sim_001",
      scenario: "Water quality intervention effectiveness",
      predictions: [
        {
          aspect: "Community health improvement",
          likelihood: 0.87,
          impact: "high",
          timeline: "7 days",
          mitigation: ["water_purification", "community_education"],
        },
        {
          aspect: "Livestock health protection",
          likelihood: 0.72,
          impact: "medium",
          timeline: "3 days",
          mitigation: ["alternative_water_sources"],
        },
      ],
      confidence: 0.89,
      timeHorizon: "30 days",
      factors: [
        {
          type: "environmental",
          name: "Water contamination",
          weight: 0.8,
          currentValue: 0.23,
          trend: "increasing",
        },
        {
          type: "social",
          name: "Community engagement",
          weight: 0.7,
          currentValue: 0.85,
          trend: "stable",
        },
      ],
      multispeciesImpact: [
        {
          species: "livestock",
          impact: "positive",
          severity: 0.6,
          timeframe: "1-2 weeks",
          mitigation: ["clean_water_access"],
        },
        {
          species: "crops",
          impact: "positive",
          severity: 0.4,
          timeframe: "2-4 weeks",
          mitigation: ["irrigation_improvement"],
        },
      ],
      recommendations: [
        {
          priority: "immediate",
          action: "Deploy water purification tablets",
          resources: ["tablets", "distribution"],
          responsibility: ["healer", "guardian"],
          blessing: true,
        },
        {
          priority: "short_term",
          action: "Install community filtration system",
          resources: ["equipment", "training"],
          responsibility: ["farmer", "guardian"],
          blessing: false,
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Real-time Edge Computing Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-500/10 backdrop-blur-sm border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-blue-400">Edge Latency</div>
                <div className="text-2xl font-bold text-white">
                  {realTimeMetrics.edgeLatency.toFixed(0)}ms
                </div>
              </div>
              <Cpu className="w-8 h-8 text-blue-400" />
            </div>
            <Progress
              value={100 - (realTimeMetrics.edgeLatency / 50) * 100}
              className="mt-2 h-2 bg-blue-400/20"
            />
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 backdrop-blur-sm border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-green-400">5G Signal</div>
                <div className="text-2xl font-bold text-white">
                  {realTimeMetrics["5gSignal"].toFixed(0)}%
                </div>
              </div>
              <Wifi className="w-8 h-8 text-green-400" />
            </div>
            <Progress
              value={realTimeMetrics["5gSignal"]}
              className="mt-2 h-2 bg-green-400/20"
            />
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 backdrop-blur-sm border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-purple-400">IoT Sensors</div>
                <div className="text-2xl font-bold text-white">
                  {realTimeMetrics.iotConnections}
                </div>
              </div>
              <Globe className="w-8 h-8 text-purple-400" />
            </div>
            <div className="text-xs text-purple-300 mt-1">
              Active connections
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-500/10 backdrop-blur-sm border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-yellow-400">AI Processing</div>
                <div className="text-2xl font-bold text-white">
                  {realTimeMetrics.aiProcessing.toFixed(0)}%
                </div>
              </div>
              <Zap className="w-8 h-8 text-yellow-400" />
            </div>
            <Progress
              value={realTimeMetrics.aiProcessing}
              className="mt-2 h-2 bg-yellow-400/20"
            />
          </CardContent>
        </Card>
      </div>

      {/* Active Simulations */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-purple-400">
            <div className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Active Edge Simulations
            </div>
            <Badge
              variant="outline"
              className="border-purple-400 text-purple-400 bg-purple-400/10"
            >
              {mockSimulations.length} Running
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Running Simulation Progress */}
          <AnimatePresence>
            {runningSimulation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-purple-300">
                    Running: {runningSimulation}
                  </span>
                  <span className="text-sm text-purple-400">
                    {simulationLoad.toFixed(0)}%
                  </span>
                </div>
                <Progress
                  value={simulationLoad}
                  className="h-3 bg-purple-400/20"
                />
                <div className="text-xs text-gray-300 mt-2">
                  Processing on AWS Wavelength edge nodes...
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Simulation Results */}
          {mockSimulations.map((simulation) => (
            <div key={simulation.id} className="space-y-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white">
                    {simulation.scenario}
                  </h3>
                  <Badge
                    variant="outline"
                    className="border-green-400 text-green-400 bg-green-400/10"
                  >
                    {(simulation.confidence * 100).toFixed(0)}% Confidence
                  </Badge>
                </div>

                {/* Predictions */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-gray-300">
                    Impact Predictions
                  </div>
                  {simulation.predictions.map((prediction, index) => (
                    <div
                      key={index}
                      className="bg-white/5 rounded-lg p-3 border border-white/10"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white">
                          {prediction.aspect}
                        </span>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className={getImpactColor(prediction.likelihood)}
                          >
                            {(prediction.likelihood * 100).toFixed(0)}%
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`
                            ${
                              prediction.impact === "high"
                                ? "border-red-400 text-red-400"
                                : prediction.impact === "medium"
                                  ? "border-yellow-400 text-yellow-400"
                                  : "border-green-400 text-green-400"
                            }
                          `}
                          >
                            {prediction.impact.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        Timeline: {prediction.timeline} • Mitigation:{" "}
                        {prediction.mitigation.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Simulation Factors */}
                <div className="space-y-3 mt-4">
                  <div className="text-sm font-medium text-gray-300">
                    Key Factors
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {simulation.factors.map((factor, index) => {
                      const TrendIcon = getTrendIcon(factor.trend);
                      return (
                        <div
                          key={index}
                          className="bg-white/5 rounded-lg p-3 border border-white/10"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-white">
                              {factor.name}
                            </span>
                            <TrendIcon
                              className={`w-4 h-4 ${
                                factor.trend === "increasing"
                                  ? "text-green-400"
                                  : factor.trend === "decreasing"
                                    ? "text-red-400"
                                    : "text-gray-400"
                              }`}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Progress
                              value={factor.currentValue * 100}
                              className="flex-1 mr-3 h-2"
                            />
                            <span className="text-xs text-gray-400">
                              {(factor.weight * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Multispecies Impact */}
                <div className="space-y-3 mt-4">
                  <div className="text-sm font-medium text-gray-300 flex items-center">
                    <Leaf className="w-4 h-4 mr-2" />
                    Multispecies Impact Analysis
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {simulation.multispeciesImpact.map((impact, index) => (
                      <div
                        key={index}
                        className="bg-white/5 rounded-lg p-3 border border-white/10"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-white capitalize">
                            {impact.species}
                          </span>
                          <Badge
                            variant="outline"
                            className={`
                            ${
                              impact.impact === "positive"
                                ? "border-green-400 text-green-400"
                                : impact.impact === "negative"
                                  ? "border-red-400 text-red-400"
                                  : "border-gray-400 text-gray-400"
                            }
                          `}
                          >
                            {impact.impact.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-400">
                          Severity: {(impact.severity * 100).toFixed(0)}% •{" "}
                          {impact.timeframe}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="space-y-3 mt-4">
                  <div className="text-sm font-medium text-gray-300 flex items-center">
                    <Target className="w-4 h-4 mr-2" />
                    AI Recommendations
                  </div>
                  {simulation.recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="bg-white/5 rounded-lg p-3 border border-white/10"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white">
                          {rec.action}
                        </span>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className={`
                            ${
                              rec.priority === "immediate"
                                ? "border-red-400 text-red-400"
                                : rec.priority === "short_term"
                                  ? "border-yellow-400 text-yellow-400"
                                  : "border-green-400 text-green-400"
                            }
                          `}
                          >
                            {rec.priority.replace("_", " ").toUpperCase()}
                          </Badge>
                          {rec.blessing && (
                            <Badge
                              variant="outline"
                              className="border-pink-400 text-pink-400"
                            >
                              <Heart className="w-3 h-3 mr-1" />
                              Blessing Required
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        Resources: {rec.resources.join(", ")} • Responsibility:{" "}
                        {rec.responsibility.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Simulation Controls */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-400">
            <Zap className="w-5 h-5 mr-2" />
            Run New Simulation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "Healthcare Impact",
              "Education Outcomes",
              "Environmental Effects",
              "Economic Analysis",
            ].map((type) => (
              <Button
                key={type}
                variant="outline"
                onClick={() => runNewSimulation(type)}
                disabled={runningSimulation !== null}
                className="border-blue-400 text-blue-400 hover:bg-blue-400/10 h-auto py-3 px-4"
              >
                <div className="text-center">
                  <div className="text-sm font-medium">
                    {type.split(" ")[0]}
                  </div>
                  <div className="text-xs opacity-80">
                    {type.split(" ").slice(1).join(" ")}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time IoT Data Feed */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center text-green-400">
            <Activity className="w-5 h-5 mr-2" />
            Live IoT Sensor Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {iotData.slice(-4).map((reading) => (
              <div
                key={reading.sensorId}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      reading.alert
                        ? "bg-red-400"
                        : reading.quality === "excellent"
                          ? "bg-green-400"
                          : reading.quality === "good"
                            ? "bg-yellow-400"
                            : "bg-orange-400"
                    }`}
                  />
                  <div>
                    <div className="text-sm font-medium text-white">
                      {reading.location}
                    </div>
                    <div className="text-xs text-gray-400 capitalize">
                      {reading.type.replace("_", " ")}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">
                    {reading.value} {reading.unit}
                  </div>
                  <div className="text-xs text-gray-400">{reading.quality}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimulationEngine;
