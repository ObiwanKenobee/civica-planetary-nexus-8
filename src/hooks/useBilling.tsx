import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import {
  BillingContext,
  UserBilling,
  BillingTransaction,
  UsageStatistics,
  FlourishAccount,
} from "@/types/billing";
import {
  CIVICA_BILLING_PLANS,
  PAYMENT_METHODS,
  FLOURISH_REDEMPTION_OPTIONS,
} from "@/data/billingPlans";
import { useSacredAuth } from "./useSacredAuth";
import { useCivica } from "@/contexts/CivicaContext";
import { useToast } from "./use-toast";
import { PaymentSecurity } from "@/lib/payment-security";

interface BillingContextType extends BillingContext {
  upgradePlan: (planId: string) => Promise<boolean>;
  downgradePlan: (planId: string) => Promise<boolean>;
  addPaymentMethod: (method: any) => Promise<boolean>;
  processPayment: (amount: number, method: string) => Promise<boolean>;
  redeemFlourish: (optionId: string) => Promise<boolean>;
  generateFlourish: (activity: string, amount: any) => void;
  blessUser: (userId: string, amount: any) => Promise<boolean>;
  updateBillingSettings: (settings: any) => Promise<boolean>;
  getUsageStats: () => UsageStatistics;
  canAccessFeature: (feature: string) => boolean;
  getRemainingUsage: (feature: string) => number | "unlimited";
}

const BillingContext = createContext<BillingContextType | undefined>(undefined);

// Initial state
const initialBillingState: BillingContext = {
  currentPlan: null,
  availablePlans: CIVICA_BILLING_PLANS,
  billingHistory: [],
  usageStats: {
    currentPeriod: {
      simulations: { used: 0, limit: 5 },
      scrolls: { created: 0, limit: 0 },
      rituals: { facilitated: 0, participated: 0 },
      aiQueries: { used: 0, limit: 0 },
      storage: { used: 0, limit: 100, unit: "MB" },
    },
    flourishGenerated: {
      wisdom: 0,
      regeneration: 0,
      harmony: 0,
      creativity: 0,
      service: 0,
      total: 0,
    },
    impactMetrics: {
      sdgContributions: 0,
      ritualParticipation: 0,
      wisdomShared: 0,
      communityBuilding: 0,
      regenerativeActions: 0,
    },
  },
  flourishAccount: {
    balance: {
      wisdom: 0,
      regeneration: 0,
      harmony: 0,
      creativity: 0,
      service: 0,
      total: 0,
    },
    transactions: [],
    generationRate: 10,
    redemptionOptions: FLOURISH_REDEMPTION_OPTIONS,
    sacredCommitments: [],
  },
  paymentMethods: PAYMENT_METHODS,
  canUpgrade: true,
  canDowngrade: true,
  nextBillingDate: null,
  billingCurrency: "USD",
  region: "Global North",
};

// Billing reducer
function billingReducer(state: BillingContext, action: any): BillingContext {
  switch (action.type) {
    case "SET_CURRENT_PLAN":
      const plan = CIVICA_BILLING_PLANS.find((p) => p.id === action.payload);
      return {
        ...state,
        currentPlan: plan || null,
        nextBillingDate: plan
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          : null,
      };

    case "ADD_TRANSACTION":
      return {
        ...state,
        billingHistory: [action.payload, ...state.billingHistory],
      };

    case "UPDATE_USAGE":
      return {
        ...state,
        usageStats: {
          ...state.usageStats,
          currentPeriod: {
            ...state.usageStats.currentPeriod,
            [action.payload.feature]: {
              ...state.usageStats.currentPeriod[
                action.payload
                  .feature as keyof typeof state.usageStats.currentPeriod
              ],
              used: action.payload.used,
            },
          },
        },
      };

    case "GENERATE_FLOURISH":
      const newFlourish = action.payload;
      return {
        ...state,
        flourishAccount: {
          ...state.flourishAccount,
          balance: {
            wisdom:
              state.flourishAccount.balance.wisdom + (newFlourish.wisdom || 0),
            regeneration:
              state.flourishAccount.balance.regeneration +
              (newFlourish.regeneration || 0),
            harmony:
              state.flourishAccount.balance.harmony +
              (newFlourish.harmony || 0),
            creativity:
              state.flourishAccount.balance.creativity +
              (newFlourish.creativity || 0),
            service:
              state.flourishAccount.balance.service +
              (newFlourish.service || 0),
            total:
              state.flourishAccount.balance.total + (newFlourish.total || 0),
          },
          transactions: [
            {
              id: `flourish_${Date.now()}`,
              type: "earned",
              amount: newFlourish,
              description:
                action.payload.description || "Sacred activity contribution",
              relatedActivity: action.payload.activity || "unknown",
              timestamp: new Date(),
            },
            ...state.flourishAccount.transactions,
          ].slice(0, 100),
        },
        usageStats: {
          ...state.usageStats,
          flourishGenerated: {
            wisdom:
              state.usageStats.flourishGenerated.wisdom +
              (newFlourish.wisdom || 0),
            regeneration:
              state.usageStats.flourishGenerated.regeneration +
              (newFlourish.regeneration || 0),
            harmony:
              state.usageStats.flourishGenerated.harmony +
              (newFlourish.harmony || 0),
            creativity:
              state.usageStats.flourishGenerated.creativity +
              (newFlourish.creativity || 0),
            service:
              state.usageStats.flourishGenerated.service +
              (newFlourish.service || 0),
            total:
              state.usageStats.flourishGenerated.total +
              (newFlourish.total || 0),
          },
        },
      };

    case "SPEND_FLOURISH":
      const spendAmount = action.payload;
      return {
        ...state,
        flourishAccount: {
          ...state.flourishAccount,
          balance: {
            wisdom: Math.max(
              0,
              state.flourishAccount.balance.wisdom - (spendAmount.wisdom || 0),
            ),
            regeneration: Math.max(
              0,
              state.flourishAccount.balance.regeneration -
                (spendAmount.regeneration || 0),
            ),
            harmony: Math.max(
              0,
              state.flourishAccount.balance.harmony -
                (spendAmount.harmony || 0),
            ),
            creativity: Math.max(
              0,
              state.flourishAccount.balance.creativity -
                (spendAmount.creativity || 0),
            ),
            service: Math.max(
              0,
              state.flourishAccount.balance.service -
                (spendAmount.service || 0),
            ),
            total: Math.max(
              0,
              state.flourishAccount.balance.total - (spendAmount.total || 0),
            ),
          },
          transactions: [
            {
              id: `flourish_spend_${Date.now()}`,
              type: "spent",
              amount: spendAmount,
              description: action.payload.description || "Flourish redemption",
              relatedActivity: action.payload.activity || "redemption",
              timestamp: new Date(),
            },
            ...state.flourishAccount.transactions,
          ].slice(0, 100),
        },
      };

    case "UPDATE_REGION":
      return {
        ...state,
        region: action.payload.region,
        billingCurrency: action.payload.currency,
      };

    default:
      return state;
  }
}

export const BillingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(billingReducer, initialBillingState);
  const { user } = useSacredAuth();
  const { addWisdomStream } = useCivica();
  const { toast } = useToast();

  // Initialize user's current plan
  useEffect(() => {
    if (user) {
      // Default to Civic Explorer for new users
      dispatch({ type: "SET_CURRENT_PLAN", payload: "civic_explorer" });

      // Detect user's region (simplified)
      const region = detectUserRegion();
      dispatch({
        type: "UPDATE_REGION",
        payload: {
          region,
          currency: region === "Global South" ? "USD" : "USD",
        },
      });
    }
  }, [user]);

  const detectUserRegion = (): string => {
    // Simplified region detection - in real app, use IP geolocation
    return "Global North"; // Default
  };

  const upgradePlan = async (planId: string): Promise<boolean> => {
    try {
      const plan = CIVICA_BILLING_PLANS.find((p) => p.id === planId);
      if (!plan) return false;

      // Security validation for plan upgrade
      PaymentSecurity.AuditLogger.logSecurityEvent(
        "payment_fraud_detected",
        "Plan upgrade initiated",
        {
          planId,
          userId: user?.id,
          currentPlan: state.currentPlan?.id,
          type: "plan_upgrade",
        },
        "info",
        user?.id,
      );

      // Calculate price based on region
      const pricing = plan.regionalPricing.find(
        (p) => p.region === state.region,
      );
      const finalPrice = plan.basePrice * (pricing?.priceMultiplier || 1.0);

      // Simulate payment processing
      const transaction: BillingTransaction = {
        id: `txn_${Date.now()}`,
        amount: finalPrice,
        currency: state.billingCurrency,
        type: "subscription",
        status: "completed",
        paymentMethod: "stripe_card",
        description: `Upgraded to ${plan.name}`,
        timestamp: new Date(),
        ritualContext: "sacred_upgrade_ceremony",
        blessings: ["planetary_service", "wisdom_expansion"],
      };

      dispatch({ type: "SET_CURRENT_PLAN", payload: planId });
      dispatch({ type: "ADD_TRANSACTION", payload: transaction });

      // Generate sacred blessing for the transaction
      PaymentSecurity.SacredSecurity.blessTransaction(
        transaction.id,
        `Sacred plan upgrade to ${plan.name} blessed with divine abundance and service`,
      );

      // Generate Flourish for upgrading
      generateFlourish("plan_upgrade", {
        wisdom: 25,
        service: 15,
        total: 40,
      });

      addWisdomStream(
        `Sacred plan upgrade to ${plan.name} - expanding capacity for planetary service`,
        "billing_system",
      );

      toast({
        title: "Sacred Upgrade Complete",
        description: `Welcome to ${plan.name}! Your enhanced capabilities are now active.`,
      });

      return true;
    } catch (error) {
      toast({
        title: "Upgrade Sacred Pause",
        description: "The universe is asking for patience. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const downgradePlan = async (planId: string): Promise<boolean> => {
    try {
      const plan = CIVICA_BILLING_PLANS.find((p) => p.id === planId);
      if (!plan) return false;

      dispatch({ type: "SET_CURRENT_PLAN", payload: planId });

      addWisdomStream(
        `Plan adjustment to ${plan.name} - honoring right-sizing for current needs`,
        "billing_system",
      );

      toast({
        title: "Plan Gracefully Adjusted",
        description: `Transitioned to ${plan.name} with gratitude for the journey.`,
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  const processPayment = async (
    amount: number,
    method: string,
  ): Promise<boolean> => {
    try {
      // Security validation for payment
      PaymentSecurity.InputValidator.validateAmount(amount);
      PaymentSecurity.InputValidator.validateCurrency(state.billingCurrency);

      // Log payment attempt
      PaymentSecurity.AuditLogger.logSecurityEvent(
        "payment_fraud_detected",
        "Payment processing initiated",
        {
          amount,
          method,
          currency: state.billingCurrency,
          userId: user?.id,
          type: "payment_processing",
        },
        "info",
        user?.id,
      );

      // Simulate payment processing
      const transaction: BillingTransaction = {
        id: `txn_${Date.now()}`,
        amount,
        currency: state.billingCurrency,
        type: "subscription",
        status: "completed",
        paymentMethod: method,
        description: `Monthly subscription payment`,
        timestamp: new Date(),
        ritualContext: "sacred_payment_ceremony",
        blessings: ["financial_flow", "service_abundance"],
      };

      dispatch({ type: "ADD_TRANSACTION", payload: transaction });

      // Bless the successful payment
      PaymentSecurity.SacredSecurity.blessTransaction(
        transaction.id,
        "Sacred payment flows with gratitude and abundance to planetary healing",
      );

      toast({
        title: "Sacred Exchange Complete",
        description:
          "Your contribution flows with gratitude to planetary healing.",
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  const redeemFlourish = async (optionId: string): Promise<boolean> => {
    try {
      const option = FLOURISH_REDEMPTION_OPTIONS.find((o) => o.id === optionId);
      if (!option) return false;

      // Check if user has enough Flourish
      const hasEnough =
        state.flourishAccount.balance.wisdom >= option.cost.wisdom &&
        state.flourishAccount.balance.regeneration >=
          option.cost.regeneration &&
        state.flourishAccount.balance.harmony >= option.cost.harmony &&
        state.flourishAccount.balance.creativity >= option.cost.creativity &&
        state.flourishAccount.balance.service >= option.cost.service;

      if (!hasEnough) {
        toast({
          title: "Insufficient Sacred Currency",
          description:
            "Continue contributing to the collective to earn more Flourish.",
          variant: "destructive",
        });
        return false;
      }

      dispatch({
        type: "SPEND_FLOURISH",
        payload: {
          ...option.cost,
          description: `Redeemed: ${option.name}`,
          activity: "redemption",
        },
      });

      addWisdomStream(
        `Flourish redemption: ${option.name} - sacred value flowing into manifestation`,
        "flourish_economy",
      );

      toast({
        title: "Sacred Redemption Complete",
        description: `${option.name} activated with gratitude and purpose.`,
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  const generateFlourish = (activity: string, amount: any) => {
    const flourishAmount = {
      wisdom: amount.wisdom || 0,
      regeneration: amount.regeneration || 0,
      harmony: amount.harmony || 0,
      creativity: amount.creativity || 0,
      service: amount.service || 0,
      total:
        amount.total ||
        (amount.wisdom || 0) +
          (amount.regeneration || 0) +
          (amount.harmony || 0) +
          (amount.creativity || 0) +
          (amount.service || 0),
    };

    dispatch({
      type: "GENERATE_FLOURISH",
      payload: {
        ...flourishAmount,
        activity,
        description: `Sacred contribution: ${activity}`,
      },
    });
  };

  const blessUser = async (userId: string, amount: any): Promise<boolean> => {
    try {
      // Check if user has enough Flourish to bless
      const hasEnough = state.flourishAccount.balance.total >= amount.total;

      if (!hasEnough) {
        toast({
          title: "Insufficient Blessing Currency",
          description: "Earn more Flourish through service to share blessings.",
          variant: "destructive",
        });
        return false;
      }

      dispatch({
        type: "SPEND_FLOURISH",
        payload: {
          ...amount,
          description: `Blessing gifted to community member`,
          activity: "blessing",
        },
      });

      // Generate karma for the blessing
      generateFlourish("blessing_given", {
        harmony: amount.total * 0.1,
        service: amount.total * 0.2,
        total: amount.total * 0.3,
      });

      toast({
        title: "Sacred Blessing Sent",
        description:
          "Your generosity creates ripples of abundance in the collective.",
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  const addPaymentMethod = async (method: any): Promise<boolean> => {
    // Simulate adding payment method
    return true;
  };

  const updateBillingSettings = async (settings: any): Promise<boolean> => {
    // Simulate updating settings
    return true;
  };

  const getUsageStats = (): UsageStatistics => {
    return state.usageStats;
  };

  const canAccessFeature = (feature: string): boolean => {
    if (!state.currentPlan) return false;

    const planFeature = state.currentPlan.features.find(
      (f) => f.id === feature,
    );
    return planFeature ? planFeature.included !== false : false;
  };

  const getRemainingUsage = (feature: string): number | "unlimited" => {
    const currentUsage =
      state.usageStats.currentPeriod[
        feature as keyof typeof state.usageStats.currentPeriod
      ];
    if (!currentUsage || typeof currentUsage.limit === "string")
      return "unlimited";

    return Math.max(0, currentUsage.limit - currentUsage.used);
  };

  const contextValue: BillingContextType = {
    ...state,
    upgradePlan,
    downgradePlan,
    addPaymentMethod,
    processPayment,
    redeemFlourish,
    generateFlourish,
    blessUser,
    updateBillingSettings,
    getUsageStats,
    canAccessFeature,
    getRemainingUsage,
  };

  return (
    <BillingContext.Provider value={contextValue}>
      {children}
    </BillingContext.Provider>
  );
};

export const useBilling = (): BillingContextType => {
  const context = useContext(BillingContext);
  if (context === undefined) {
    throw new Error("useBilling must be used within a BillingProvider");
  }
  return context;
};
