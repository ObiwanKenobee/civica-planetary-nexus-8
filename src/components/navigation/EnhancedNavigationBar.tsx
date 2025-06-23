import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Home,
  Users,
  CreditCard,
  Shield,
  Settings,
  Globe,
  Crown,
  Zap,
  Heart,
  Brain,
  Menu,
  X,
  Lock,
  Star,
  ArrowRight,
  Sparkles,
  Navigation,
  Map,
} from "lucide-react";
import { useSacredAuth } from "@/hooks/useSacredAuth";
import { useBilling } from "@/hooks/useBilling";

interface NavigationItem {
  id: string;
  name: string;
  path: string;
  icon: React.ElementType;
  description: string;
  requiresAuth: boolean;
  requiresPayment: boolean;
  planRequired?: string;
  badge?: string;
  badgeColor?: string;
}

const navigationItems: NavigationItem[] = [
  {
    id: "home",
    name: "Sacred Portal",
    path: "/",
    icon: Home,
    description: "Return to the cosmic landing portal",
    requiresAuth: false,
    requiresPayment: false,
  },
  {
    id: "dashboard",
    name: "Dashboard",
    path: "/dashboard",
    icon: Globe,
    description: "Your personalized intelligence nexus",
    requiresAuth: true,
    requiresPayment: false,
  },
  {
    id: "billing",
    name: "Sacred Commerce",
    path: "/billing",
    icon: CreditCard,
    description: "Manage your spiritual investment & access",
    requiresAuth: true,
    requiresPayment: false,
    badge: "Payment Hub",
    badgeColor: "bg-green-500",
  },
  {
    id: "ritual-tech",
    name: "Ritual Technology",
    path: "/ritual-technologist",
    icon: Zap,
    description: "Sacred business transformation services",
    requiresAuth: false,
    requiresPayment: false,
    badge: "Services",
    badgeColor: "bg-amber-500",
  },
  {
    id: "signal-temple",
    name: "SignalTemple",
    path: "/signal-temple",
    icon: Heart,
    description: "Sacred communication & subscription platform",
    requiresAuth: true,
    requiresPayment: true,
    planRequired: "co_creator",
    badge: "Premium",
    badgeColor: "bg-purple-500",
  },
  {
    id: "guardian",
    name: "Guardian Intelligence",
    path: "/guardian",
    icon: Shield,
    description: "Sacred oversight & moral operating system",
    requiresAuth: true,
    requiresPayment: true,
    planRequired: "cluster_steward",
    badge: "Elite",
    badgeColor: "bg-cyan-500",
  },
  {
    id: "security",
    name: "Security Center",
    path: "/security",
    icon: Brain,
    description: "Cisco XDR security monitoring & protection",
    requiresAuth: true,
    requiresPayment: true,
    planRequired: "intelligence_architect",
    badge: "Advanced",
    badgeColor: "bg-red-500",
  },
];

interface EnhancedNavigationBarProps {
  variant?: "floating" | "embedded" | "mobile";
  showLabels?: boolean;
  compact?: boolean;
}

export function EnhancedNavigationBar({
  variant = "floating",
  showLabels = true,
  compact = false,
}: EnhancedNavigationBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useSacredAuth();
  const { currentPlan, upgradePlan } = useBilling();

  const [isOpen, setIsOpen] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<NavigationItem | null>(null);

  const handleNavigation = (item: NavigationItem) => {
    // Check authentication requirement
    if (item.requiresAuth && !isAuthenticated) {
      navigate("/auth");
      return;
    }

    // Check payment requirement
    if (item.requiresPayment) {
      if (
        !currentPlan ||
        (item.planRequired && !checkPlanAccess(item.planRequired))
      ) {
        setSelectedItem(item);
        setShowPaymentModal(true);
        return;
      }
    }

    // Navigate to the page
    navigate(item.path);
    setIsOpen(false);
  };

  const checkPlanAccess = (requiredPlan: string): boolean => {
    if (!currentPlan) return false;

    const planHierarchy = [
      "civic_explorer",
      "co_creator",
      "cluster_steward",
      "intelligence_architect",
    ];
    const currentIndex = planHierarchy.indexOf(currentPlan.id);
    const requiredIndex = planHierarchy.indexOf(requiredPlan);

    return currentIndex >= requiredIndex;
  };

  const getRequiredPlanName = (planId: string): string => {
    const planNames = {
      civic_explorer: "Civic Explorer",
      co_creator: "Co-Creator",
      cluster_steward: "Cluster Steward",
      intelligence_architect: "Intelligence Architect",
    };
    return planNames[planId as keyof typeof planNames] || planId;
  };

  const isCurrentPath = (path: string) => location.pathname === path;

  if (variant === "mobile") {
    return (
      <>
        {/* Mobile Menu Button */}
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 bg-black/60 backdrop-blur-md border border-white/20"
          size="sm"
        >
          <Menu className="w-4 h-4" />
        </Button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                className="w-80 h-full bg-gradient-to-br from-slate-900 to-purple-900 p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-cyan-400">
                    Navigation Portal
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const hasAccess = !item.requiresAuth || isAuthenticated;
                    const canAccess =
                      !item.requiresPayment ||
                      (currentPlan &&
                        (!item.planRequired ||
                          checkPlanAccess(item.planRequired)));

                    return (
                      <Button
                        key={item.id}
                        onClick={() => handleNavigation(item)}
                        variant={isCurrentPath(item.path) ? "default" : "ghost"}
                        className={`w-full justify-start p-3 h-auto ${
                          isCurrentPath(item.path)
                            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                            : "text-white hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center space-x-3 w-full">
                          <Icon className="w-5 h-5" />
                          <div className="flex-1 text-left">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs opacity-70">
                              {item.description}
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-1">
                            {item.badge && (
                              <Badge
                                className={`text-xs ${item.badgeColor} text-white`}
                              >
                                {item.badge}
                              </Badge>
                            )}
                            {!hasAccess && (
                              <Lock className="w-3 h-3 text-red-400" />
                            )}
                            {hasAccess && !canAccess && (
                              <Star className="w-3 h-3 text-amber-400" />
                            )}
                          </div>
                        </div>
                      </Button>
                    );
                  })}
                </div>

                {/* User Status */}
                {isAuthenticated && (
                  <div className="mt-8 p-4 bg-black/30 rounded-lg">
                    <div className="text-sm text-cyan-400 mb-2">
                      Sacred Status
                    </div>
                    <div className="text-white font-medium">{user?.email}</div>
                    {currentPlan && (
                      <Badge className="mt-2 bg-purple-500">
                        {getRequiredPlanName(currentPlan.id)}
                      </Badge>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  if (variant === "floating") {
    return (
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40"
      >
        <Card className="bg-black/60 backdrop-blur-md border border-white/20">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              {navigationItems.slice(0, compact ? 4 : 6).map((item) => {
                const Icon = item.icon;
                const hasAccess = !item.requiresAuth || isAuthenticated;
                const canAccess =
                  !item.requiresPayment ||
                  (currentPlan &&
                    (!item.planRequired || checkPlanAccess(item.planRequired)));

                return (
                  <Button
                    key={item.id}
                    onClick={() => handleNavigation(item)}
                    variant="ghost"
                    size="sm"
                    className={`relative ${
                      isCurrentPath(item.path)
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "text-white hover:bg-white/10"
                    }`}
                    title={item.description}
                  >
                    <Icon className="w-4 h-4" />
                    {showLabels && (
                      <span className="ml-2 hidden sm:inline">{item.name}</span>
                    )}

                    {/* Access indicators */}
                    {!hasAccess && (
                      <Lock className="w-3 h-3 absolute -top-1 -right-1 text-red-400" />
                    )}
                    {hasAccess && !canAccess && (
                      <Star className="w-3 h-3 absolute -top-1 -right-1 text-amber-400" />
                    )}

                    {/* Badge */}
                    {item.badge && (
                      <Badge
                        className={`ml-2 text-xs ${item.badgeColor} text-white hidden lg:inline`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                );
              })}

              {/* More menu for additional items */}
              {navigationItems.length > 6 && (
                <Button
                  onClick={() => setIsOpen(true)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                >
                  <Navigation className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Embedded variant
  return (
    <div className="flex items-center space-x-4">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const hasAccess = !item.requiresAuth || isAuthenticated;
        const canAccess =
          !item.requiresPayment ||
          (currentPlan &&
            (!item.planRequired || checkPlanAccess(item.planRequired)));

        return (
          <Button
            key={item.id}
            onClick={() => handleNavigation(item)}
            variant={isCurrentPath(item.path) ? "default" : "outline"}
            className={`relative ${
              isCurrentPath(item.path)
                ? "bg-cyan-500 text-white"
                : "border-white/20 text-white hover:bg-white/10"
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {item.name}

            {!hasAccess && <Lock className="w-3 h-3 ml-2 text-red-400" />}
            {hasAccess && !canAccess && (
              <Star className="w-3 h-3 ml-2 text-amber-400" />
            )}
          </Button>
        );
      })}

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="bg-black/90 border border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-cyan-400">
              🔒 Premium Access Required
            </DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-6">
              <div className="text-center">
                <selectedItem.icon className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                <h3 className="text-xl font-bold mb-2">{selectedItem.name}</h3>
                <p className="text-gray-300">{selectedItem.description}</p>
              </div>

              {selectedItem.planRequired && (
                <div className="p-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg border border-purple-500/30">
                  <h4 className="font-bold text-purple-400 mb-2">
                    Required Plan
                  </h4>
                  <p className="text-white">
                    {getRequiredPlanName(selectedItem.planRequired)} or higher
                  </p>
                  <p className="text-sm text-gray-300 mt-2">
                    Upgrade your plan to access this sacred technology
                  </p>
                </div>
              )}

              <div className="flex space-x-3">
                <Button
                  onClick={() => {
                    navigate("/billing");
                    setShowPaymentModal(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Upgrade Plan
                </Button>
                <Button
                  onClick={() => setShowPaymentModal(false)}
                  variant="outline"
                  className="border-white/20 text-white"
                >
                  Later
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EnhancedNavigationBar;
