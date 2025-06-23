// Critical Components Dashboard - Overview of all new components
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Cpu,
  Globe,
  Zap,
  Users,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Star,
  Eye,
  TrendingUp,
  Code,
  Shield,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CriticalComponentsDashboard = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const components = [
    {
      id: "ritual-tech-page",
      title: "Enhanced Ritual Technologist Page",
      category: "Core Page",
      description:
        "Comprehensive service showcase with intelligence integration, live metrics, and consultation booking.",
      features: [
        "Intelligence-driven blog slider",
        "Live project metrics",
        "Service exposure hub",
        "Sacred timing integration",
        "Multi-section navigation",
      ],
      status: "deployed",
      impact: "high",
      path: "/ritual-technologist",
      icon: Cpu,
      color: "from-purple-500 to-cyan-500",
    },
    {
      id: "intelligent-blog-slider",
      title: "Intelligent Blog Slider",
      category: "Intelligence Component",
      description:
        "Dynamic content slider that pulls from the intelligence layer with real-time insights and auto-advancing features.",
      features: [
        "Intelligence layer integration",
        "Auto-advancing content",
        "Live insights feed",
        "Multiple content categories",
        "Interactive navigation",
      ],
      status: "deployed",
      impact: "high",
      icon: Brain,
      color: "from-cyan-500 to-blue-500",
    },
    {
      id: "service-exposure-hub",
      title: "Service Exposure Hub",
      category: "Service Component",
      description:
        "Prominent display system for ritual tech services with live updates, testimonials, and booking integration.",
      features: [
        "Service showcase with metrics",
        "Live availability updates",
        "Client testimonials",
        "Pricing transparency",
        "Direct consultation booking",
      ],
      status: "deployed",
      impact: "high",
      icon: Zap,
      color: "from-orange-500 to-red-500",
    },
    {
      id: "blog-intelligence-engine",
      title: "Blog Intelligence Engine",
      category: "Backend Service",
      description:
        "AI-driven content generation and intelligence system that creates dynamic, timely content for the platform.",
      features: [
        "AI content generation",
        "Real-time intelligence insights",
        "Service update automation",
        "Pattern recognition",
        "Feed management system",
      ],
      status: "deployed",
      impact: "critical",
      icon: Globe,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "ritual-tech-exposure",
      title: "Ritual Tech Exposure Component",
      category: "Landing Integration",
      description:
        "Multi-variant component for prominently featuring ritual tech services across the platform.",
      features: [
        "Hero variant for landing",
        "Card variant for sidebars",
        "Minimal variant for navigation",
        "Live metrics display",
        "Direct consultation links",
      ],
      status: "deployed",
      impact: "medium",
      icon: Star,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "navigation-enhancement",
      title: "Enhanced Navigation Oracle",
      category: "Navigation Component",
      description:
        "Updated navigation with prominent ritual tech services button and improved user flow.",
      features: [
        "Prominent services button",
        "Sacred timing awareness",
        "Improved user guidance",
        "Enhanced accessibility",
        "Cosmic alignment integration",
      ],
      status: "deployed",
      impact: "medium",
      icon: Eye,
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "deployed":
        return "bg-green-500";
      case "testing":
        return "bg-yellow-500";
      case "development":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "critical":
        return "text-red-400 border-red-400";
      case "high":
        return "text-orange-400 border-orange-400";
      case "medium":
        return "text-yellow-400 border-yellow-400";
      default:
        return "text-green-400 border-green-400";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-white">
          Critical Components Dashboard
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Overview of all newly deployed components for the Ritual Technologist
          service exposure and intelligence layer integration.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-black/40 border-green-500/30 backdrop-blur-md">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {components.length}
            </div>
            <div className="text-sm text-gray-400">Components Deployed</div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-red-500/30 backdrop-blur-md">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">
              {components.filter((c) => c.impact === "critical").length}
            </div>
            <div className="text-sm text-gray-400">Critical Impact</div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-orange-500/30 backdrop-blur-md">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">
              {components.filter((c) => c.impact === "high").length}
            </div>
            <div className="text-sm text-gray-400">High Impact</div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-md">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">100%</div>
            <div className="text-sm text-gray-400">Deployment Success</div>
          </CardContent>
        </Card>
      </div>

      {/* Components Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {components.map((component, index) => {
          const IconComponent = component.icon;

          return (
            <motion.div
              key={component.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-md hover:border-cyan-500/50 transition-all h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-r ${component.color}`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white">
                          {component.title}
                        </CardTitle>
                        <p className="text-gray-400">{component.category}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className={getImpactColor(component.impact)}
                      >
                        {component.impact} impact
                      </Badge>
                      <div
                        className={`w-3 h-3 rounded-full ${getStatusColor(component.status)}`}
                      ></div>
                    </div>
                  </div>

                  <p className="text-gray-300">{component.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {component.features.map((feature, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-300 flex items-center"
                        >
                          <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700/30">
                    <div className="text-xs text-gray-400">
                      Status:{" "}
                      <span className="capitalize text-white">
                        {component.status}
                      </span>
                    </div>

                    {component.path && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20"
                        onClick={() => navigate(component.path)}
                      >
                        View Live
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Next Steps */}
      <Card className="bg-black/40 border-purple-500/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Next Phase Development
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            All critical components have been successfully deployed. The ritual
            technologist services are now prominently exposed with intelligent
            content integration.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-black/20 p-4 rounded-lg border border-blue-500/20">
              <h4 className="text-white font-semibold mb-2">
                Phase 2: Advanced Intelligence
              </h4>
              <p className="text-gray-400 text-sm">
                Enhanced AI-driven insights and predictive content generation
              </p>
            </div>

            <div className="bg-black/20 p-4 rounded-lg border border-green-500/20">
              <h4 className="text-white font-semibold mb-2">
                Phase 3: Community Integration
              </h4>
              <p className="text-gray-400 text-sm">
                Deep community features and collaborative intelligence
              </p>
            </div>

            <div className="bg-black/20 p-4 rounded-lg border border-purple-500/20">
              <h4 className="text-white font-semibold mb-2">
                Phase 4: Consciousness Metrics
              </h4>
              <p className="text-gray-400 text-sm">
                Advanced consciousness tracking and system coherence
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CriticalComponentsDashboard;
