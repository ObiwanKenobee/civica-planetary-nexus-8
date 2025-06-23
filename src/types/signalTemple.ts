// SignalTemple - Subscriptions as Ritual Echoes
// Types and interfaces for the intelligent newsletter system

export type SubscriptionTrigger =
  | "ritual_invocation"
  | "scroll_follow"
  | "cluster_alignment"
  | "flourish_transaction"
  | "oracle_consultation"
  | "ceremony_attendance";

export type OutputChannel =
  | "email"
  | "ritual_notifications"
  | "encrypted_scrolls"
  | "bioregional_whisper_feed"
  | "in_app_pulse";

export type SacredFrequency =
  | "full_moon"
  | "new_moon"
  | "equinox"
  | "solstice"
  | "weekly_pulse"
  | "cluster_cycle"
  | "bioregional_urgency"
  | "immediate_echo";

export type SemanticTag =
  | "ritual"
  | "regeneration"
  | "governance"
  | "technology"
  | "consciousness"
  | "ecology"
  | "ceremony"
  | "mourning"
  | "pollination"
  | "healing"
  | "abundance"
  | "wisdom";

export type UserRole =
  | "ritual_designer"
  | "forest_delegate"
  | "future_diplomat"
  | "myth_weaver"
  | "river_delegate"
  | "guardian"
  | "steward"
  | "oracle"
  | "technologist";

export type BiomeRegion =
  | "amazon"
  | "arctic"
  | "sahara"
  | "himalayas"
  | "pacific_coral"
  | "boreal_forest"
  | "grasslands"
  | "wetlands"
  | "urban_ecosystem"
  | "digital_realm";

export interface SubscriptionContract {
  id: string;
  userId: string;
  triggerType: SubscriptionTrigger;
  triggerData: any; // Specific data about what triggered the subscription
  clusterId?: number;
  roleId: UserRole;
  bioregion?: BiomeRegion;
  ritualState?: string;
  semanticTags: SemanticTag[];
  frequency: SacredFrequency;
  channels: OutputChannel[];
  consentLevel: "explicit" | "implied" | "sacred_bond";
  createdAt: Date;
  lastEcho: Date | null;
  isActive: boolean;
  metadata: {
    sourceScroll?: string;
    sourceRitual?: string;
    sourceFlourishTx?: string;
    intentionMessage?: string;
  };
}

export interface SacredSignal {
  id: string;
  authorId: string;
  title: string;
  content: string;
  semanticTags: SemanticTag[];
  targetRoles: UserRole[];
  targetClusters: number[];
  targetBioregions: BiomeRegion[];
  urgencyLevel: "whisper" | "pulse" | "echo" | "urgent_call";
  frequency: SacredFrequency;
  channels: OutputChannel[];
  ritualContext?: {
    ceremonyId?: string;
    moonPhase?: string;
    seasonalAlignment?: string;
  };
  flourishReward?: number;
  attachments?: {
    scrolls?: string[];
    ritualGuides?: string[];
    audioMeditations?: string[];
  };
  createdAt: Date;
  scheduledFor?: Date;
  sentAt?: Date | null;
  engagement: {
    echoes: number;
    gratitude: number;
    ritual_completions: number;
  };
}

export interface ConsentPreferences {
  userId: string;
  globalConsent: boolean;
  channels: {
    email: boolean;
    ritual_notifications: boolean;
    encrypted_scrolls: boolean;
    bioregional_whisper_feed: boolean;
    in_app_pulse: boolean;
  };
  frequencies: {
    full_moon: boolean;
    new_moon: boolean;
    equinox: boolean;
    weekly_pulse: boolean;
    cluster_cycle: boolean;
    immediate_echo: boolean;
  };
  semanticFilters: {
    allowedTags: SemanticTag[];
    blockedTags: SemanticTag[];
  };
  bioregionalAlerts: boolean;
  maxDailySignals: number;
  sacredHours: {
    start: string; // HH:MM format
    end: string; // HH:MM format
    timezone: string;
  };
  unsubscribeRituals: {
    requiresRitual: boolean;
    preferredRitualType: "gratitude" | "release" | "silence" | "blessing";
  };
}

export interface WhisperFeedItem {
  id: string;
  signalId: string;
  userId: string;
  type: "signal" | "ritual_echo" | "flourish_blessing" | "cluster_pulse";
  title: string;
  preview: string;
  fullContent?: string;
  semanticTags: SemanticTag[];
  urgencyLevel: "whisper" | "pulse" | "echo" | "urgent_call";
  isRead: boolean;
  receivedAt: Date;
  expiresAt?: Date;
  actions?: {
    canEcho: boolean;
    canShare: boolean;
    canArchive: boolean;
    requiresResponse: boolean;
  };
  metadata: {
    sourceType: SubscriptionTrigger;
    authorRole?: UserRole;
    clusterId?: number;
    bioregion?: BiomeRegion;
  };
}

export interface RitualUnsubscribe {
  id: string;
  userId: string;
  subscriptionId: string;
  ritualType: "gratitude" | "release" | "silence" | "blessing";
  ritualText: string;
  completedAt: Date;
  gratitudeMessage?: string;
  blessingOffered?: string;
  replacementIntention?: string;
}

export interface BiomeHealthStatus {
  region: BiomeRegion;
  healthIndex: number; // 0-100
  urgencyLevel: "thriving" | "stable" | "declining" | "critical";
  lastUpdated: Date;
  indicators: {
    biodiversity: number;
    climate_stability: number;
    human_impact: number;
    regeneration_rate: number;
  };
  emergencySignals: string[];
}

export interface ClusterStatus {
  clusterId: number;
  name: string;
  status: "harmonious" | "active" | "urgent" | "critical";
  lastSimulation: Date;
  participantCount: number;
  currentFocus: SemanticTag[];
  emergencyUpdates: boolean;
}

export interface SemanticIntent {
  query: string;
  extractedTags: SemanticTag[];
  userRole: UserRole;
  confidence: number;
  suggestedSubscriptions: SubscriptionContract[];
  ritualRecommendations: string[];
}
