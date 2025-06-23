// Service Exposure Hub - Prominent display of Ritual Tech services
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Zap,
  Brain,
  Globe,
  Users,
  Star,
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  ExternalLink,
  Sparkles,
  Code,
  Shield,
  Target,
  TrendingUp,
  Award,
  BookOpen,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { blogIntelligence } from "@/services/blogIntelligence";

interface ServiceExposureHubProps {
  compact?: boolean;
  showBooking?: boolean;
  featuredOnly?: boolean;
  className?: string;
}

const ServiceExposureHub: React.FC<ServiceExposureHubProps> = ({
  compact = false,
  showBooking = true,
  featuredOnly = false,
  className = "",
}) => {
  const navigate = useNavigate();
  const [serviceUpdates, setServiceUpdates] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [availabilityPulse, setAvailabilityPulse] = useState(0);

  // Load service updates from intelligence layer
  useEffect(() => {
    const updates = blogIntelligence.updateServiceOffers();
    setServiceUpdates(updates);

    // Availability pulse animation
    const interval = setInterval(() => {
      setAvailabilityPulse((prev) => (prev + 1) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      id: "quantum-sacred-arch",
      title: "Quantum-Sacred Architecture",
      subtitle: "Consciousness-Informed System Design",
      description:
        "Revolutionary architecture that integrates quantum principles with sacred geometry for unprecedented system coherence.",
      category: "architecture",
      pricing: "Custom Consultation",
      duration: "2-6 weeks",
      availability: "Limited - 3 slots",
      urgency: "high",
      features: [
        "Quantum coherence analysis",
        "Sacred geometry optimization",
        "Consciousness-responsive design",
        "Performance enhancement protocols",
      ],
      outcomes: [
        "340% performance improvement",
        "Enhanced system resilience",
        "Reduced cognitive load",
        "Harmonized user experience",
      ],
      testimonial: {
        text: "The quantum-sacred architecture transformed our entire platform. Users report feeling more 'at home' in our digital spaces.",
        author: "Dr. Sarah Chen, CTO at EcoTech",
      },
      icon: Brain,
      color: "from-purple-500 to-cyan-500",
      featured: true,
    },
    {
      id: "bioregional-ai",
      title: "Bioregional AI Training",
      subtitle: "Place-Based Intelligence Systems",
      description:
        "Train AI models that understand and respond to local ecosystem patterns, cultural wisdom, and bioregional needs.",
      category: "ai-training",
      pricing: "2,400 Flourish",
      duration: "3-4 weeks",
      availability: "Available - 12 slots",
      urgency: "medium",
      features: [
        "Local ecosystem data integration",
        "Cultural wisdom incorporation",
        "Bioregional pattern recognition",
        "Community feedback loops",
      ],
      outcomes: [
        "Locally-attuned AI responses",
        "Cultural sensitivity integration",
        "Ecosystem-aware decision making",
        "Community trust building",
      ],
      testimonial: {
        text: "Our bioregional AI understands our watershed better than any previous system. It's like having a digital elder.",
        author: "Maria Santos, Director at River Commons",
      },
      icon: Globe,
      color: "from-green-500 to-emerald-500",
      featured: true,
    },
    {
      id: "collective-code-review",
      title: "Collective Code Review",
      subtitle: "Wisdom-Guided Development",
      description:
        "Revolutionary code review process that taps into collective intelligence for superior code quality and system coherence.",
      category: "development",
      pricing: "1,800 Flourish",
      duration: "1-2 weeks",
      availability: "Available - 6 slots",
      urgency: "medium",
      features: [
        "Multi-perspective analysis",
        "Wisdom crowd intelligence",
        "Pattern recognition algorithms",
        "Collective debugging protocols",
      ],
      outcomes: [
        "Dramatically reduced bugs",
        "Enhanced code readability",
        "Improved system architecture",
        "Team consciousness elevation",
      ],
      testimonial: {
        text: "The collective review process caught patterns we never would have seen. Our code is now more elegant and effective.",
        author: "Alex Rivera, Lead Developer at MindFlow",
      },
      icon: Users,
      color: "from-orange-500 to-red-500",
      featured: false,
    },
    {
      id: "regenerative-systems",
      title: "Regenerative Systems Design",
      subtitle: "Technology That Heals",
      description:
        "Design and implement technology systems that actively contribute to ecological and social regeneration.",
      category: "systems",
      pricing: "Custom Project",
      duration: "4-12 weeks",
      availability: "Consultation Available",
      urgency: "high",
      features: [
        "Life-supporting design principles",
        "Regenerative feedback loops",
        "Ecosystem integration protocols",
        "Community healing mechanisms",
      ],
      outcomes: [
        "Net positive environmental impact",
        "Community strengthening",
        "Resilient system architecture",
        "Conscious technology adoption",
      ],
      testimonial: {
        text: "Our regenerative platform doesn't just minimize harm - it actively heals our community and environment.",
        author: "Forest Williams, Founder of ReGen Collective",
      },
      icon: Sparkles,
      color: "from-cyan-500 to-blue-500",
      featured: true,
    },
    {
      id: "sacred-security",
      title: "Sacred Security Protocols",
      subtitle: "Protection Through Consciousness",
      description:
        "Advanced security systems that protect through consciousness-based protocols rather than traditional barriers.",
      category: "security",
      pricing: "3,200 Flourish",
      duration: "2-8 weeks",
      availability: "Priority Queue",
      urgency: "critical",
      features: [
        "Consciousness-based authentication",
        "Intention-aware access control",
        "Sacred boundary protocols",
        "Energetic intrusion detection",
      ],
      outcomes: [
        "Zero-breach track record",
        "User-friendly security",
        "Trust-based architecture",
        "Harmonious protection",
      ],
      testimonial: {
        text: "Sacred security feels like natural protection rather than barriers. Users love the seamless, consciousness-based access.",
        author: "Dr. Luna Starweaver, Security Architect",
      },
      icon: Shield,
      color: "from-violet-500 to-purple-500",
      featured: false,
    },
  ];

  const displayServices = featuredOnly
    ? services.filter((s) => s.featured)
    : services;

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
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

  const getAvailabilityStatus = (availability: string) => {
    if (availability.includes("Limited")) {
      return { color: "text-red-400", pulse: true };
    } else if (availability.includes("Available")) {
      return { color: "text-green-400", pulse: false };
    } else {
      return { color: "text-yellow-400", pulse: false };
    }
  };

  if (compact) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">
            🛠️ Ritual Tech Services
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/ritual-technologist")}
            className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20"
          >
            View All Services
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {displayServices.slice(0, 2).map((service) => {
            const IconComponent = service.icon;
            const status = getAvailabilityStatus(service.availability);

            return (
              <Card
                key={service.id}
                className="bg-black/40 border-cyan-500/30 backdrop-blur-md hover:border-cyan-500/50 transition-all cursor-pointer"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-r ${service.color}`}
                      >
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-sm">
                          {service.title}
                        </CardTitle>
                        <p className="text-gray-400 text-xs">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>

                    {service.featured && (
                      <Badge className="bg-yellow-500 text-black text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-gray-300 text-sm mb-3">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-400">
                      <div
                        className={`flex items-center ${status.color} ${status.pulse ? "animate-pulse" : ""}`}
                      >
                        <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
                        {service.availability}
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-cyan-400 hover:bg-cyan-500/20 text-xs"
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header with Live Updates */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">
              🛠️ Ritual Technology Services
            </h2>
            <p className="text-gray-400 mt-2">
              Consciousness-informed technology solutions for the regenerative
              future
            </p>
          </div>

          {showBooking && (
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
              onClick={() =>
                window.open(
                  "mailto:ritual@civica144.com?subject=Service Consultation Request",
                  "_blank",
                )
              }
            >
              <Mail className="w-5 h-5 mr-2" />
              Book Consultation
            </Button>
          )}
        </div>

        {/* Service Updates from Intelligence Layer */}
        {serviceUpdates.length > 0 && (
          <Card className="bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border-purple-400/30 backdrop-blur-md">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-purple-400" />
                <span className="text-purple-400 font-semibold">
                  Live Service Updates
                </span>
                <Badge
                  variant="secondary"
                  className="bg-purple-500/20 text-purple-300"
                >
                  {serviceUpdates.length} Updates
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid md:grid-cols-3 gap-4">
                {serviceUpdates.map((update, index) => (
                  <motion.div
                    key={update.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg bg-black/20 border border-purple-500/20"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-semibold text-white">
                        {update.title}
                      </h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getUrgencyColor(update.urgency)}`}
                      >
                        {update.urgency}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-300 mb-3">
                      {update.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-purple-300">{update.pricing}</span>
                      <span className="text-gray-400">
                        {update.availableSlots} slots
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Services Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {displayServices.map((service, index) => {
          const IconComponent = service.icon;
          const status = getAvailabilityStatus(service.availability);

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-md hover:border-cyan-500/50 transition-all h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-r ${service.color}`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white">
                          {service.title}
                        </CardTitle>
                        <p className="text-gray-400">{service.subtitle}</p>
                      </div>
                    </div>

                    {service.featured && (
                      <Badge className="bg-yellow-500 text-black">
                        <Star className="w-4 h-4 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  <p className="text-gray-300">{service.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Service Metrics */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-cyan-400 font-semibold">
                        {service.pricing}
                      </div>
                      <div className="text-xs text-gray-400">Investment</div>
                    </div>
                    <div>
                      <div className="text-cyan-400 font-semibold">
                        {service.duration}
                      </div>
                      <div className="text-xs text-gray-400">Timeline</div>
                    </div>
                    <div>
                      <div
                        className={`font-semibold ${status.color} ${status.pulse ? "animate-pulse" : ""}`}
                      >
                        {service.availability.split(" - ")[0]}
                      </div>
                      <div className="text-xs text-gray-400">Availability</div>
                    </div>
                  </div>

                  {/* Features & Outcomes */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">
                        Key Features
                      </h4>
                      <ul className="space-y-1">
                        {service.features.slice(0, 3).map((feature, i) => (
                          <li
                            key={i}
                            className="text-xs text-gray-300 flex items-center"
                          >
                            <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">
                        Expected Outcomes
                      </h4>
                      <ul className="space-y-1">
                        {service.outcomes.slice(0, 3).map((outcome, i) => (
                          <li
                            key={i}
                            className="text-xs text-gray-300 flex items-center"
                          >
                            <Target className="w-3 h-3 text-cyan-400 mr-2 flex-shrink-0" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-black/20 p-4 rounded-lg border border-gray-700/30">
                    <p className="text-sm text-gray-300 italic mb-2">
                      "{service.testimonial.text}"
                    </p>
                    <p className="text-xs text-gray-400">
                      — {service.testimonial.author}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4">
                    <Button
                      variant="outline"
                      className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20"
                      onClick={() => setSelectedService(service.id)}
                    >
                      Learn More
                      <BookOpen className="w-4 h-4 ml-2" />
                    </Button>

                    <Button
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                      onClick={() =>
                        window.open(
                          `mailto:ritual@civica144.com?subject=Consultation: ${service.title}`,
                          "_blank",
                        )
                      }
                    >
                      Start Consultation
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceExposureHub;
