import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CreditCard,
  Shield,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Mail,
  User,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";
import { paystackService } from "@/services/paystack";
import { PaymentSecurity } from "@/lib/payment-security";
import type { SecurePaymentRequest } from "@/types/payment-security";

interface PaystackPaymentFormProps {
  amount: number;
  currency: string;
  serviceName: string;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

interface BillingDetails {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
}

const PaystackPaymentForm: React.FC<PaystackPaymentFormProps> = ({
  amount,
  currency,
  serviceName,
  onSuccess,
  onError,
  onCancel,
}) => {
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "NG",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [securityScore, setSecurityScore] = useState(0);
  const [deviceFingerprint, setDeviceFingerprint] = useState<string>("");

  useEffect(() => {
    // Generate device fingerprint for security
    const fingerprint = PaymentSecurity.Encryption.generateSecureToken();
    setDeviceFingerprint(fingerprint);

    // Calculate initial security score
    updateSecurityScore();
  }, []);

  const updateSecurityScore = () => {
    let score = 50; // Base score

    // Add points for completed fields
    if (
      billingDetails.email &&
      PaymentSecurity.InputValidator.validateEmail(billingDetails.email)
    )
      score += 15;
    if (billingDetails.firstName && billingDetails.lastName) score += 15;
    if (billingDetails.phone) score += 10;
    if (billingDetails.address && billingDetails.city) score += 10;

    setSecurityScore(Math.min(100, score));
  };

  useEffect(() => {
    updateSecurityScore();
  }, [billingDetails]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    try {
      PaymentSecurity.InputValidator.validateEmail(billingDetails.email);
    } catch {
      newErrors.email = "Valid email address is required";
    }

    if (!billingDetails.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!billingDetails.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!billingDetails.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare secure payment request
      const paymentRequest: SecurePaymentRequest = {
        amount,
        currency,
        userId: "current-user-id", // Replace with actual user ID
        planId: "service-purchase",
        billingDetails: {
          email: billingDetails.email,
          name: `${billingDetails.firstName} ${billingDetails.lastName}`,
          phone: billingDetails.phone,
          address: {
            line1: billingDetails.address,
            city: billingDetails.city,
            state: billingDetails.state,
            country: billingDetails.country,
            postalCode: "",
          },
        },
        timestamp: Date.now(),
        metadata: {
          sessionId: PaymentSecurity.Encryption.generateSecureToken(),
          deviceFingerprint,
          ipAddress: await getClientIP(),
          userAgent: navigator.userAgent,
          ritualContext: `Sacred purchase of ${serviceName}`,
          sacredIntent:
            "Contributing to planetary regeneration through conscious exchange",
        },
      };

      // Initialize payment with Paystack
      const response = await paystackService.initializePayment(paymentRequest);

      if (response.success && response.nextAction?.type === "redirect") {
        // Sacred blessing before redirect
        PaymentSecurity.SacredSecurity.blessTransaction(
          response.transactionId,
          "May this exchange serve the highest good of all beings",
        );

        // Redirect to Paystack checkout
        window.location.href = response.nextAction.url;
      } else {
        throw new Error("Payment initialization failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      onError(
        error instanceof Error ? error.message : "Payment processing failed",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const getClientIP = async (): Promise<string> => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip || "unknown";
    } catch {
      return "unknown";
    }
  };

  const getSecurityColor = () => {
    if (securityScore >= 80) return "text-green-400";
    if (securityScore >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-400">
            <CreditCard className="w-5 h-5" />
            <span>Paystack Secure Payment</span>
            <Badge className="bg-green-500/20 text-green-400 border-green-400/50">
              <Shield className="w-3 h-3 mr-1" />
              SSL Secured
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-300">Sacred Investment:</div>
              <div className="text-xl font-bold text-cyan-400">
                {serviceName}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {currency === "NGN" ? "₦" : "$"}
                {amount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">{currency}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Score */}
      <Card className="bg-black/40 border-white/20 backdrop-blur-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">Security Score:</span>
            </div>
            <div className={`font-bold ${getSecurityColor()}`}>
              {securityScore}/100
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${securityScore}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Billing Form */}
      <Card className="bg-black/40 border-white/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white">Sacred Billing Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Email Address</span>
            </label>
            <Input
              type="email"
              value={billingDetails.email}
              onChange={(e) =>
                setBillingDetails((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              placeholder="your@email.com"
              className="bg-black/20 border-white/20 text-white"
            />
            {errors.email && (
              <div className="text-red-400 text-xs flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3" />
                <span>{errors.email}</span>
              </div>
            )}
          </div>

          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>First Name</span>
              </label>
              <Input
                value={billingDetails.firstName}
                onChange={(e) =>
                  setBillingDetails((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                placeholder="First name"
                className="bg-black/20 border-white/20 text-white"
              />
              {errors.firstName && (
                <div className="text-red-400 text-xs">{errors.firstName}</div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Last Name
              </label>
              <Input
                value={billingDetails.lastName}
                onChange={(e) =>
                  setBillingDetails((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                placeholder="Last name"
                className="bg-black/20 border-white/20 text-white"
              />
              {errors.lastName && (
                <div className="text-red-400 text-xs">{errors.lastName}</div>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Phone Number</span>
            </label>
            <Input
              value={billingDetails.phone}
              onChange={(e) =>
                setBillingDetails((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              placeholder="+234 123 456 7890"
              className="bg-black/20 border-white/20 text-white"
            />
            {errors.phone && (
              <div className="text-red-400 text-xs">{errors.phone}</div>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Address (Optional)</span>
            </label>
            <Input
              value={billingDetails.address}
              onChange={(e) =>
                setBillingDetails((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              placeholder="Street address"
              className="bg-black/20 border-white/20 text-white"
            />
          </div>

          {/* City and State */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">City</label>
              <Input
                value={billingDetails.city}
                onChange={(e) =>
                  setBillingDetails((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
                placeholder="City"
                className="bg-black/20 border-white/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">State</label>
              <Input
                value={billingDetails.state}
                onChange={(e) =>
                  setBillingDetails((prev) => ({
                    ...prev,
                    state: e.target.value,
                  }))
                }
                placeholder="State"
                className="bg-black/20 border-white/20 text-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="bg-black/40 border-white/20 backdrop-blur-md">
        <CardContent className="p-4">
          <div className="text-sm font-medium text-gray-300 mb-3">
            Paystack Accepts:
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center space-x-2 p-2 bg-black/20 rounded">
              <CreditCard className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-gray-300">Cards</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-black/20 rounded">
              <Phone className="w-4 h-4 text-green-400" />
              <span className="text-xs text-gray-300">Mobile Money</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-black/20 rounded">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-gray-300">Bank Transfer</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-black/20 rounded">
              <Shield className="w-4 h-4 text-orange-400" />
              <span className="text-xs text-gray-300">USSD</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sacred Blessing */}
      <Alert className="bg-purple-500/20 border-purple-400/20">
        <Sparkles className="w-4 h-4" />
        <AlertDescription className="text-purple-200">
          This transaction will be blessed through sacred protocols, ensuring
          your exchange contributes to planetary healing and collective
          flourishing.
        </AlertDescription>
      </Alert>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button
          onClick={onCancel}
          variant="outline"
          className="flex-1 border-white/20 text-gray-300 hover:bg-white/5"
        >
          Cancel
        </Button>
        <Button
          onClick={handlePayment}
          disabled={isProcessing || securityScore < 60}
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing Sacred Payment...
            </>
          ) : (
            <>
              <Shield className="w-4 h-4 mr-2" />
              Proceed to Paystack ({currency === "NGN" ? "₦" : "$"}
              {amount.toLocaleString()})
            </>
          )}
        </Button>
      </div>

      {securityScore < 60 && (
        <Alert className="bg-yellow-500/20 border-yellow-400/20">
          <AlertTriangle className="w-4 h-4" />
          <AlertDescription className="text-yellow-200">
            Please complete more billing details to increase security score and
            enable payment processing.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default PaystackPaymentForm;
