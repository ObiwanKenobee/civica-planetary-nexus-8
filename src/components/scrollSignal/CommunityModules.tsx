// CIVICA 144 CommunityModules Component
// Health, Education, and Environment modules for community support

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  GraduationCap,
  Leaf,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { CommunityMember, IoTReading, CivicScroll } from "@/types/scrollSignal";

interface CommunityModulesProps {
  communityMembers: CommunityMember[];
  iotData: IoTReading[];
  scrollHistory: CivicScroll[];
}

export const CommunityModules: React.FC<CommunityModulesProps> = ({
  communityMembers,
  iotData,
  scrollHistory,
}) => {
  const [activeModule, setActiveModule] = useState<string>("healthcare");

  const getModuleStats = (type: string) => {
    const typeScrolls = scrollHistory.filter((scroll) => scroll.type === type);
    const recentScrolls = typeScrolls.filter(
      (scroll) =>
        Date.now() - scroll.createdAt.getTime() < 7 * 24 * 60 * 60 * 1000,
    );

    return {
      total: typeScrolls.length,
      recent: recentScrolls.length,
      impact:
        typeScrolls.reduce(
          (acc, scroll) =>
            acc + scroll.communityImpact.overall.communityWellbeing,
          0,
        ) / Math.max(typeScrolls.length, 1),
    };
  };

  const healthcareStats = getModuleStats("healthcare");
  const educationStats = getModuleStats("education");
  const environmentStats = getModuleStats("environment");

  const modules = [
    {
      id: "healthcare",
      title: "Healthcare & Wellness",
      icon: Heart,
      color: "text-red-400 border-red-400",
      bgColor: "bg-red-500/10",
      stats: healthcareStats,
      description: "Community health monitoring and sacred healing support",
    },
    {
      id: "education",
      title: "Education & Wisdom",
      icon: GraduationCap,
      color: "text-blue-400 border-blue-400",
      bgColor: "bg-blue-500/10",
      stats: educationStats,
      description: "Learning pathways and knowledge preservation",
    },
    {
      id: "environment",
      title: "Environment & Sustainability",
      icon: Leaf,
      color: "text-green-400 border-green-400",
      bgColor: "bg-green-500/10",
      stats: environmentStats,
      description: "Ecological balance and regenerative practices",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Module Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <motion.div
              key={module.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveModule(module.id)}
              className={`cursor-pointer transition-all ${
                activeModule === module.id ? "ring-2 ring-purple-400" : ""
              }`}
            >
              <Card
                className={`${module.bgColor} backdrop-blur-sm border-white/20`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`w-8 h-8 ${module.color.split(" ")[0]}`} />
                    <Badge variant="outline" className={module.color}>
                      {module.stats.recent} Recent
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-white mb-2">
                    {module.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">
                    {module.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Community Impact</span>
                      <span className="text-white">
                        {(module.stats.impact * 100).toFixed(0)}%
                      </span>
                    </div>
                    <Progress
                      value={module.stats.impact * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="mt-4 text-xs text-gray-400">
                    {module.stats.total} total scrolls • Active community
                    support
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Active Module Details */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-400">
            <Users className="w-5 h-5 mr-2" />
            {modules.find((m) => m.id === activeModule)?.title} Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Community Members by Role */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-300">
              Community Specialists
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {communityMembers
                .filter((member) => {
                  if (activeModule === "healthcare")
                    return ["healer", "elder"].includes(member.role);
                  if (activeModule === "education")
                    return ["teacher", "elder"].includes(member.role);
                  if (activeModule === "environment")
                    return ["farmer", "guardian"].includes(member.role);
                  return false;
                })
                .map((member) => (
                  <div
                    key={member.id}
                    className="bg-white/5 rounded-lg p-3 border border-white/10"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="text-lg">
                        {member.role === "elder"
                          ? "👵"
                          : member.role === "healer"
                            ? "👨‍⚕️"
                            : member.role === "teacher"
                              ? "👩‍🏫"
                              : member.role === "farmer"
                                ? "👨‍🌾"
                                : "👩‍💼"}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {member.name}
                        </div>
                        <div className="text-xs text-gray-400 capitalize">
                          {member.role}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-purple-400">
                      Wisdom: {member.wisdom} • Contributions:{" "}
                      {member.contributions}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Relevant IoT Data */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-300">
              Live Environmental Data
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {iotData
                .filter((reading) => {
                  if (activeModule === "healthcare")
                    return ["water_quality", "air_quality"].includes(
                      reading.type,
                    );
                  if (activeModule === "education")
                    return ["air_quality"].includes(reading.type);
                  if (activeModule === "environment")
                    return [
                      "soil_moisture",
                      "water_quality",
                      "air_quality",
                    ].includes(reading.type);
                  return false;
                })
                .slice(-4)
                .map((reading) => (
                  <div
                    key={reading.sensorId}
                    className="bg-white/5 rounded-lg p-3 border border-white/10"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-white">
                          {reading.location}
                        </div>
                        <div className="text-xs text-gray-400 capitalize">
                          {reading.type.replace("_", " ")}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">
                          {reading.value} {reading.unit}
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            reading.quality === "excellent"
                              ? "border-green-400 text-green-400"
                              : reading.quality === "good"
                                ? "border-yellow-400 text-yellow-400"
                                : "border-red-400 text-red-400"
                          }`}
                        >
                          {reading.quality}
                        </Badge>
                      </div>
                    </div>
                    {reading.alert && (
                      <div className="mt-2 flex items-center space-x-1 text-xs text-red-400">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Alert condition detected</span>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Recent Module Activity */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-300">
              Recent Activity
            </h4>
            <div className="space-y-2">
              {scrollHistory
                .filter((scroll) => scroll.type === activeModule)
                .slice(-3)
                .reverse()
                .map((scroll) => (
                  <div
                    key={scroll.id}
                    className="bg-white/5 rounded-lg p-3 border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-white">
                        {scroll.title}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            scroll.status === "blessed"
                              ? "border-green-400 text-green-400"
                              : scroll.status === "active"
                                ? "border-blue-400 text-blue-400"
                                : "border-gray-400 text-gray-400"
                          }`}
                        >
                          {scroll.status}
                        </Badge>
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-400">
                          {scroll.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 line-clamp-2">
                      {scroll.content}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="text-gray-400">
                        By {scroll.createdBy.name}
                      </span>
                      <span className="text-purple-400">
                        Impact:{" "}
                        {(
                          scroll.communityImpact.overall.communityWellbeing *
                          100
                        ).toFixed(0)}
                        %
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Module-Specific Metrics */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-300">
              Module Metrics
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-lg p-3 border border-white/10 text-center">
                <div className="text-2xl font-bold text-white">
                  {modules.find((m) => m.id === activeModule)?.stats.total}
                </div>
                <div className="text-xs text-gray-400">Total Scrolls</div>
              </div>

              <div className="bg-white/5 rounded-lg p-3 border border-white/10 text-center">
                <div className="text-2xl font-bold text-green-400">
                  {
                    scrollHistory.filter(
                      (s) => s.type === activeModule && s.status === "blessed",
                    ).length
                  }
                </div>
                <div className="text-xs text-gray-400">Blessed</div>
              </div>

              <div className="bg-white/5 rounded-lg p-3 border border-white/10 text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {
                    scrollHistory.filter(
                      (s) => s.type === activeModule && s.status === "active",
                    ).length
                  }
                </div>
                <div className="text-xs text-gray-400">Active</div>
              </div>

              <div className="bg-white/5 rounded-lg p-3 border border-white/10 text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {(
                    modules.find((m) => m.id === activeModule)?.stats.impact! *
                    100
                  ).toFixed(0)}
                  %
                </div>
                <div className="text-xs text-gray-400">Avg Impact</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityModules;
