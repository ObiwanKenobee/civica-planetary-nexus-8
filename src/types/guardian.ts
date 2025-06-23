export interface GuardianCredentials {
  username: string;
  password: string;
}

export interface GuardianSession {
  isAuthenticated: boolean;
  user: string;
  accessLevel:
    | "observer"
    | "analyst"
    | "curator"
    | "overseer"
    | "sacred_keeper"
    | "demo";
  specialization?: string;
  guardianId?: string;
  permissions?: {
    failsafe_permissions: Record<string, boolean>;
    ai_ethics_thresholds: Record<string, number>;
    ceremonial_authorities: string[];
  };
  expiresAt: Date;
  sessionType?: "credentials" | "sacred_key" | "emergency";
  isEmergencySession?: boolean;
}

export interface BalanceAlert {
  id: string;
  type:
    | "financial_centralization"
    | "governance_capture"
    | "wealth_concentration";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  affectedRegions: string[];
  flourishValue: number;
  timestamp: Date;
  status: "active" | "investigating" | "resolved";
}

export interface RegionalMetrics {
  regionId: string;
  name: string;
  fundingLevel: "underfunded" | "balanced" | "overfunded";
  extractionRatio: number;
  flourishFlow: number;
  sdgAlignment: number;
  lastAudit: Date;
  alerts: string[];
}

export interface AuditEntry {
  id: string;
  timestamp: Date;
  action: string;
  actor: string;
  target: string;
  value?: number;
  currency: "fiat" | "flourish";
  consent: boolean;
  signature: string;
  metadata: Record<string, any>;
}

export interface AIEthicsAlert {
  id: string;
  type:
    | "bias_detected"
    | "burnout_warning"
    | "ethical_debt"
    | "neglected_cluster";
  aiSystem: string;
  description: string;
  riskScore: number;
  recommendedAction: string;
  timestamp: Date;
  status: "pending" | "acknowledged" | "resolved";
}

export interface DisputeCase {
  id: string;
  type: "user_conflict" | "node_dispute" | "contract_breach" | "refund_request";
  parties: string[];
  description: string;
  value: number;
  status: "submitted" | "mediating" | "ritual_review" | "resolved";
  mediator?: string;
  resolution?: string;
  createdAt: Date;
  resolvedAt?: Date;
}

export interface RitualFailsafe {
  id: string;
  name: string;
  triggerCondition: string;
  action: "pause" | "redirect" | "override" | "ceremonial_review";
  lastTriggered?: Date;
  isActive: boolean;
  affectedSystems: string[];
}

export interface RevOpsMetrics {
  totalRevenue: number;
  flourishCirculation: number;
  activeSubscriptions: number;
  refundRequests: number;
  ethicsScore: number;
  regionBalance: number;
  aiAlerts: number;
  ceremonialOverrides: number;
}

export interface MetaCoPilotInsight {
  id: string;
  category: "watcher" | "whisperer" | "witness" | "balancer";
  title: string;
  description: string;
  confidence: number;
  actionRequired: boolean;
  suggestedAction?: string;
  timestamp: Date;
}

export interface CovenantContract {
  id: string;
  title: string;
  description: string;
  parties: string[];
  terms: string[];
  status: "draft" | "active" | "breached" | "ceremonial_override";
  signedAt?: Date;
  expiresAt?: Date;
  linkedBilling: boolean;
}

export interface GuardianState {
  session: GuardianSession;
  alerts: BalanceAlert[];
  regions: RegionalMetrics[];
  auditLog: AuditEntry[];
  aiAlerts: AIEthicsAlert[];
  disputes: DisputeCase[];
  failsafes: RitualFailsafe[];
  revOpsMetrics: RevOpsMetrics;
  aiInsights: MetaCoPilotInsight[];
  covenants: CovenantContract[];
}
