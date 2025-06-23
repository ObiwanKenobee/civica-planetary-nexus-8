// CIVICA 144 Billing System Types
// Sacred economy meets practical sustainability

import { FlourishBalance } from "./civica";

export interface BillingPlan {
  id: string;
  name: string;
  description: string;
  icon: string;
  basePrice: number; // USD baseline
  features: PlanFeature[];
  limitations: PlanLimitation[];
  flourishBenefits: FlourishBenefit[];
  sacredPerks: string[];
  regionalPricing: RegionalPricing[];
  color: string;
  popular?: boolean;
  enterprise?: boolean;
}

export interface PlanFeature {
  id: string;
  name: string;
  description: string;
  included: boolean | "limited" | number;
  tooltip?: string;
}

export interface PlanLimitation {
  feature: string;
  limit: number | string;
  unit: string;
}

export interface FlourishBenefit {
  type:
    | "generation_multiplier"
    | "monthly_grant"
    | "ritual_bonus"
    | "access_unlock";
  value: number;
  description: string;
}

export interface RegionalPricing {
  region: string;
  countryCode: string;
  priceMultiplier: number; // Based on purchasing power parity
  localCurrency?: string;
  localPrice?: number;
}

export interface BillableModule {
  id: string;
  name: string;
  description: string;
  baseRate: number;
  unit: "per_minute" | "per_use" | "per_month" | "per_scroll" | "per_ritual";
  category:
    | "simulation"
    | "creation"
    | "governance"
    | "intelligence"
    | "wallet";
  flourishAlternative?: FlourishPrice;
  bundledInPlans?: string[]; // Plan IDs that include this module
}

export interface FlourishPrice {
  amount: number;
  type: keyof FlourishBalance;
  description: string;
}

export interface PaymentMethod {
  id: string;
  type: "card" | "crypto" | "local" | "flourish" | "barter";
  name: string;
  description: string;
  icon: string;
  available: boolean;
  regions?: string[];
  processingFee?: number;
  instantActivation: boolean;
}

export interface UserBilling {
  id: string;
  userId: string;
  currentPlan: string;
  billingCycle: "monthly" | "yearly" | "seasonal" | "lunar";
  nextBillingDate: Date;
  paymentMethod: string;
  billingHistory: BillingTransaction[];
  usageStats: UsageStatistics;
  flourishAccount: FlourishAccount;
  contributions: ContributionRecord[];
  sacredStatus: SacredBillingStatus;
}

export interface BillingTransaction {
  id: string;
  amount: number;
  currency: string;
  flourishAmount?: FlourishBalance;
  type: "subscription" | "usage" | "module" | "contribution" | "blessing";
  status: "pending" | "completed" | "failed" | "refunded" | "ritualized";
  paymentMethod: string;
  description: string;
  timestamp: Date;
  ritualContext?: string;
  blessings?: string[];
}

export interface UsageStatistics {
  currentPeriod: {
    simulations: { used: number; limit: number };
    scrolls: { created: number; limit: number };
    rituals: { facilitated: number; participated: number };
    aiQueries: { used: number; limit: number };
    storage: { used: number; limit: number; unit: "GB" };
  };
  flourishGenerated: FlourishBalance;
  impactMetrics: ImpactMetrics;
}

export interface ImpactMetrics {
  sdgContributions: number;
  ritualParticipation: number;
  wisdomShared: number;
  communityBuilding: number;
  regenerativeActions: number;
}

export interface ContributionRecord {
  id: string;
  type:
    | "ritual_creation"
    | "sdg_action"
    | "wisdom_sharing"
    | "community_service"
    | "regenerative_project";
  description: string;
  value: number; // Flourish value generated
  verifiedBy: string[];
  timestamp: Date;
  relatedSDGs: number[];
  accessGranted?: string[]; // Features unlocked by this contribution
}

export interface SacredBillingStatus {
  blessingsReceived: number;
  blessingsGiven: number;
  karmaScore: number;
  serviceHours: number;
  ritualRole: "learner" | "practitioner" | "facilitator" | "keeper" | "elder";
  generosityIndex: number; // How much they've helped others access the platform
  reciprocityBalance: number; // Give vs receive balance
}

export interface FlourishAccount {
  balance: FlourishBalance;
  transactions: FlourishTransaction[];
  generationRate: number; // Per month based on activity
  redemptionOptions: RedemptionOption[];
  sacredCommitments: SacredCommitment[];
}

export interface FlourishTransaction {
  id: string;
  type: "earned" | "spent" | "gifted" | "received" | "blessed";
  amount: FlourishBalance;
  description: string;
  relatedActivity: string;
  timestamp: Date;
  fromUser?: string;
  toUser?: string;
  ritualWitness?: string[];
}

export interface RedemptionOption {
  id: string;
  name: string;
  description: string;
  cost: FlourishBalance;
  type:
    | "feature_unlock"
    | "subscription_credit"
    | "module_access"
    | "blessing_pool"
    | "regenerative_project";
  duration?: string;
  impact: string;
}

export interface SacredCommitment {
  id: string;
  description: string;
  flourishRequired: FlourishBalance;
  duration: "moon_cycle" | "season" | "year" | "lifetime";
  benefits: string[];
  renewalRitual?: string;
  witnesses: string[];
  status: "active" | "fulfilled" | "paused" | "released";
}

export interface BillingSettings {
  autoRenew: boolean;
  flourishAutoConvert: boolean;
  blessingPoolContribution: number; // Percentage of Flourish to auto-donate
  preferredPaymentMethod: string;
  billingNotifications: NotificationSettings;
  regionalOptimization: boolean;
  carbonOffset: boolean;
  regenerativeFundContribution: number; // Percentage of payment
}

export interface NotificationSettings {
  billingReminders: boolean;
  usageLimits: boolean;
  flourishUpdates: boolean;
  blessingsReceived: boolean;
  impactReports: boolean;
  ritualOpportunities: boolean;
}

export interface GlobalSouth {
  countries: string[];
  priceMultiplier: 0.25; // 75% discount for Global South
  flourishBonus: 1.5; // 50% more Flourish generation
  mentorshipProgram: boolean;
  localPaymentMethods: string[];
}

export interface EnterpriseFeatures {
  multiUser: boolean;
  apiAccess: boolean;
  customIntegrations: boolean;
  dedicatedSupport: boolean;
  governanceSDK: boolean;
  analyticsaDashboard: boolean;
  whiteLabel: boolean;
  ritualFacilitation: boolean;
}

export interface BillingContext {
  currentPlan: BillingPlan | null;
  availablePlans: BillingPlan[];
  billingHistory: BillingTransaction[];
  usageStats: UsageStatistics;
  flourishAccount: FlourishAccount;
  paymentMethods: PaymentMethod[];
  canUpgrade: boolean;
  canDowngrade: boolean;
  nextBillingDate: Date | null;
  billingCurrency: string;
  region: string;
}

// Sacred Economy Constants
export const SACRED_BILLING_PRINCIPLES = {
  GLOBAL_JUSTICE: "Pricing adapts to local economic realities",
  CONTRIBUTION_REWARDS: "Service to the collective unlocks access",
  TRANSPARENT_FLOW: "Every transaction is open and blessed",
  REGENERATIVE_IMPACT: "Portion of all payments fund planetary healing",
  CONSENT_BASED: "All billing can be paused or modified through ritual",
  ABUNDANCE_MINDSET: "Scarcity is transformed into collective prosperity",
} as const;

export const FLOURISH_GENERATION_RATES = {
  RITUAL_PARTICIPATION: 5,
  RITUAL_FACILITATION: 15,
  SDG_CONTRIBUTION: 10,
  WISDOM_SHARING: 8,
  COMMUNITY_BUILDING: 12,
  REGENERATIVE_ACTION: 20,
  PEER_BLESSING: 3,
  MONTHLY_ACTIVE: 10,
} as const;

export const REGIONAL_MULTIPLIERS = {
  GLOBAL_NORTH: 1.0,
  GLOBAL_SOUTH: 0.25,
  EMERGING_ECONOMIES: 0.5,
  INDIGENOUS_COMMUNITIES: 0.1,
  STUDENTS: 0.3,
  ELDERS: 0.4,
  CLIMATE_REFUGEES: 0.0, // Free access
} as const;
