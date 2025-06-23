import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Play,
  Crown,
  Zap,
  Brain,
  Shield,
  Users,
  BookOpen,
  Heart,
  Globe,
  Star,
  ArrowRight,
  Mail,
  Phone,
  Calendar,
  ExternalLink,
  Settings,
  Bell,
} from "lucide-react";
import GlyphLogo from "./navigation/GlyphLogo";

interface MobileNavigationDrawerProps {
  isAuthenticated?: boolean;
  userRole?: string;
  className?: string;
}

const MobileNavigationDrawer: React.FC<MobileNavigationDrawerProps> = ({
  isAuthenticated = false,
  userRole,
  className = "",
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const mainNavigationItems = [
    {
      id: "auth",
      label: isAuthenticated ? "Dashboard" : "Enter Portal",
      icon: Play,
      route: isAuthenticated ? "/dashboard" : "/auth",
      color: "from-cyan-500 to-purple-500",
      primary: true,
    },
    {
      id: "services",
      label: "Ritual Technology",
      icon: Zap,
      route: "/ritual-technologist",
      color: "from-amber-500 to-orange-500",
      badge: "🛠️",
    },
    {
      id: "guardian",
      label: "Guardian Intelligence",
      icon: Shield,
      route: "/guardian",
      color: "from-cyan-500 to-blue-500",
      badge: "🧬",
    },
    {
      id: "intelligence",
      label: "Intelligence Hub",
      icon: Brain,
      route: "/intelligence",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "community",
      label: "Community",
      icon: Users,
      route: "/community",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const quickActions = [
    {
      id: "consultation",
      label: "Book Consultation",
      icon: Calendar,
      action: () =>
        window.open(
          "mailto:ritual@civica144.com?subject=Consultation Request",
          "_blank",
        ),
      color: "text-cyan-400",
    },
    {
      id: "emergency",
      label: "Emergency Support",
      icon: Phone,
      action: () => window.open("tel:+1-555-CIVICA", "_blank"),
      color: "text-red-400",
    },
    {
      id: "newsletter",
      label: "Intelligence Feed",
      icon: Bell,
      action: () => navigate("/intelligence"),
      color: "text-purple-400",
    },
  ];

  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Trigger */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className={`lg:hidden p-2 text-white hover:bg-white/10 ${className}`}
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
            onClick={closeDrawer}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-80 h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-black/20 backdrop-blur-md border-b border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <GlyphLogo
                      variant={userRole || "base"}
                      size={32}
                      energyLevel={0.7}
                      interactive={false}
                    />
                    <div>
                      <h2 className="text-lg font-bold text-cyan-400">
                        CIVICA 144
                      </h2>
                      <p className="text-xs text-gray-400">
                        Sacred Technology Portal
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeDrawer}
                    className="text-white hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* User Status */}
              {isAuthenticated && (
                <div className="p-4 border-b border-white/10">
                  <Card className="bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border-cyan-400/30">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            {userRole?.charAt(0).toUpperCase() || "U"}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">
                            Sacred Steward
                          </p>
                          <p className="text-cyan-400 text-xs capitalize">
                            {userRole || "Visitor"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Main Navigation */}
              <div className="p-4">
                <h3 className="text-gray-400 text-sm font-semibold mb-3 uppercase tracking-wider">
                  Navigation
                </h3>
                <div className="space-y-2">
                  {mainNavigationItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Button
                        key={item.id}
                        onClick={() => {
                          navigate(item.route);
                          closeDrawer();
                        }}
                        className={`w-full justify-start h-12 ${
                          item.primary
                            ? `bg-gradient-to-r ${item.color} text-white hover:opacity-90`
                            : "bg-white/5 text-white hover:bg-white/10"
                        }`}
                        variant={item.primary ? "default" : "ghost"}
                      >
                        <div className="flex items-center space-x-3 w-full">
                          <div
                            className={`p-1.5 rounded-lg ${
                              item.primary ? "bg-white/20" : "bg-white/10"
                            }`}
                          >
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <span className="flex-1 text-left">{item.label}</span>
                          {item.badge && (
                            <span className="text-sm">{item.badge}</span>
                          )}
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-4 border-t border-white/10">
                <h3 className="text-gray-400 text-sm font-semibold mb-3 uppercase tracking-wider">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  {quickActions.map((action) => {
                    const IconComponent = action.icon;
                    return (
                      <Button
                        key={action.id}
                        onClick={() => {
                          action.action();
                          closeDrawer();
                        }}
                        variant="ghost"
                        className="w-full justify-start h-10 text-white hover:bg-white/5"
                      >
                        <IconComponent
                          className={`w-4 h-4 mr-3 ${action.color}`}
                        />
                        <span className="text-sm">{action.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Featured Service Spotlight */}
              <div className="p-4 border-t border-white/10">
                <h3 className="text-gray-400 text-sm font-semibold mb-3 uppercase tracking-wider">
                  Featured
                </h3>
                <Card className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30">
                  <CardContent className="p-3">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">🛠️</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-amber-400 font-semibold text-sm">
                          Sacred Technology Services
                        </h4>
                        <p className="text-gray-300 text-xs leading-relaxed mt-1">
                          Consciousness-informed solutions for regenerative
                          business transformation
                        </p>
                        <Button
                          onClick={() => {
                            navigate("/ritual-technologist");
                            closeDrawer();
                          }}
                          size="sm"
                          className="w-full mt-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90"
                        >
                          Learn More
                          <ArrowRight className="w-3 h-3 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sacred Timing */}
              <div className="p-4 border-t border-white/10">
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-400 text-xs">Sacred Timing</span>
                  </div>
                  <p className="text-cyan-400 text-sm">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-gray-400 text-xs">
                    Portal alignment optimal
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/10 bg-black/20">
                <div className="text-center space-y-2">
                  <p className="text-gray-400 text-xs">
                    Sacred Technology in Service of All Life
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigate("/privacy");
                        closeDrawer();
                      }}
                      className="text-xs text-gray-400 hover:text-white"
                    >
                      Privacy
                    </Button>
                    <span>•</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigate("/terms");
                        closeDrawer();
                      }}
                      className="text-xs text-gray-400 hover:text-white"
                    >
                      Terms
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavigationDrawer;
