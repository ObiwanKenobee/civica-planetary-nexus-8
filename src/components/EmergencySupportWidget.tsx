import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MessageCircle,
  AlertTriangle,
  Clock,
  X,
  ChevronUp,
  ChevronDown,
  Heart,
  Shield,
  Zap,
  ExternalLink,
  Calendar,
  User,
  MapPin,
} from "lucide-react";

interface EmergencySupportWidgetProps {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  variant?: "minimal" | "expanded" | "floating";
  className?: string;
}

const EmergencySupportWidget: React.FC<EmergencySupportWidgetProps> = ({
  position = "bottom-right",
  variant = "floating",
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [supportType, setSupportType] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getPositionClasses = () => {
    switch (position) {
      case "bottom-left":
        return "bottom-4 left-4";
      case "top-right":
        return "top-4 right-4";
      case "top-left":
        return "top-4 left-4";
      default:
        return "bottom-4 right-4";
    }
  };

  const supportOptions = [
    {
      id: "emergency",
      title: "Emergency Technical Support",
      description: "Critical system issues requiring immediate attention",
      icon: AlertTriangle,
      color: "text-red-400",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/30",
      action: () => window.open("tel:+1-555-EMERGENCY", "_blank"),
      available: true,
      responseTime: "< 15 minutes",
    },
    {
      id: "consultation",
      title: "Sacred Technology Consultation",
      description: "Expert guidance on consciousness-informed solutions",
      icon: Zap,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20",
      borderColor: "border-cyan-500/30",
      action: () =>
        window.open(
          "mailto:ritual@civica144.com?subject=Urgent Consultation Request",
          "_blank",
        ),
      available: true,
      responseTime: "< 1 hour",
    },
    {
      id: "guardian",
      title: "Guardian Intelligence Support",
      description: "AI ethics and security guidance",
      icon: Shield,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/30",
      action: () =>
        window.open(
          "mailto:guardian@civica144.com?subject=Guardian Support Request",
          "_blank",
        ),
      available: isOnline,
      responseTime: "< 30 minutes",
    },
    {
      id: "community",
      title: "Community Wisdom Circle",
      description: "Connect with collective intelligence network",
      icon: Heart,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30",
      action: () => window.open("https://discord.gg/civica144", "_blank"),
      available: true,
      responseTime: "Real-time",
    },
  ];

  const getAvailabilityStatus = () => {
    const hour = currentTime.getHours();
    const isBusinessHours = hour >= 8 && hour <= 18;

    return {
      status: isBusinessHours ? "online" : "after-hours",
      text: isBusinessHours ? "Support Available" : "After Hours Support",
      color: isBusinessHours ? "text-green-400" : "text-yellow-400",
    };
  };

  const availability = getAvailabilityStatus();

  if (variant === "minimal") {
    return (
      <div className={`${className}`}>
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-lg"
          size="sm"
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          Support
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed ${getPositionClasses()} z-40 ${className}`}>
      <AnimatePresence>
        {!isExpanded ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {/* Floating Support Button */}
            <Button
              onClick={() => setIsExpanded(true)}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-lg border-2 border-white/20 backdrop-blur-sm relative"
            >
              <div className="absolute -top-1 -right-1">
                <div
                  className={`w-3 h-3 rounded-full animate-pulse ${
                    availability.status === "online"
                      ? "bg-green-400"
                      : "bg-yellow-400"
                  }`}
                ></div>
              </div>
              <AlertTriangle className="w-6 h-6 text-white" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="w-80 max-h-[80vh] overflow-hidden"
          >
            <Card className="bg-black/90 border-red-500/30 backdrop-blur-md shadow-2xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-red-400 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Emergency Support
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge
                        variant="outline"
                        className={`${availability.color} border-current`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            availability.status === "online"
                              ? "bg-green-400"
                              : "bg-yellow-400"
                          } animate-pulse`}
                        ></div>
                        {availability.text}
                      </Badge>
                      <span className="text-xs text-gray-400">
                        {currentTime.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {/* Support Options */}
                <div className="space-y-3">
                  {supportOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <motion.div
                        key={option.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.1 * supportOptions.indexOf(option),
                        }}
                      >
                        <Card
                          className={`${option.bgColor} ${option.borderColor} border cursor-pointer hover:bg-opacity-30 transition-all ${
                            !option.available ? "opacity-50" : ""
                          }`}
                          onClick={option.available ? option.action : undefined}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-lg bg-black/20`}>
                                <IconComponent
                                  className={`w-5 h-5 ${option.color}`}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-white font-semibold text-sm leading-tight">
                                  {option.title}
                                </h4>
                                <p className="text-gray-300 text-xs mt-1 leading-relaxed">
                                  {option.description}
                                </p>
                                <div className="flex items-center justify-between mt-2">
                                  <Badge
                                    variant="outline"
                                    className={`text-xs ${option.color} border-current`}
                                  >
                                    {option.responseTime}
                                  </Badge>
                                  {option.available ? (
                                    <div className="text-green-400 text-xs flex items-center">
                                      <div className="w-2 h-2 rounded-full bg-green-400 mr-1 animate-pulse"></div>
                                      Available
                                    </div>
                                  ) : (
                                    <div className="text-gray-400 text-xs">
                                      Offline
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Quick Contact Form */}
                <div className="border-t border-white/10 pt-4">
                  <h4 className="text-white font-semibold text-sm mb-3">
                    Quick Contact
                  </h4>
                  <div className="space-y-2">
                    <Button
                      onClick={() =>
                        window.open(
                          "mailto:emergency@civica144.com?subject=Urgent Support Request",
                          "_blank",
                        )
                      }
                      variant="outline"
                      className="w-full justify-start border-red-500/30 text-red-400 hover:bg-red-500/20"
                      size="sm"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      emergency@civica144.com
                    </Button>
                    <Button
                      onClick={() =>
                        window.open("tel:+1-555-CIVICA-EMERGENCY", "_blank")
                      }
                      variant="outline"
                      className="w-full justify-start border-orange-500/30 text-orange-400 hover:bg-orange-500/20"
                      size="sm"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      +1 (555) CIVICA-EMERGENCY
                    </Button>
                  </div>
                </div>

                {/* System Status */}
                <div className="border-t border-white/10 pt-4">
                  <h4 className="text-white font-semibold text-sm mb-3">
                    System Status
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Portal</span>
                      <Badge
                        variant="outline"
                        className="text-green-400 border-green-400"
                      >
                        Online
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Intelligence</span>
                      <Badge
                        variant="outline"
                        className="text-green-400 border-green-400"
                      >
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Guardian</span>
                      <Badge
                        variant="outline"
                        className="text-cyan-400 border-cyan-400"
                      >
                        Monitoring
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Support</span>
                      <Badge
                        variant="outline"
                        className={`${availability.color} border-current`}
                      >
                        {availability.status === "online"
                          ? "Available"
                          : "After Hours"}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Emergency Protocols */}
                <div className="border-t border-white/10 pt-4">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <h4 className="text-red-400 font-semibold text-sm mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Emergency Protocols
                    </h4>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>• Critical system failures: Call immediately</li>
                      <li>• Security breaches: Email guardian@civica144.com</li>
                      <li>• Ethical concerns: Community wisdom circle</li>
                      <li>• Technical guidance: Book consultation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmergencySupportWidget;
