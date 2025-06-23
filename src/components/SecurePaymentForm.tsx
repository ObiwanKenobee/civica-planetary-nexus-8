// CIVICA 144 Secure Payment Form
// Sacred payment interface with maximum security

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Star,
  Sparkles,
  Heart,
  Globe,
  Zap,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSecurePayments } from "@/hooks/useSecurePayments";
import { useBilling } from "@/hooks/useBilling";
import { useSacredAuth } from "@/hooks/useSacredAuth";
import { BillingPlan } from "@/types/billing";
import { SacredPaymentIntent } from "@/types/payment-security";

interface SecurePaymentFormProps {
  plan: BillingPlan;
  onSuccess: () => void;
  onCancel: () => void;
}

export const SecurePaymentForm: React.FC<SecurePaymentFormProps> = ({
  plan,
  onSuccess,
  onCancel,
}) => {
  const { user } = useSacredAuth();
  const { region } = useBilling();
  const {
    paymentState,
    availableProviders,
    selectProvider,
    setSacredIntent,
    initializePayment,
    processPayment,
    checkSecurityStatus,
    validatePaymentSecurity,
    addBlessing,
  } = useSecurePayments();

  const [formData, setFormData] = useState({
    email: user?.email || "",
    name: user?.user_metadata?.full_name || "",
    intention: "",
    ritualContext: "",
    blessingsRequested: [] as string[],
    agreeToTerms: false,
    sacredCommitment: false,
  });

  const [showSecurityDetails, setShowSecurityDetails] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    "intent" | "provider" | "payment" | "blessing"
  >("intent");
  const [isSecurityValidated, setIsSecurityValidated] = useState(false);

  // Get regional pricing
  const regionalPricing = plan.regionalPricing.find((p) => p.region === region);
  const finalPrice = plan.basePrice * (regionalPricing?.priceMultiplier || 1.0);
  const currency = regionalPricing?.localCurrency || "USD";

  useEffect(() => {
    const validateSecurity = async () => {
      const isSecure = await checkSecurityStatus();
      setIsSecurityValidated(isSecure);
    };
    validateSecurity();
  }, [checkSecurityStatus]);

  const handleSacredIntentSubmit = () => {
    if (!formData.intention || formData.intention.length < 20) {
      alert(
        "Please express your sacred intention with at least 20 characters.",
      );
      return;
    }

    const sacredIntent: SacredPaymentIntent = {
      intention: formData.intention,
      ritualContext: formData.ritualContext,
      blessingsRequested: formData.blessingsRequested,
      serviceAlignment: [
        "planetary_healing",
        "wisdom_sharing",
        "community_building",
      ],
      planetaryImpact:
        "Contributing to regenerative civilization through sacred technology",
      flourishGeneration: {
        wisdom: 10,
        regeneration: 5,
        harmony: 8,
        creativity: 6,
        service: 12,
      },
    };

    setSacredIntent(sacredIntent);
    setCurrentStep("provider");
  };

  const handleProviderSelect = (providerId: string) => {
    selectProvider(providerId);
    setCurrentStep("payment");
  };

  const handlePaymentInitiate = async () => {
    if (!paymentState.selectedProvider) return;

    try {
      const response = await initializePayment(plan.id, finalPrice, currency);

      if (response.success && response.nextAction?.url) {
        // Redirect to payment provider
        window.location.href = response.nextAction.url;
      }
    } catch (error) {
      console.error("Payment initialization failed:", error);
    }
  };

  const SecurityBadge: React.FC<{ score: number }> = ({ score }) => (
    <Badge
      variant={
        score >= 80 ? "default" : score >= 60 ? "secondary" : "destructive"
      }
      className="flex items-center space-x-1"
    >
      <Shield className="w-3 h-3" />
      <span>Security: {score}%</span>
    </Badge>
  );

  const ProviderCard: React.FC<{ provider: any }> = ({ provider }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`cursor-pointer transition-all ${
        paymentState.selectedProvider?.id === provider.id
          ? "ring-2 ring-cyan-400"
          : "hover:ring-1 hover:ring-white/40"
      }`}
    >
      <Card
        className="bg-black/40 border-white/20 backdrop-blur-md"
        onClick={() => handleProviderSelect(provider.id)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{provider.icon}</span>
              <span className="font-semibold text-white">{provider.name}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {provider.securityLevel}
            </Badge>
          </div>

          <p className="text-sm text-gray-300 mb-3">{provider.description}</p>

          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">
              Fee: {(provider.processingFee * 100).toFixed(1)}%
            </span>
            <div className="flex items-center space-x-1">
              {provider.currencies.slice(0, 3).map((curr: string) => (
                <Badge key={curr} variant="secondary" className="text-xs">
                  {curr}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Security Status Bar */}
      <Card className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-green-400/20 backdrop-blur-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Lock className="w-6 h-6 text-green-400" />
              <div>
                <h3 className="font-semibold text-green-400">
                  Sacred Security Active
                </h3>
                <p className="text-sm text-gray-300">
                  End-to-end encryption • Fraud protection • Sacred blessing
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <SecurityBadge score={paymentState.securityScore} />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSecurityDetails(!showSecurityDetails)}
              >
                {showSecurityDetails ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {showSecurityDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
              >
                <div className="bg-black/20 rounded-lg p-3">
                  <Shield className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                  <div className="text-sm font-semibold text-white">
                    256-bit Encryption
                  </div>
                  <div className="text-xs text-gray-400">Military Grade</div>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <Eye className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                  <div className="text-sm font-semibold text-white">
                    Fraud Detection
                  </div>
                  <div className="text-xs text-gray-400">AI Powered</div>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <Sparkles className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                  <div className="text-sm font-semibold text-white">
                    Sacred Blessing
                  </div>
                  <div className="text-xs text-gray-400">Ritual Protection</div>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <Globe className="w-6 h-6 text-green-400 mx-auto mb-1" />
                  <div className="text-sm font-semibold text-white">
                    PCI Compliant
                  </div>
                  <div className="text-xs text-gray-400">Global Standards</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Plan Summary */}
      <Card className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-400/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-400">
            <Star className="w-5 h-5" />
            <span>Sacred Plan: {plan.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-cyan-400">
                ${finalPrice}
              </div>
              <div className="text-sm text-gray-400">Monthly Investment</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">
                {plan.features.length}
              </div>
              <div className="text-sm text-gray-400">Sacred Features</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">
                {currency}
              </div>
              <div className="text-sm text-gray-400">Regional Currency</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400">{region}</div>
              <div className="text-sm text-gray-400">Your Region</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Flow */}
      <div className="space-y-6">
        {/* Step 1: Sacred Intention */}
        {currentStep === "intent" && (
          <Card className="bg-black/40 border-white/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-cyan-400">
                <Heart className="w-5 h-5" />
                <span>Sacred Intention</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Before we proceed with sacred exchange, please share your
                intention for joining this plan. What service will you offer to
                the collective? How will this support your sacred work?
              </p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="intention">Sacred Intention *</Label>
                  <Textarea
                    id="intention"
                    placeholder="I intend to use CIVICA 144 to..."
                    value={formData.intention}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        intention: e.target.value,
                      }))
                    }
                    className="min-h-[100px] bg-black/20 border-white/20"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {formData.intention.length}/20 characters minimum
                  </p>
                </div>

                <div>
                  <Label htmlFor="ritualContext">
                    Ritual Context (Optional)
                  </Label>
                  <Input
                    id="ritualContext"
                    placeholder="Full moon ceremony, daily practice, community gathering..."
                    value={formData.ritualContext}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        ritualContext: e.target.value,
                      }))
                    }
                    className="bg-black/20 border-white/20"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="sacredCommitment"
                    checked={formData.sacredCommitment}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        sacredCommitment: e.target.checked,
                      }))
                    }
                  />
                  <Label htmlFor="sacredCommitment" className="text-sm">
                    I commit to using this platform for the highest good of all
                    beings
                  </Label>
                </div>
              </div>

              <Button
                onClick={handleSacredIntentSubmit}
                disabled={
                  !formData.intention ||
                  formData.intention.length < 20 ||
                  !formData.sacredCommitment
                }
                className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Bless and Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Provider Selection */}
        {currentStep === "provider" && (
          <Card className="bg-black/40 border-white/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-cyan-400">
                <CreditCard className="w-5 h-5" />
                <span>Sacred Payment Method</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">
                Choose your preferred method of sacred exchange. Each option is
                blessed with the highest security.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {availableProviders.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>

              {paymentState.selectedProvider && (
                <div className="mt-6 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("intent")}
                  >
                    Back to Intention
                  </Button>
                  <Button
                    onClick={() => setCurrentStep("payment")}
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                  >
                    Continue to Payment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 3: Payment Processing */}
        {currentStep === "payment" && paymentState.selectedProvider && (
          <Card className="bg-black/40 border-white/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-cyan-400">
                <Lock className="w-5 h-5" />
                <span>Sacred Exchange</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Payment Summary */}
              <div className="bg-black/20 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">
                  Payment Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Plan:</span>
                    <span className="text-white">{plan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount:</span>
                    <span className="text-white">
                      ${finalPrice} {currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Provider:</span>
                    <span className="text-white">
                      {paymentState.selectedProvider.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Processing Fee:</span>
                    <span className="text-white">
                      $
                      {(
                        finalPrice * paymentState.selectedProvider.processingFee
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-white/20 pt-2 flex justify-between font-semibold">
                    <span className="text-gray-300">Total:</span>
                    <span className="text-cyan-400">
                      $
                      {(
                        finalPrice *
                        (1 + paymentState.selectedProvider.processingFee)
                      ).toFixed(2)}{" "}
                      {currency}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Warnings */}
              {paymentState.securityScore < 70 && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Security score below recommended threshold. Please ensure
                    you're on a secure network.
                  </AlertDescription>
                </Alert>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep("provider")}
                >
                  Change Provider
                </Button>
                <Button
                  onClick={handlePaymentInitiate}
                  disabled={paymentState.isProcessing || !isSecurityValidated}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  {paymentState.isProcessing ? (
                    <>
                      <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Complete Sacred Exchange
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Cancel Button */}
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={onCancel}
          className="text-gray-400 hover:text-white"
        >
          Cancel and Return to Plans
        </Button>
      </div>
    </div>
  );
};

export default SecurePaymentForm;
