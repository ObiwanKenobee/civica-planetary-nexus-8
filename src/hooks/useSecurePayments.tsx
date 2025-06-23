// CIVICA 144 Secure Payments Hook
// Unified sacred payment management system

import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useBilling } from "@/hooks/useBilling";
import { useSacredAuth } from "@/hooks/useSacredAuth";
import { paystackService } from "@/services/paystack";
import { paypalService } from "@/services/paypal";
import { PaymentSecurity } from "@/lib/payment-security";
import {
  SecurePaymentRequest,
  SecurePaymentResponse,
  PaymentSession,
  TransactionAudit,
  PaymentSecurityError,
  FraudDetectedError,
  RateLimitExceededError,
  SacredPaymentIntent,
  PaymentBlessing,
  KarmaScore,
} from "@/types/payment-security";

export interface PaymentProvider {
  id: "paystack" | "paypal" | "flourish" | "barter";
  name: string;
  description: string;
  icon: string;
  regions: string[];
  currencies: string[];
  available: boolean;
  processingFee: number;
  securityLevel: "basic" | "enhanced" | "military";
}

export interface PaymentState {
  isProcessing: boolean;
  currentSession: PaymentSession | null;
  selectedProvider: PaymentProvider | null;
  paymentIntent: SacredPaymentIntent | null;
  securityScore: number;
  karmaScore: KarmaScore | null;
  blessings: PaymentBlessing[];
  auditTrail: TransactionAudit[];
}

export interface SecurePaymentsHook {
  // State
  paymentState: PaymentState;
  availableProviders: PaymentProvider[];

  // Actions
  selectProvider: (providerId: string) => void;
  setSacredIntent: (intent: SacredPaymentIntent) => void;
  initializePayment: (
    planId: string,
    amount: number,
    currency: string,
  ) => Promise<SecurePaymentResponse>;
  processPayment: (paymentData: any) => Promise<boolean>;
  verifyPayment: (transactionId: string, provider: string) => Promise<boolean>;
  cancelPayment: () => void;

  // Security
  checkSecurityStatus: () => Promise<boolean>;
  validatePaymentSecurity: (
    request: Partial<SecurePaymentRequest>,
  ) => Promise<boolean>;

  // Sacred features
  addBlessing: (transactionId: string, blessing: string) => void;
  generateFlourish: (activity: string) => void;
  assessKarma: (userId: string) => Promise<KarmaScore>;

  // Utilities
  getPaymentHistory: () => TransactionAudit[];
  exportAuditReport: () => Promise<Blob>;
  testProviderConnection: (providerId: string) => Promise<boolean>;
}

const initialPaymentState: PaymentState = {
  isProcessing: false,
  currentSession: null,
  selectedProvider: null,
  paymentIntent: null,
  securityScore: 0,
  karmaScore: null,
  blessings: [],
  auditTrail: [],
};

const PAYMENT_PROVIDERS: PaymentProvider[] = [
  {
    id: "paystack",
    name: "Paystack",
    description: "Secure African payment processing",
    icon: "🏦",
    regions: ["Africa", "Global"],
    currencies: ["USD", "NGN", "GHS", "KES", "ZAR"],
    available: true,
    processingFee: 0.015, // 1.5%
    securityLevel: "enhanced",
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Global digital payments",
    icon: "💙",
    regions: ["Global"],
    currencies: ["USD", "EUR", "GBP", "CAD", "AUD"],
    available: true,
    processingFee: 0.029, // 2.9%
    securityLevel: "enhanced",
  },
  {
    id: "flourish",
    name: "Flourish Currency",
    description: "Sacred value exchange",
    icon: "✨",
    regions: ["Global"],
    currencies: ["FLOURISH"],
    available: true,
    processingFee: 0,
    securityLevel: "military",
  },
  {
    id: "barter",
    name: "Sacred Barter",
    description: "Service and skill exchange",
    icon: "🤝",
    regions: ["Global"],
    currencies: ["TIME", "SKILL", "SERVICE"],
    available: true,
    processingFee: 0,
    securityLevel: "military",
  },
];

export const useSecurePayments = (): SecurePaymentsHook => {
  const [paymentState, setPaymentState] =
    useState<PaymentState>(initialPaymentState);
  const [availableProviders] = useState<PaymentProvider[]>(PAYMENT_PROVIDERS);

  const { toast } = useToast();
  const { user } = useSacredAuth();
  const { generateFlourish: generateBillingFlourish } = useBilling();

  // Initialize security monitoring
  useEffect(() => {
    const checkInitialSecurity = async () => {
      if (user) {
        const securityScore = await calculateSecurityScore();
        const karmaScore = await assessKarma(user.id);

        setPaymentState((prev) => ({
          ...prev,
          securityScore,
          karmaScore,
        }));
      }
    };

    checkInitialSecurity();
  }, [user]);

  const selectProvider = useCallback(
    (providerId: string) => {
      const provider = availableProviders.find((p) => p.id === providerId);
      if (!provider) {
        toast({
          title: "Invalid Payment Provider",
          description: "The selected payment provider is not available.",
          variant: "destructive",
        });
        return;
      }

      setPaymentState((prev) => ({
        ...prev,
        selectedProvider: provider,
      }));

      PaymentSecurity.AuditLogger.logSecurityEvent(
        "payment_fraud_detected",
        "Payment provider selected",
        { providerId, userId: user?.id },
        "info",
        user?.id,
      );
    },
    [availableProviders, toast, user?.id],
  );

  const setSacredIntent = useCallback(
    (intent: SacredPaymentIntent) => {
      // Validate sacred intent
      if (
        !PaymentSecurity.SacredSecurity.validateSacredIntent(intent.intention)
      ) {
        toast({
          title: "Sacred Intent Required",
          description: "Please express your intention with sacred purpose.",
          variant: "destructive",
        });
        return;
      }

      setPaymentState((prev) => ({
        ...prev,
        paymentIntent: intent,
      }));

      PaymentSecurity.AuditLogger.logSecurityEvent(
        "payment_fraud_detected",
        "Sacred payment intent set",
        {
          intention: intent.intention,
          ritualContext: intent.ritualContext,
          userId: user?.id,
          type: "sacred_intent",
        },
        "info",
        user?.id,
      );
    },
    [toast, user?.id],
  );

  const initializePayment = useCallback(
    async (
      planId: string,
      amount: number,
      currency: string,
    ): Promise<SecurePaymentResponse> => {
      if (!user || !paymentState.selectedProvider) {
        throw new PaymentSecurityError(
          "User or payment provider not selected",
          "MISSING_REQUIREMENTS",
          "medium",
        );
      }

      setPaymentState((prev) => ({ ...prev, isProcessing: true }));

      try {
        // Create payment session
        const session: PaymentSession = {
          id: PaymentSecurity.Encryption.generateSecureToken(),
          userId: user.id,
          planId,
          amount,
          currency,
          provider: paymentState.selectedProvider.id as "paystack" | "paypal",
          status: "initiated",
          expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
          createdAt: new Date(),
          ipAddress: "detected_ip", // In real app, detect IP
          userAgent: navigator.userAgent,
          securityToken: PaymentSecurity.Encryption.generateSecureToken(),
          attempts: 0,
          maxAttempts: 3,
        };

        setPaymentState((prev) => ({
          ...prev,
          currentSession: session,
        }));

        // Prepare secure payment request
        const deviceInfo = PaymentSecurity.DeviceFingerprinter.getDeviceInfo();

        const paymentRequest: SecurePaymentRequest = {
          amount,
          currency,
          planId,
          userId: user.id,
          paymentMethodId: paymentState.selectedProvider.id,
          billingDetails: {
            email: user.email || "",
            name: user.user_metadata?.full_name || "",
          },
          metadata: {
            sessionId: session.id,
            ipAddress: session.ipAddress,
            userAgent: session.userAgent,
            deviceFingerprint: deviceInfo.fingerprint,
            geoLocation: undefined, // Would be populated by IP geolocation
            ritualContext: paymentState.paymentIntent?.ritualContext,
            sacredIntent: paymentState.paymentIntent?.intention,
          },
          signature: PaymentSecurity.SacredSecurity.generateKarmaSignature(
            user.id,
            "payment_init",
          ),
          timestamp: Date.now(),
          nonce: PaymentSecurity.Encryption.generateSecureToken(),
        };

        // Route to appropriate payment service
        let response: SecurePaymentResponse;

        if (paymentState.selectedProvider.id === "paystack") {
          response = await paystackService.initializePayment(paymentRequest);
        } else if (paymentState.selectedProvider.id === "paypal") {
          response = await paypalService.createOrder(paymentRequest);
        } else if (paymentState.selectedProvider.id === "flourish") {
          response = await processFlourish(paymentRequest);
        } else {
          throw new PaymentSecurityError(
            "Unsupported payment provider",
            "UNSUPPORTED_PROVIDER",
            "medium",
          );
        }

        // Update security score based on transaction
        const newSecurityScore = Math.min(
          100,
          paymentState.securityScore + response.securityScore / 10,
        );
        setPaymentState((prev) => ({
          ...prev,
          securityScore: newSecurityScore,
          currentSession: { ...session, status: "active" },
        }));

        toast({
          title: "Sacred Payment Initiated",
          description:
            "Your payment has been blessed and initialized securely.",
        });

        return response;
      } catch (error) {
        setPaymentState((prev) => ({ ...prev, isProcessing: false }));

        if (error instanceof FraudDetectedError) {
          toast({
            title: "Security Alert",
            description: `Transaction blocked for security. Risk score: ${error.riskScore}`,
            variant: "destructive",
          });
        } else if (error instanceof RateLimitExceededError) {
          toast({
            title: "Rate Limit Exceeded",
            description: `Please wait ${Math.ceil(error.retryAfter / 1000)} seconds before trying again.`,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Payment Initialization Failed",
            description:
              error instanceof Error ? error.message : "Unknown error occurred",
            variant: "destructive",
          });
        }

        throw error;
      }
    },
    [
      user,
      paymentState.selectedProvider,
      paymentState.paymentIntent,
      paymentState.securityScore,
      toast,
    ],
  );

  const processPayment = useCallback(
    async (paymentData: any): Promise<boolean> => {
      if (!paymentState.currentSession) {
        return false;
      }

      try {
        setPaymentState((prev) => ({ ...prev, isProcessing: true }));

        // Process based on provider
        let success = false;

        if (paymentState.selectedProvider?.id === "paystack") {
          // Verify Paystack transaction
          const transaction = await paystackService.verifyTransaction(
            paymentData.reference,
          );
          success = transaction.status === "success";
        } else if (paymentState.selectedProvider?.id === "paypal") {
          // Capture PayPal order
          const order = await paypalService.captureOrder(paymentData.orderID);
          success = order.status === "COMPLETED";
        } else if (paymentState.selectedProvider?.id === "flourish") {
          success = await processFlourish(paymentData);
        }

        if (success) {
          // Generate Flourish for successful payment
          generateFlourish("successful_payment");

          // Add blessing
          addBlessing(
            paymentState.currentSession.id,
            "Sacred exchange completed with gratitude and abundance",
          );

          // Update karma
          const newKarma = await assessKarma(user?.id || "");
          setPaymentState((prev) => ({
            ...prev,
            karmaScore: newKarma,
            currentSession: prev.currentSession
              ? { ...prev.currentSession, status: "completed" }
              : null,
          }));

          toast({
            title: "Sacred Payment Complete",
            description:
              "Your contribution flows with divine gratitude. Access unlocked!",
          });
        }

        return success;
      } catch (error) {
        toast({
          title: "Payment Processing Failed",
          description:
            error instanceof Error ? error.message : "Unknown error occurred",
          variant: "destructive",
        });
        return false;
      } finally {
        setPaymentState((prev) => ({ ...prev, isProcessing: false }));
      }
    },
    [
      paymentState.currentSession,
      paymentState.selectedProvider?.id,
      user?.id,
      toast,
    ],
  );

  const verifyPayment = useCallback(
    async (transactionId: string, provider: string): Promise<boolean> => {
      try {
        if (provider === "paystack") {
          const transaction =
            await paystackService.verifyTransaction(transactionId);
          return transaction.status === "success";
        } else if (provider === "paypal") {
          const order = await paypalService.getOrderDetails(transactionId);
          return order.status === "COMPLETED";
        }
        return false;
      } catch {
        return false;
      }
    },
    [],
  );

  const cancelPayment = useCallback(() => {
    setPaymentState((prev) => ({
      ...prev,
      isProcessing: false,
      currentSession: prev.currentSession
        ? { ...prev.currentSession, status: "cancelled" }
        : null,
    }));

    toast({
      title: "Payment Cancelled",
      description: "Your payment has been cancelled with understanding.",
    });
  }, [toast]);

  const checkSecurityStatus = useCallback(async (): Promise<boolean> => {
    const securityScore = await calculateSecurityScore();
    setPaymentState((prev) => ({ ...prev, securityScore }));
    return securityScore >= 70; // Minimum security threshold
  }, []);

  const validatePaymentSecurity = useCallback(
    async (request: Partial<SecurePaymentRequest>): Promise<boolean> => {
      try {
        if (request.amount)
          PaymentSecurity.InputValidator.validateAmount(request.amount);
        if (request.currency)
          PaymentSecurity.InputValidator.validateCurrency(request.currency);
        if (request.billingDetails?.email)
          PaymentSecurity.InputValidator.validateEmail(
            request.billingDetails.email,
          );
        if (request.timestamp)
          PaymentSecurity.InputValidator.validateTimestamp(request.timestamp);

        return true;
      } catch {
        return false;
      }
    },
    [],
  );

  const addBlessing = useCallback((transactionId: string, blessing: string) => {
    const newBlessing: PaymentBlessing = {
      id: PaymentSecurity.Encryption.generateSecureToken(),
      transactionId,
      blessing,
      source: "system",
      timestamp: new Date(),
      verified: true,
    };

    setPaymentState((prev) => ({
      ...prev,
      blessings: [...prev.blessings, newBlessing],
    }));

    PaymentSecurity.SacredSecurity.blessTransaction(transactionId, blessing);
  }, []);

  const generateFlourish = useCallback(
    (activity: string) => {
      const flourishAmount = {
        wisdom: 5,
        service: 10,
        total: 15,
      };

      generateBillingFlourish(activity, flourishAmount);
    },
    [generateBillingFlourish],
  );

  const assessKarma = useCallback(
    async (userId: string): Promise<KarmaScore> => {
      // Mock karma assessment - in real app, calculate from user's actions
      return {
        generosity: 75,
        trustworthiness: 85,
        serviceContribution: 70,
        communitySupport: 80,
        total: 77.5,
      };
    },
    [],
  );

  const getPaymentHistory = useCallback((): TransactionAudit[] => {
    return paymentState.auditTrail;
  }, [paymentState.auditTrail]);

  const exportAuditReport = useCallback(async (): Promise<Blob> => {
    const reportData = {
      userId: user?.id,
      timestamp: new Date().toISOString(),
      securityScore: paymentState.securityScore,
      karmaScore: paymentState.karmaScore,
      auditTrail: paymentState.auditTrail,
      blessings: paymentState.blessings,
    };

    const jsonString = JSON.stringify(reportData, null, 2);
    return new Blob([jsonString], { type: "application/json" });
  }, [user?.id, paymentState]);

  const testProviderConnection = useCallback(
    async (providerId: string): Promise<boolean> => {
      try {
        if (providerId === "paystack") {
          return await paystackService.testConnection();
        } else if (providerId === "paypal") {
          return await paypalService.testConnection();
        }
        return true; // For Flourish and Barter
      } catch {
        return false;
      }
    },
    [],
  );

  // Helper functions
  const calculateSecurityScore = async (): Promise<number> => {
    let score = 50; // Base score

    // Device security
    const deviceInfo = PaymentSecurity.DeviceFingerprinter.getDeviceInfo();
    if (deviceInfo.fingerprint) score += 20;

    // User verification
    if (user?.email_confirmed_at) score += 15;

    // Connection security (HTTPS)
    if (window.location.protocol === "https:") score += 15;

    return Math.min(100, score);
  };

  const processFlourish = async (
    request: any,
  ): Promise<SecurePaymentResponse | boolean> => {
    // Mock Flourish processing
    return {
      success: true,
      transactionId: PaymentSecurity.Encryption.generateSecureToken(),
      status: "succeeded",
      amount: request.amount || 0,
      currency: "FLOURISH",
      timestamp: Date.now(),
      securityScore: 100,
      warnings: [],
    };
  };

  return {
    paymentState,
    availableProviders,
    selectProvider,
    setSacredIntent,
    initializePayment,
    processPayment,
    verifyPayment,
    cancelPayment,
    checkSecurityStatus,
    validatePaymentSecurity,
    addBlessing,
    generateFlourish,
    assessKarma,
    getPaymentHistory,
    exportAuditReport,
    testProviderConnection,
  };
};
