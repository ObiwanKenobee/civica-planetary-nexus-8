// Ritual Tech Exposure Component - Prominent display on Landing page
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Cpu,
  Brain,
  Zap,
  ArrowRight,
  ExternalLink,
  Globe,
  Users,
  Sparkles,
  Code,
  Star,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RitualTechExposureProps {
  variant?: "hero" | "card" | "minimal";
  className?: string;
}

const RitualTechExposure: React.FC<RitualTechExposureProps> = ({
  variant = "card",
  className = "",
}) => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    activeProjects: 23,
    clientSatisfaction: 98.5,
    consciousnessIndex: 87.3,
  });

  // Live metrics simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        activeProjects: prev.activeProjects + Math.floor(Math.random() * 3) - 1,
        clientSatisfaction: Math.min(
          100,
          prev.clientSatisfaction + (Math.random() - 0.5) * 0.1,
        ),
        consciousnessIndex: Math.min(
          100,
          prev.consciousnessIndex + (Math.random() - 0.5) * 0.5,
        ),
      }));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  if (variant === "hero") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className={`relative ${className}`}
      >
        <Card className="bg-gradient-to-br from-purple-900/60 to-cyan-900/60 border-cyan-400/30 backdrop-blur-md overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.2),transparent_50%)]" />
          </div>

          <CardHeader className="relative z-10 pb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500">
                  <Cpu className="w-10 h-10 text-white" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold text-white flex items-center">
                    🛠️ Ritual Technologist
                    <Badge className="ml-3 bg-yellow-500 text-black">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </CardTitle>
                  <p className="text-cyan-400 text-lg font-medium mt-1">
                    Consciousness-Informed Technology Solutions
                  </p>
                </div>
              </div>

              <Badge
                variant="outline"
                className="border-green-400 text-green-400 animate-pulse"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Available Now
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="relative z-10 space-y-6">
            <p className="text-gray-200 text-lg leading-relaxed">
              Where ancient wisdom meets cutting-edge technology. Specializing
              in creating digital systems that honor consciousness, serve
              ecological regeneration, and enhance collective intelligence.
            </p>

            {/* Live Metrics */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {metrics.activeProjects}
                </div>
                <div className="text-sm text-gray-400">Active Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {metrics.clientSatisfaction.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-400">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {metrics.consciousnessIndex.toFixed(1)}
                </div>
                <div className="text-sm text-gray-400">Consciousness Index</div>
              </div>
            </div>

            {/* Key Services Preview */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-black/20 p-4 rounded-lg border border-cyan-500/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Brain className="w-5 h-5 text-cyan-400" />
                  <span className="text-white font-semibold">
                    Quantum-Sacred Architecture
                  </span>
                </div>
                <p className="text-gray-300 text-sm">
                  340% performance improvement through consciousness-informed
                  design
                </p>
              </div>

              <div className="bg-black/20 p-4 rounded-lg border border-green-500/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className="w-5 h-5 text-green-400" />
                  <span className="text-white font-semibold">
                    Bioregional AI Training
                  </span>
                </div>
                <p className="text-gray-300 text-sm">
                  Place-based intelligence systems that understand local
                  ecosystems
                </p>
              </div>

              <div className="bg-black/20 p-4 rounded-lg border border-purple-500/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-semibold">
                    Collective Code Review
                  </span>
                </div>
                <p className="text-gray-300 text-sm">
                  Wisdom-guided development with collective intelligence
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between pt-6 border-t border-white/10">
              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                  onClick={() => navigate("/ritual-tech-services")}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Explore Services
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20"
                  onClick={() =>
                    window.open(
                      "mailto:ritual@civica144.com?subject=Consultation Request",
                      "_blank",
                    )
                  }
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Book Consultation
                </Button>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Eye className="w-4 h-4" />
                <span>Featured on Intelligence Layer</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (variant === "minimal") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`${className}`}
      >
        <Card
          className="bg-black/30 border-cyan-500/30 backdrop-blur-sm hover:border-cyan-500/50 transition-all cursor-pointer"
          onClick={() => navigate("/ritual-tech-services")}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">
                    🛠️ Ritual Technologist
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Consciousness-informed solutions
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Default 'card' variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${className}`}
    >
      <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-md hover:border-cyan-500/50 transition-all">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-white">
                  🛠️ Ritual Technologist
                </CardTitle>
                <p className="text-cyan-400">
                  Consciousness-Informed Technology
                </p>
              </div>
            </div>
            <Badge className="bg-yellow-500 text-black">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-gray-300">
            Creating digital systems that honor consciousness, serve ecological
            regeneration, and enhance collective intelligence through sacred
            technology integration.
          </p>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-lg font-bold text-cyan-400">
                {metrics.activeProjects}
              </div>
              <div className="text-xs text-gray-400">Projects</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-400">
                {metrics.clientSatisfaction.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-400">Satisfaction</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-400">
                {metrics.consciousnessIndex.toFixed(1)}
              </div>
              <div className="text-xs text-gray-400">Consciousness</div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20"
              onClick={() => navigate("/ritual-tech-services")}
            >
              Explore Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <Button
              size="sm"
              className="bg-gradient-to-r from-cyan-500 to-purple-500"
              onClick={() =>
                window.open(
                  "mailto:ritual@civica144.com?subject=Consultation Request",
                  "_blank",
                )
              }
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Consult
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RitualTechExposure;
