import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Lock,
  Star,
  CreditCard,
  Sparkles,
  Crown,
  Zap,
  Heart,
  ArrowRight,
  Gift,
  CheckCircle,
  AlertTriangle,
  Globe,
} from "lucide-react";
import { useBilling } from "@/hooks/useBilling";
import { useSacredAuth } from "@/hooks/useSacredAuth";

interface PaymentGateProps {
  children: React.ReactNode;
  requiredPlan?: string;
  requiredPayment?: boolean;
  featureName: string;
  featureDescription: string;
  featureIcon?: React.ElementType;
  allowPreview?: boolean;
  previewDuration?: number; // seconds
}

interface PlanInfo {
  id: string;
  name: string;
  price: number;
  currency: string;
  features: string[];
  popular?: boolean;
  color: string;
}

const PLAN_HIERARCHY = [
  "civic_explorer",
  "co_creator",
  "cluster_steward",
  "intelligence_architect",
];

const PLAN_INFO: Record<string, PlanInfo> = {
  civic_explorer: {
    id: "civic_explorer",
    name: "Civic Explorer",
    price: 144,
    currency: "USD",
    features: [
      "Dashboard Access",
      "Basic Intelligence Clusters",
      "Community Forums",
    ],
    color: "from-green-400 to-emerald-500",
  },
  co_creator: {
    id: "co_creator",
    name: "Co-Creator",
    price: 288,
    currency: "USD",
    features: [
      "Everything in Explorer",
      "SignalTemple Access",
      "Ritual Design Tools",
      "Sacred Commerce",
    ],
    popular: true,
    color: "from-purple-400 to-pink-500",
  },
  cluster_steward: {
    id: "cluster_steward",
    name: "Cluster Steward",
    price: 555,
    currency: "USD",
    features: [
      "Everything in Co-Creator",
      "Guardian Intelligence",
      "Advanced Analytics",
      "Regional Stewardship",
    ],
    color: "from-cyan-400 to-blue-500",
  },
  intelligence_architect: {
    id: "intelligence_architect",
    name: "Intelligence Architect",
    price: 888,
    currency: "USD",
    features: [
      "Everything in Steward",
      "Full Security Center",
      "XDR Access",
      "Platform Architecture",
    ],
    color: "from-amber-400 to-orange-500",
  },
};

export function PaymentGatedAccess({
  children,
  requiredPlan,
  requiredPayment = false,
  featureName,
  featureDescription,
  featureIcon: FeatureIcon = Lock,
  allowPreview = false,
  previewDuration = 30,
}: PaymentGateProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useSacredAuth();
  const { currentPlan, upgradePlan, isLoading } = useBilling();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [previewTimeLeft, setPreviewTimeLeft] = useState(previewDuration);
  const [hasTriggeredPreview, setHasTriggeredPreview] = useState(false);

  // Check if user has required access
  const hasAccess = () => {
    if (!isAuthenticated) return false;
    if (!requiredPayment && !requiredPlan) return true;
    if (!currentPlan) return false;

    if (requiredPlan) {
      const currentIndex = PLAN_HIERARCHY.indexOf(currentPlan.id);
      const requiredIndex = PLAN_HIERARCHY.indexOf(requiredPlan);
      return currentIndex >= requiredIndex;
    }

    return true;
  };

  // Preview timer effect
  useEffect(() => {
    if (isPreviewMode && previewTimeLeft > 0) {
      const timer = setTimeout(() => {
        setPreviewTimeLeft(previewTimeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isPreviewMode && previewTimeLeft === 0) {
      setIsPreviewMode(false);
      setShowPaymentModal(true);
    }
  }, [isPreviewMode, previewTimeLeft]);

  // Auto-show payment modal if access is required
  useEffect(() => {
    if (!hasAccess() && !hasTriggeredPreview && !allowPreview) {
      setShowPaymentModal(true);
      setHasTriggeredPreview(true);
    }
  }, [hasAccess(), hasTriggeredPreview, allowPreview]);

  const startPreview = () => {
    setIsPreviewMode(true);
    setPreviewTimeLeft(previewDuration);
    setShowPaymentModal(false);
  };

  const getRequiredPlanInfo = (): PlanInfo | null => {
    return requiredPlan ? PLAN_INFO[requiredPlan] : null;
  };

  const getUpgradePlans = (): PlanInfo[] => {
    if (!requiredPlan) return [];
    const requiredIndex = PLAN_HIERARCHY.indexOf(requiredPlan);
    return PLAN_HIERARCHY.slice(requiredIndex).map(
      (planId) => PLAN_INFO[planId],
    );
  };

  const handleUpgrade = async (planId: string) => {
    try {
      await upgradePlan(planId);
      setShowPaymentModal(false);
    } catch (error) {
      console.error("Upgrade failed:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // If user has access, render children normally
  if (hasAccess() && !isPreviewMode) {
    return <>{children}</>;
  }

  // If in preview mode, render with overlay
  if (isPreviewMode) {
    return (
      <div className="relative">
        {children}

        {/* Preview Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-4 right-4 z-50"
        >
          <Card className="bg-black/80 backdrop-blur-md border border-amber-400/50">
            <CardContent className="p-3">
              <div className="flex items-center space-x-2 text-amber-400">
                <Gift className="w-4 h-4" />
                <span className="text-sm font-medium">Preview Mode</span>
                <Badge className="bg-amber-500 text-black text-xs">
                  {formatTime(previewTimeLeft)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Preview Warning */}
        {previewTimeLeft <= 10 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <Card className="bg-red-500/90 backdrop-blur-md border border-red-400">
              <CardContent className="p-4 text-center">
                <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-white" />
                <p className="text-white font-medium">
                  Preview ending in {formatTime(previewTimeLeft)}
                </p>
                <Button
                  onClick={() => setShowPaymentModal(true)}
                  className="mt-2 bg-white text-red-500 hover:bg-gray-100"
                  size="sm"
                >
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    );
  }

  // If no access, show payment gate
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full text-center space-y-8"
      >
        {/* Feature Icon */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
            <FeatureIcon className="w-12 h-12 text-cyan-400" />
          </div>
          <Lock className="w-6 h-6 absolute -bottom-1 -right-1 text-red-400 bg-black rounded-full p-1" />
        </div>

        {/* Feature Info */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">{featureName}</h1>
          <p className="text-xl text-gray-300 max-w-lg mx-auto">
            {featureDescription}
          </p>

          {requiredPlan && (
            <div className="inline-block">
              <Badge
                className={`bg-gradient-to-r ${PLAN_INFO[requiredPlan]?.color} text-white px-4 py-2 text-sm`}
              >
                Requires {PLAN_INFO[requiredPlan]?.name}
              </Badge>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          {!isAuthenticated ? (
            <Button
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3"
              size="lg"
            >
              <Globe className="w-5 h-5 mr-2" />
              Enter Sacred Portal
            </Button>
          ) : (
            <>
              <Button
                onClick={() => setShowPaymentModal(true)}
                className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-8 py-3"
                size="lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Upgrade Access
              </Button>

              {allowPreview && !hasTriggeredPreview && (
                <Button
                  onClick={startPreview}
                  variant="outline"
                  className="border-amber-400 text-amber-400 hover:bg-amber-400/20 px-8 py-3"
                  size="lg"
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Free Preview ({previewDuration}s)
                </Button>
              )}
            </>
          )}
        </div>

        {/* Current Plan Info */}
        {currentPlan && (
          <div className="p-4 bg-black/30 rounded-lg border border-white/20">
            <p className="text-gray-400 text-sm">Current Plan</p>
            <div className="flex items-center justify-center space-x-2 mt-1">
              <Badge
                className={`bg-gradient-to-r ${PLAN_INFO[currentPlan.id]?.color} text-white`}
              >
                {PLAN_INFO[currentPlan.id]?.name}
              </Badge>
              <span className="text-white">→</span>
              <span className="text-cyan-400">Upgrade Available</span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="bg-black/90 border border-white/20 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-cyan-400 text-center">
              🌟 Upgrade Your Sacred Access
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Feature Preview */}
            <div className="text-center p-6 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg border border-purple-500/30">
              <FeatureIcon className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
              <h3 className="text-xl font-bold mb-2">{featureName}</h3>
              <p className="text-gray-300">{featureDescription}</p>
            </div>

            {/* Available Plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getUpgradePlans().map((plan) => (
                <Card
                  key={plan.id}
                  className={`bg-gradient-to-br ${plan.color}/10 border ${plan.color.split(" ")[0]}/30 hover:scale-105 transition-transform ${
                    plan.popular ? "ring-2 ring-purple-500" : ""
                  }`}
                >
                  <CardHeader className="text-center">
                    {plan.popular && (
                      <Badge className="mx-auto mb-2 bg-purple-500 text-white">
                        Most Popular
                      </Badge>
                    )}
                    <CardTitle className="text-white">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-cyan-400">
                      ${plan.price}
                      <span className="text-sm text-gray-400">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => handleUpgrade(plan.id)}
                      disabled={isLoading}
                      className={`w-full bg-gradient-to-r ${plan.color} text-white`}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      {isLoading ? "Processing..." : "Choose Plan"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Alternative Actions */}
            <div className="flex justify-center space-x-4 pt-4 border-t border-white/20">
              <Button
                onClick={() => navigate("/billing")}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                View All Plans
              </Button>

              {allowPreview && !isPreviewMode && (
                <Button
                  onClick={startPreview}
                  variant="outline"
                  className="border-amber-400 text-amber-400 hover:bg-amber-400/20"
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Try Preview
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PaymentGatedAccess;
