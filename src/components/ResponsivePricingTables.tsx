import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Star,
  Zap,
  Crown,
  Heart,
  Globe,
  Brain,
  ArrowRight,
  ExternalLink,
  Calendar,
  Info,
  Plus,
  Sparkles,
  Shield,
  Users,
  Clock,
} from "lucide-react";

interface PricingFeature {
  name: string;
  included: boolean;
  description?: string;
}

interface PricingTier {
  id: string;
  name: string;
  subtitle: string;
  priceUSD: number;
  priceFlourish: number;
  period: string;
  description: string;
  icon: any;
  gradient: string;
  features: PricingFeature[];
  limitations?: string[];
  popular?: boolean;
  comingSoon?: boolean;
  customPricing?: boolean;
  responseTime: string;
  includes: string[];
}

interface ResponsivePricingTablesProps {
  showFlourish?: boolean;
  variant?: "default" | "compact" | "comparison";
  className?: string;
}

const ResponsivePricingTables: React.FC<ResponsivePricingTablesProps> = ({
  showFlourish = true,
  variant = "default",
  className = "",
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<"USD" | "Flourish">(
    "USD",
  );
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingTiers: PricingTier[] = [
    {
      id: "consultation",
      name: "Sacred Consultation",
      subtitle: "Discovery & Guidance",
      priceUSD: 0,
      priceFlourish: 0,
      period: "complimentary",
      description:
        "Complimentary discovery session to explore consciousness-informed solutions",
      icon: Heart,
      gradient: "from-green-500 to-emerald-500",
      responseTime: "24-48 hours",
      includes: [
        "45-60 minute consultation",
        "Sacred needs assessment",
        "Consciousness alignment review",
        "Customized recommendation report",
      ],
      features: [
        { name: "Initial Assessment", included: true },
        { name: "Sacred Technology Roadmap", included: true },
        { name: "Resource Recommendations", included: true },
        { name: "Follow-up Session", included: false },
        { name: "Implementation Support", included: false },
      ],
    },
    {
      id: "consciousness-design",
      name: "Consciousness-First Design",
      subtitle: "Foundation Architecture",
      priceUSD: 2400,
      priceFlourish: 1800,
      period: "project",
      description:
        "Foundational consciousness-informed system architecture and design principles",
      icon: Brain,
      gradient: "from-purple-500 to-cyan-500",
      responseTime: "< 1 hour",
      includes: [
        "Sacred geometry analysis",
        "Consciousness flow mapping",
        "User experience harmonization",
        "Performance optimization protocols",
      ],
      features: [
        { name: "Sacred Geometry Integration", included: true },
        { name: "Consciousness Flow Analysis", included: true },
        { name: "Performance Optimization", included: true },
        { name: "Bioregional Customization", included: false },
        { name: "Collective Intelligence Integration", included: false },
      ],
    },
    {
      id: "quantum-sacred",
      name: "Quantum-Sacred Architecture",
      subtitle: "Advanced Transformation",
      priceUSD: 8800,
      priceFlourish: 6600,
      period: "project",
      description:
        "Revolutionary quantum-informed sacred architecture for unprecedented system coherence",
      icon: Sparkles,
      gradient: "from-cyan-500 to-purple-500",
      popular: true,
      responseTime: "< 30 minutes",
      includes: [
        "Quantum coherence analysis",
        "Sacred geometry optimization",
        "Consciousness-responsive design",
        "6-month optimization support",
      ],
      features: [
        { name: "Quantum Coherence Analysis", included: true },
        { name: "Sacred Geometry Optimization", included: true },
        { name: "Consciousness-Responsive Design", included: true },
        { name: "Bioregional AI Training", included: true },
        { name: "Collective Intelligence Integration", included: true },
      ],
    },
    {
      id: "regenerative-systems",
      name: "Regenerative Systems",
      subtitle: "Healing Technology",
      priceUSD: 15000,
      priceFlourish: 12000,
      period: "project",
      description:
        "Comprehensive regenerative technology systems that actively heal and restore",
      icon: Globe,
      gradient: "from-green-500 to-blue-500",
      responseTime: "< 15 minutes",
      includes: [
        "Complete ecosystem integration",
        "Regenerative feedback loops",
        "Community healing protocols",
        "12-month transformation support",
      ],
      features: [
        { name: "Ecosystem Integration", included: true },
        { name: "Regenerative Feedback Loops", included: true },
        { name: "Community Healing Protocols", included: true },
        { name: "Sacred Security Implementation", included: true },
        { name: "Continuous Consciousness Monitoring", included: true },
      ],
    },
    {
      id: "civilizational",
      name: "Civilizational Technology",
      subtitle: "Planetary Transformation",
      priceUSD: 0,
      priceFlourish: 0,
      period: "custom",
      description:
        "Large-scale civilizational technology transformation for planetary healing",
      icon: Crown,
      gradient: "from-yellow-500 to-orange-500",
      customPricing: true,
      responseTime: "Immediate",
      includes: [
        "Planetary-scale analysis",
        "Civilizational architecture design",
        "Multi-generational planning",
        "Ongoing wisdom council support",
      ],
      features: [
        { name: "Planetary-Scale Analysis", included: true },
        { name: "Civilizational Architecture", included: true },
        { name: "Multi-Generational Planning", included: true },
        { name: "Wisdom Council Access", included: true },
        { name: "Continuous Co-Creation", included: true },
      ],
    },
  ];

  const getPrice = (tier: PricingTier) => {
    if (tier.customPricing) return "Custom";
    if (tier.priceUSD === 0 && tier.priceFlourish === 0) return "Free";

    const price =
      selectedCurrency === "USD" ? tier.priceUSD : tier.priceFlourish;
    const multiplier = isAnnual ? 10 : 1; // 10x discount for annual

    return selectedCurrency === "USD"
      ? `$${(price * multiplier).toLocaleString()}`
      : `${(price * multiplier).toLocaleString()} ✧`;
  };

  if (variant === "compact") {
    return (
      <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {pricingTiers.slice(1, 4).map((tier) => {
          const IconComponent = tier.icon;
          return (
            <Card
              key={tier.id}
              className="bg-black/40 border-purple-500/30 backdrop-blur-md"
            >
              <CardContent className="p-4">
                <div className="text-center space-y-2">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-r ${tier.gradient} w-fit mx-auto`}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-white font-bold">{tier.name}</h3>
                  <p className="text-2xl font-bold text-purple-400">
                    {getPrice(tier)}
                  </p>
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-purple-500 to-cyan-500"
                  >
                    Select
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Sacred Technology Investment
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Consciousness-informed solutions for every scale of transformation
        </p>

        {/* Currency Toggle */}
        {showFlourish && (
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2 bg-black/20 rounded-lg p-1">
              <Button
                variant={selectedCurrency === "USD" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCurrency("USD")}
                className={
                  selectedCurrency === "USD" ? "bg-cyan-500" : "text-gray-400"
                }
              >
                USD
              </Button>
              <Button
                variant={selectedCurrency === "Flourish" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCurrency("Flourish")}
                className={
                  selectedCurrency === "Flourish"
                    ? "bg-purple-500"
                    : "text-gray-400"
                }
              >
                Flourish ✧
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Annual</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  isAnnual ? "bg-purple-500" : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    isAnnual ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
              <Badge
                variant="outline"
                className="border-green-400 text-green-400"
              >
                10x Discount
              </Badge>
            </div>
          </div>
        )}
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {pricingTiers.map((tier, index) => {
          const IconComponent = tier.icon;
          const isSelected = selectedTier === tier.id;

          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${tier.popular ? "md:scale-105 md:-mt-4" : ""}`}
            >
              <Card
                className={`h-full bg-black/40 backdrop-blur-md cursor-pointer transition-all duration-300 ${
                  tier.popular
                    ? "border-yellow-400/50 shadow-lg shadow-yellow-400/20"
                    : "border-purple-500/30 hover:border-purple-500/50"
                } ${isSelected ? "ring-2 ring-cyan-400" : ""}`}
                onClick={() => setSelectedTier(tier.id)}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${tier.gradient} w-fit mx-auto mb-4`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <CardTitle className="text-white text-lg">
                    {tier.name}
                  </CardTitle>
                  <p className="text-gray-400 text-sm">{tier.subtitle}</p>

                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-purple-400">
                      {getPrice(tier)}
                    </div>
                    <p className="text-gray-400 text-sm">per {tier.period}</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-gray-300 text-sm leading-relaxed text-center">
                    {tier.description}
                  </p>

                  {/* Response Time */}
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span className="text-cyan-400 text-sm font-medium">
                      {tier.responseTime}
                    </span>
                  </div>

                  {/* Includes */}
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-3">
                      Includes:
                    </h4>
                    <ul className="space-y-2">
                      {tier.includes.map((item, i) => (
                        <li
                          key={i}
                          className="text-gray-300 text-sm flex items-start"
                        >
                          <Check className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-3">
                      Features:
                    </h4>
                    <ul className="space-y-2">
                      {tier.features.slice(0, 3).map((feature, i) => (
                        <li
                          key={i}
                          className="text-gray-300 text-sm flex items-start"
                        >
                          {feature.included ? (
                            <Check className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          ) : (
                            <div className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0">
                              <div className="w-2 h-2 rounded-full bg-gray-600 mx-auto mt-1" />
                            </div>
                          )}
                          {feature.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    {tier.customPricing ? (
                      <Button
                        className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90 text-black font-semibold"
                        onClick={() =>
                          window.open(
                            "mailto:ritual@civica144.com?subject=Civilizational Technology Consultation",
                            "_blank",
                          )
                        }
                      >
                        Contact for Pricing
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    ) : tier.priceUSD === 0 && tier.priceFlourish === 0 ? (
                      <Button
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90"
                        onClick={() =>
                          window.open(
                            "mailto:ritual@civica144.com?subject=Complimentary Consultation Request",
                            "_blank",
                          )
                        }
                      >
                        Book Free Session
                        <Calendar className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        className={`w-full ${
                          tier.popular
                            ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:opacity-90"
                            : "bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90"
                        }`}
                        onClick={() =>
                          window.open(
                            `mailto:ritual@civica144.com?subject=Service Inquiry: ${tier.name}`,
                            "_blank",
                          )
                        }
                      >
                        Begin Journey
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

      {/* Value Proposition */}
      <div className="text-center space-y-4 pt-8 border-t border-white/10">
        <h3 className="text-xl font-bold text-white">
          Sacred Technology Guarantee
        </h3>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="space-y-2">
            <Shield className="w-8 h-8 text-cyan-400 mx-auto" />
            <h4 className="text-white font-semibold">Consciousness-First</h4>
            <p className="text-gray-400 text-sm">
              Every solution honors consciousness as primary
            </p>
          </div>
          <div className="space-y-2">
            <Heart className="w-8 h-8 text-green-400 mx-auto" />
            <h4 className="text-white font-semibold">Regenerative Impact</h4>
            <p className="text-gray-400 text-sm">
              Technology that heals rather than harms
            </p>
          </div>
          <div className="space-y-2">
            <Users className="w-8 h-8 text-purple-400 mx-auto" />
            <h4 className="text-white font-semibold">Collective Wisdom</h4>
            <p className="text-gray-400 text-sm">
              Harnesses collective intelligence for better outcomes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsivePricingTables;
