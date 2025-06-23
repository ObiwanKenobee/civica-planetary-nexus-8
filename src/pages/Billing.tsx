import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CreditCard,
  Sparkles,
  Globe,
  Heart,
  Zap,
  Crown,
  TrendingUp,
  Users,
  Shield,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Circle,
  Star,
  Gift,
  Coins,
  Settings,
  Lock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useBilling } from "@/hooks/useBilling";
import { useSacredAuth } from "@/hooks/useSacredAuth";
import { useCivica } from "@/contexts/CivicaContext";
import { useNavigate } from "react-router-dom";
import { BillingPlan } from "@/types/billing";
import SecurePaymentForm from "@/components/SecurePaymentForm";
import CivicaServicePortfolio from "@/components/billing/CivicaServicePortfolio";
import SacredPaymentTerms from "@/components/billing/SacredPaymentTerms";
import EnhancedNavigationBar from "@/components/navigation/EnhancedNavigationBar";

const Billing = () => {
  const navigate = useNavigate();
  const { user } = useSacredAuth();
  const { state: civicaState } = useCivica();
  const {
    currentPlan,
    availablePlans,
    flourishAccount,
    usageStats,
    billingHistory,
    upgradePlan,
    downgradePlan,
    redeemFlourish,
    generateFlourish,
    region,
  } = useBilling();

  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    currentPlan?.id || "",
  );
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [showFlourish, setShowFlourish] = useState(false);
  const [showSecurePayment, setShowSecurePayment] = useState(false);
  const [selectedPlanForPayment, setSelectedPlanForPayment] =
    useState<BillingPlan | null>(null);

  const planIcons: Record<string, any> = {
    civic_explorer: Globe,
    co_creator: Heart,
    cluster_steward: Crown,
    intelligence_architect: Zap,
    institutional: Shield,
  };

  const handlePlanSelect = async (planId: string) => {
    if (planId === currentPlan?.id) return;

    const selectedPlan = availablePlans.find((p) => p.id === planId);
    if (!selectedPlan) return;

    // If it's a paid plan, open secure payment form
    if (selectedPlan.basePrice > 0) {
      setSelectedPlanForPayment(selectedPlan);
      setShowSecurePayment(true);
    } else {
      // For free plans, upgrade directly
      setIsUpgrading(true);

      try {
        const success = await upgradePlan(planId);
        if (success) {
          setSelectedPlanId(planId);
          generateFlourish("billing_engagement", {
            wisdom: 5,
            service: 3,
            total: 8,
          });
        }
      } finally {
        setIsUpgrading(false);
      }
    }
  };

  const handleSecurePaymentSuccess = () => {
    setShowSecurePayment(false);
    setSelectedPlanForPayment(null);
    // Refresh billing data or show success message
    generateFlourish("secure_payment_completion", {
      wisdom: 15,
      service: 10,
      total: 25,
    });
  };

  const handleSecurePaymentCancel = () => {
    setShowSecurePayment(false);
    setSelectedPlanForPayment(null);
  };

  const getPlanPrice = (plan: BillingPlan) => {
    const regionalPricing = plan.regionalPricing.find(
      (p) => p.region === region,
    );
    const basePrice =
      plan.basePrice * (regionalPricing?.priceMultiplier || 1.0);
    return regionalPricing?.localPrice || basePrice;
  };

  const getPlanCurrency = (plan: BillingPlan) => {
    const regionalPricing = plan.regionalPricing.find(
      (p) => p.region === region,
    );
    return regionalPricing?.localCurrency || "USD";
  };

  const getRegionalDiscount = (plan: BillingPlan) => {
    const regionalPricing = plan.regionalPricing.find(
      (p) => p.region === region,
    );
    const discount = 1 - (regionalPricing?.priceMultiplier || 1.0);
    return discount > 0 ? Math.round(discount * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Cosmic Background */}
      <div className="fixed inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-white/20 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-cyan-400 hover:text-cyan-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to CIVICA
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Sacred Economy Portal
              </h1>
              <p className="text-sm text-gray-400">
                Honor abundance through conscious exchange
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge
              variant="secondary"
              className="bg-purple-500/20 text-purple-400"
            >
              Region: {region}
            </Badge>
            {currentPlan && (
              <Badge
                variant="secondary"
                className="bg-green-500/20 text-green-400"
              >
                Current: {currentPlan.name}
              </Badge>
            )}
            <Button
              variant="outline"
              onClick={() => setShowFlourish(!showFlourish)}
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/20"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {flourishAccount.balance.total} Flourish
            </Button>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-black/40 border border-white/20">
            <TabsTrigger
              value="services"
              className="data-[state=active]:bg-purple-500/50"
            >
              <Zap className="w-4 h-4 mr-2" />
              Services
            </TabsTrigger>
            <TabsTrigger
              value="plans"
              className="data-[state=active]:bg-purple-500/50"
            >
              <Crown className="w-4 h-4 mr-2" />
              Plans
            </TabsTrigger>
            <TabsTrigger
              value="flourish"
              className="data-[state=active]:bg-cyan-500/50"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Flourish
            </TabsTrigger>
            <TabsTrigger
              value="usage"
              className="data-[state=active]:bg-green-500/50"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Usage
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-orange-500/50"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger
              value="terms"
              className="data-[state=active]:bg-blue-500/50"
            >
              <Shield className="w-4 h-4 mr-2" />
              Terms
            </TabsTrigger>
          </TabsList>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <CivicaServicePortfolio />
          </TabsContent>

          {/* Plans Tab */}
          <TabsContent value="plans" className="space-y-6">
            {/* Current Plan Status */}
            {currentPlan && (
              <Card className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-white/20 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-cyan-400">
                    {(() => {
                      const Icon = planIcons[currentPlan.id] || Crown;
                      return <Icon className="w-5 h-5" />;
                    })()}
                    <span>Your Sacred Path: {currentPlan.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    {currentPlan.description}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-400">
                        ${getPlanPrice(currentPlan)}/
                        {getPlanCurrency(currentPlan)}
                      </div>
                      <div className="text-xs text-gray-400">
                        Monthly Investment
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-400">
                        {currentPlan.features.length}
                      </div>
                      <div className="text-xs text-gray-400">
                        Sacred Features
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-cyan-400">
                        {flourishAccount.generationRate}
                      </div>
                      <div className="text-xs text-gray-400">
                        Flourish/Month
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-orange-400">
                        {currentPlan.sacredPerks.length}
                      </div>
                      <div className="text-xs text-gray-400">Sacred Perks</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Plan Selection */}
            <div className="grid lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {availablePlans.map((plan) => {
                const Icon = planIcons[plan.id] || Crown;
                const isCurrentPlan = plan.id === currentPlan?.id;
                const regionalDiscount = getRegionalDiscount(plan);

                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    className={`relative`}
                  >
                    <Card
                      className={`h-full transition-all duration-300 ${
                        isCurrentPlan
                          ? "bg-gradient-to-br from-purple-500/30 to-cyan-500/30 border-cyan-400 ring-2 ring-cyan-400/50"
                          : plan.popular
                            ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/50"
                            : "bg-black/40 border-white/20 hover:border-white/40"
                      } backdrop-blur-md`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                            <Star className="w-3 h-3 mr-1" />
                            Most Sacred
                          </Badge>
                        </div>
                      )}

                      {regionalDiscount > 0 && (
                        <div className="absolute -top-3 right-4">
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500">
                            {regionalDiscount}% off
                          </Badge>
                        </div>
                      )}

                      <CardHeader className="text-center">
                        <div
                          className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-white">
                          {plan.name}
                        </CardTitle>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-cyan-400">
                            {plan.basePrice === 0
                              ? "Free"
                              : `$${getPlanPrice(plan)}`}
                          </div>
                          {plan.basePrice > 0 && (
                            <div className="text-sm text-gray-400">
                              {getPlanCurrency(plan)} per month
                            </div>
                          )}
                          {plan.basePrice !== getPlanPrice(plan) && (
                            <div className="text-xs text-green-400">
                              (Originally ${plan.basePrice})
                            </div>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-sm text-gray-300 text-center">
                          {plan.description}
                        </p>

                        {/* Key Features */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-cyan-400 text-sm">
                            Sacred Features:
                          </h4>
                          <div className="space-y-1">
                            {plan.features.slice(0, 4).map((feature) => (
                              <div
                                key={feature.id}
                                className="flex items-center space-x-2 text-xs"
                              >
                                <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                                <span className="text-gray-300">
                                  {feature.name}
                                </span>
                                {typeof feature.included === "number" && (
                                  <Badge variant="outline" className="text-xs">
                                    {feature.included}
                                  </Badge>
                                )}
                              </div>
                            ))}
                            {plan.features.length > 4 && (
                              <div className="text-xs text-gray-400">
                                +{plan.features.length - 4} more features...
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Sacred Perks */}
                        {plan.sacredPerks.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-purple-400 text-sm">
                              Sacred Perks:
                            </h4>
                            <div className="space-y-1">
                              {plan.sacredPerks
                                .slice(0, 2)
                                .map((perk, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center space-x-2 text-xs"
                                  >
                                    <Sparkles className="w-3 h-3 text-purple-400 flex-shrink-0" />
                                    <span className="text-gray-300">
                                      {perk}
                                    </span>
                                  </div>
                                ))}
                              {plan.sacredPerks.length > 2 && (
                                <div className="text-xs text-gray-400">
                                  +{plan.sacredPerks.length - 2} more perks...
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Flourish Benefits */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-green-400 text-sm">
                            Flourish Benefits:
                          </h4>
                          {plan.flourishBenefits.map((benefit, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2 text-xs"
                            >
                              <Coins className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                              <span className="text-gray-300">
                                {benefit.description}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Action Button */}
                        <Button
                          onClick={() => handlePlanSelect(plan.id)}
                          disabled={isCurrentPlan || isUpgrading}
                          className={`w-full mt-4 ${
                            isCurrentPlan
                              ? "bg-gray-600 cursor-not-allowed"
                              : plan.popular
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                                : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                          }`}
                        >
                          {isCurrentPlan ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Current Path
                            </>
                          ) : isUpgrading ? (
                            "Ascending..."
                          ) : plan.basePrice === 0 ? (
                            "Begin Sacred Journey"
                          ) : (
                            <>
                              <Lock className="w-4 h-4 mr-2" />
                              Secure Ascend to {plan.name}
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Global Justice Pricing Notice */}
            <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/20 backdrop-blur-md">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Globe className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-green-400 mb-2">
                      Global Justice Pricing
                    </h3>
                    <p className="text-gray-300 text-sm mb-3">
                      CIVICA honors economic realities across all bioregions.
                      Our pricing adapts to local purchasing power, ensuring
                      sacred technology serves all beings regardless of
                      geographic location.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="bg-black/20 rounded-lg p-3">
                        <div className="font-semibold text-white">
                          Global South
                        </div>
                        <div className="text-green-400">75% discount</div>
                        <div className="text-gray-400">
                          Supporting emerging consciousness
                        </div>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <div className="font-semibold text-white">
                          Emerging Economies
                        </div>
                        <div className="text-yellow-400">40% discount</div>
                        <div className="text-gray-400">
                          Bridging economic transitions
                        </div>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3">
                        <div className="font-semibold text-white">
                          Indigenous Communities
                        </div>
                        <div className="text-purple-400">90% discount</div>
                        <div className="text-gray-400">
                          Honoring ancestral wisdom
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Flourish Economy Tab */}
          <TabsContent value="flourish" className="space-y-6">
            {/* Flourish Balance */}
            <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-yellow-400">
                  <Sparkles className="w-5 h-5" />
                  <span>Sacred Flourish Wallet</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
                  <div className="bg-black/20 rounded-lg p-3">
                    <div className="text-lg font-bold text-blue-400">
                      {flourishAccount.balance.wisdom}
                    </div>
                    <div className="text-xs text-gray-400">Wisdom</div>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <div className="text-lg font-bold text-green-400">
                      {flourishAccount.balance.regeneration}
                    </div>
                    <div className="text-xs text-gray-400">Regeneration</div>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <div className="text-lg font-bold text-purple-400">
                      {flourishAccount.balance.harmony}
                    </div>
                    <div className="text-xs text-gray-400">Harmony</div>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <div className="text-lg font-bold text-pink-400">
                      {flourishAccount.balance.creativity}
                    </div>
                    <div className="text-xs text-gray-400">Creativity</div>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <div className="text-lg font-bold text-orange-400">
                      {flourishAccount.balance.service}
                    </div>
                    <div className="text-xs text-gray-400">Service</div>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <div className="text-2xl font-bold text-yellow-400">
                      {flourishAccount.balance.total}
                    </div>
                    <div className="text-xs text-gray-400">Total</div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <div className="text-sm text-gray-300">
                    Generation Rate:{" "}
                    <span className="text-cyan-400 font-semibold">
                      {flourishAccount.generationRate} Flourish/month
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Redemption Options */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flourishAccount.redemptionOptions.map((option) => (
                <Card
                  key={option.id}
                  className="bg-black/40 border-white/20 backdrop-blur-md hover:border-white/40 transition-all"
                >
                  <CardHeader>
                    <CardTitle className="text-sm text-white">
                      {option.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-xs text-gray-300">
                      {option.description}
                    </p>

                    {/* Cost Breakdown */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-cyan-400">
                        Required Flourish:
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {option.cost.wisdom > 0 && (
                          <div className="flex justify-between">
                            <span>Wisdom:</span>
                            <span className="text-blue-400">
                              {option.cost.wisdom}
                            </span>
                          </div>
                        )}
                        {option.cost.regeneration > 0 && (
                          <div className="flex justify-between">
                            <span>Regeneration:</span>
                            <span className="text-green-400">
                              {option.cost.regeneration}
                            </span>
                          </div>
                        )}
                        {option.cost.harmony > 0 && (
                          <div className="flex justify-between">
                            <span>Harmony:</span>
                            <span className="text-purple-400">
                              {option.cost.harmony}
                            </span>
                          </div>
                        )}
                        {option.cost.creativity > 0 && (
                          <div className="flex justify-between">
                            <span>Creativity:</span>
                            <span className="text-pink-400">
                              {option.cost.creativity}
                            </span>
                          </div>
                        )}
                        {option.cost.service > 0 && (
                          <div className="flex justify-between">
                            <span>Service:</span>
                            <span className="text-orange-400">
                              {option.cost.service}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="border-t border-white/20 pt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span className="text-yellow-400">
                            {option.cost.total}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-400">
                      <strong>Impact:</strong> {option.impact}
                    </div>

                    <Button
                      onClick={() => redeemFlourish(option.id)}
                      disabled={
                        flourishAccount.balance.total < option.cost.total
                      }
                      size="sm"
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:opacity-50"
                    >
                      {flourishAccount.balance.total >= option.cost.total ? (
                        <>
                          <Gift className="w-3 h-3 mr-2" />
                          Redeem
                        </>
                      ) : (
                        "Insufficient Flourish"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Usage & Impact Tab */}
          <TabsContent value="usage" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Current Usage */}
              <Card className="bg-black/40 border-white/20 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-cyan-400">
                    Current Period Usage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(usageStats.currentPeriod).map(
                    ([key, usage]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </span>
                          <span>
                            {usage.used} /{" "}
                            {usage.limit === "unlimited" ? "∞" : usage.limit}{" "}
                            {usage.unit || ""}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all"
                            style={{
                              width:
                                usage.limit === "unlimited"
                                  ? "100%"
                                  : `${Math.min(100, (usage.used / usage.limit) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    ),
                  )}
                </CardContent>
              </Card>

              {/* Impact Metrics */}
              <Card className="bg-black/40 border-white/20 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-green-400">
                    Sacred Impact Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(usageStats.impactMetrics).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-purple-400">
                            {value}
                          </span>
                          <Star className="w-4 h-4 text-yellow-400" />
                        </div>
                      </div>
                    ),
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Flourish Generation Summary */}
            <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-purple-400">
                  Flourish Generation This Period
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
                  {Object.entries(usageStats.flourishGenerated).map(
                    ([key, value]) => (
                      <div key={key} className="bg-black/20 rounded-lg p-3">
                        <div className="text-lg font-bold text-yellow-400">
                          {value}
                        </div>
                        <div className="text-xs text-gray-400 capitalize">
                          {key}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sacred History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="bg-black/40 border-white/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-orange-400">
                  Sacred Transaction History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {billingHistory.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Your sacred exchange journey begins here.</p>
                    <p className="text-sm">
                      Transactions will appear as you engage with the platform.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {billingHistory.slice(0, 10).map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-all"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              transaction.status === "completed"
                                ? "bg-green-400"
                                : transaction.status === "pending"
                                  ? "bg-yellow-400"
                                  : transaction.status === "failed"
                                    ? "bg-red-400"
                                    : "bg-purple-400"
                            }`}
                          />
                          <div>
                            <div className="font-semibold text-white">
                              {transaction.description}
                            </div>
                            <div className="text-sm text-gray-400">
                              {transaction.timestamp.toLocaleDateString()} •{" "}
                              {transaction.paymentMethod}
                            </div>
                            {transaction.ritualContext && (
                              <div className="text-xs text-purple-400">
                                🕯️ {transaction.ritualContext}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-cyan-400">
                            ${transaction.amount} {transaction.currency}
                          </div>
                          <div className="text-sm text-gray-400 capitalize">
                            {transaction.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Terms Tab */}
          <TabsContent value="terms" className="space-y-6">
            <SacredPaymentTerms />
          </TabsContent>
        </Tabs>
      </div>

      {/* Secure Payment Dialog */}
      <Dialog open={showSecurePayment} onOpenChange={setShowSecurePayment}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-white/20">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-cyan-400">
              <Lock className="w-5 h-5" />
              <span>Sacred Secure Payment</span>
              <Badge className="bg-green-500/20 text-green-400">
                <Shield className="w-3 h-3 mr-1" />
                Military-Grade Security
              </Badge>
            </DialogTitle>
          </DialogHeader>

          {selectedPlanForPayment && (
            <SecurePaymentForm
              plan={selectedPlanForPayment}
              onSuccess={handleSecurePaymentSuccess}
              onCancel={handleSecurePaymentCancel}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Billing;
