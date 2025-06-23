// Production Guardian Intelligence Layer Credentials
// Replaces demo credentials with official seeded data

import {
  BalanceAlert,
  RegionalMetrics,
  AuditEntry,
  AIEthicsAlert,
  DisputeCase,
  RitualFailsafe,
  RevOpsMetrics,
  MetaCoPilotInsight,
  CovenantContract,
} from "../types/guardian";

// Production Guardian Credentials (replacing demo)
export const PRODUCTION_GUARDIAN_CREDENTIALS = {
  // Primary Sacred Keeper (highest authority)
  primary: {
    username: "SacredKeeper.Eternal",
    email: "guardian@civica144.org",
    sacredKey: "SK_ETERNAL_WISDOM_KEEPER_SACRED_2024",
  },

  // Balance Guardian (wealth concentration monitoring)
  balance: {
    username: "BalanceKeeper.Eternal",
    email: "balance@civica144.org",
    sacredKey: "BK_WEALTH_BALANCE_KEEPER_2024",
  },

  // Regional Guardian (bioregional stewardship)
  regional: {
    username: "RegionalSteward.Earth",
    email: "regional@civica144.org",
    sacredKey: "RS_BIOREGIONAL_EARTH_STEWARD_2024",
  },

  // AI Ethics Guardian (AI system oversight)
  aiEthics: {
    username: "AIWarden.Sacred",
    email: "ai-ethics@civica144.org",
    sacredKey: "AW_AI_SACRED_ETHICS_WARDEN_2024",
  },

  // Dispute Mediator (conflict resolution)
  mediation: {
    username: "DisputeMediator.Wisdom",
    email: "mediation@civica144.org",
    sacredKey: "DM_DISPUTE_WISDOM_MEDIATOR_2024",
  },

  // Ritual Technologist (system integration)
  ritualTech: {
    username: "RitualTech.Sacred",
    email: "ritual-tech@civica144.org",
    sacredKey: "RT_RITUAL_SACRED_TECH_2024",
  },

  // Covenant Guardian (sacred agreement oversight)
  covenant: {
    username: "CovenantGuardian.Eternal",
    email: "covenant@civica144.org",
    sacredKey: "CG_COVENANT_ETERNAL_GUARDIAN_2024",
  },
};

// For backward compatibility during transition
export const DEMO_CREDENTIALS = {
  username: "SacredKeeper.Eternal",
  password: "Sacred_Eternal_Guardian_2024!",
  sacredKey: "SK_ETERNAL_WISDOM_KEEPER_SACRED_2024",
};

// Enhanced mock data with production-level realism
export const mockBalanceAlerts: BalanceAlert[] = [
  {
    id: "alert-001",
    type: "wealth_concentration",
    severity: "critical",
    description:
      "Single entity approaching 18% control of total Flourish circulation - triggering prevention protocols",
    affectedRegions: ["GLOBAL"],
    flourishValue: 67500,
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    status: "active",
  },
  {
    id: "alert-002",
    type: "governance_capture",
    severity: "high",
    description:
      "Coordinated voting pattern detected in Regenerative Tech cluster - potential capture attempt",
    affectedRegions: ["REGEN-TECH", "DIGITAL-COMMONS"],
    flourishValue: 23400,
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    status: "investigating",
  },
  {
    id: "alert-003",
    type: "extraction_ratio",
    severity: "high",
    description:
      "Pacific Northwest extraction ratio has exceeded 1.8x for 48 hours - redistribution required",
    affectedRegions: ["PNW-001", "PNW-002"],
    flourishValue: 18900,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: "active",
  },
  {
    id: "alert-004",
    type: "ai_bias_detected",
    severity: "medium",
    description:
      "Flourish distribution algorithm showing 12% bias toward English-language proposals",
    affectedRegions: ["GLOBAL"],
    flourishValue: 0,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    status: "remediation_in_progress",
  },
];

export const mockRegionalMetrics: RegionalMetrics[] = [
  {
    regionId: "PNW-001",
    name: "Cascadian Bioregion",
    fundingLevel: "overfunded",
    extractionRatio: 1.8,
    flourishFlow: 23400,
    sdgAlignment: 82,
    lastAudit: new Date(Date.now() - 12 * 60 * 60 * 1000),
    alerts: [
      "High extraction ratio",
      "Tech concentration",
      "Low indigenous representation",
    ],
  },
  {
    regionId: "AFR-001",
    name: "East African Highlands",
    fundingLevel: "critically_underfunded",
    extractionRatio: 0.3,
    flourishFlow: 4500,
    sdgAlignment: 94,
    lastAudit: new Date(Date.now() - 24 * 60 * 60 * 1000),
    alerts: [
      "Critical funding gap",
      "High impact potential",
      "Strong SDG alignment",
    ],
  },
  {
    regionId: "AMZ-001",
    name: "Amazon Basin Network",
    fundingLevel: "balanced",
    extractionRatio: 0.7,
    flourishFlow: 12300,
    sdgAlignment: 91,
    lastAudit: new Date(Date.now() - 6 * 60 * 60 * 1000),
    alerts: [
      "Indigenous leadership priority",
      "Deforestation monitoring active",
    ],
  },
  {
    regionId: "IND-001",
    name: "Indian Subcontinent Network",
    fundingLevel: "underfunded",
    extractionRatio: 0.6,
    flourishFlow: 8900,
    sdgAlignment: 87,
    lastAudit: new Date(Date.now() - 18 * 60 * 60 * 1000),
    alerts: ["Rural-urban imbalance", "High regenerative potential"],
  },
  {
    regionId: "EUR-001",
    name: "European Bioregional Alliance",
    fundingLevel: "moderately_overfunded",
    extractionRatio: 1.2,
    flourishFlow: 19800,
    sdgAlignment: 79,
    lastAudit: new Date(Date.now() - 36 * 60 * 60 * 1000),
    alerts: [
      "Regulatory compliance priority",
      "Traditional knowledge integration needed",
    ],
  },
];

export const mockAuditEntries: AuditEntry[] = [
  {
    id: "audit-001",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    action: "wealth_redistribution_ceremony",
    actor: "system:BalanceKeeper.Eternal",
    target: "global:wealth_concentration",
    value: 12500,
    currency: "flourish",
    consent: true,
    signature: "0x7b8c9d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a",
    metadata: {
      trigger: "concentration_threshold_breach",
      affected_entities: 3,
      ceremony_type: "automated_redistribution",
      threshold_exceeded: 18,
    },
  },
  {
    id: "audit-002",
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    action: "ai_ethics_intervention",
    actor: "guardian:AIWarden.Sacred",
    target: "system:flourish_distribution_algorithm",
    value: 0,
    currency: "system",
    consent: true,
    signature: "0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f",
    metadata: {
      bias_detected: "language_preference",
      bias_score: 12,
      correction_applied: "training_data_rebalance",
      affected_proposals: 47,
    },
  },
  {
    id: "audit-003",
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    action: "emergency_failsafe_trigger",
    actor: "system:guardian_consensus",
    target: "region:PNW-001",
    value: 8900,
    currency: "flourish",
    consent: true,
    signature: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f",
    metadata: {
      failsafe_type: "extraction_ratio_guardian",
      trigger_duration: "48 hours",
      ratio_exceeded: 1.8,
      action_taken: "fund_redirect",
    },
  },
  {
    id: "audit-004",
    timestamp: new Date(Date.now() - 35 * 60 * 1000),
    action: "ceremonial_consensus_decision",
    actor: "collective:guardian_council",
    target: "covenant:platform_operating_agreement",
    value: 0,
    currency: "governance",
    consent: true,
    signature: "0x5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b",
    metadata: {
      decision_type: "covenant_amendment",
      consensus_threshold: 0.75,
      guardian_votes: 6,
      ceremony_duration: "24 hours",
    },
  },
];

export const mockAIEthicsAlerts: AIEthicsAlert[] = [
  {
    id: "ai-001",
    type: "bias_detected",
    aiSystem: "Flourish Distribution Algorithm",
    description:
      "Algorithm showing 12% preference for English-language proposals over equally qualified non-English submissions",
    riskScore: 68,
    recommendedAction:
      "Immediate training data diversification and bias correction protocols",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "correcting",
  },
  {
    id: "ai-002",
    type: "burnout_detection",
    aiSystem: "Guardian Workload Monitor",
    description:
      "Regional Steward showing signs of decision fatigue - recommendation frequency increased 340%",
    riskScore: 72,
    recommendedAction:
      "Initiate guardian rest protocol and redistribute workload",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    status: "acknowledged",
  },
  {
    id: "ai-003",
    type: "ethical_drift",
    aiSystem: "Dispute Resolution AI",
    description:
      "Mediation recommendations shifting toward efficiency over restorative justice principles",
    riskScore: 65,
    recommendedAction:
      "Realign training emphasis on restorative and ceremonial justice approaches",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    status: "pending",
  },
  {
    id: "ai-004",
    type: "transparency_violation",
    aiSystem: "Regional Fund Allocator",
    description:
      "Decision pathway opacity increased - users unable to understand funding decisions",
    riskScore: 58,
    recommendedAction:
      "Implement explainable AI protocols and decision transparency features",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    status: "investigating",
  },
];

export const mockDisputes: DisputeCase[] = [
  {
    id: "dispute-001",
    type: "covenant_violation",
    parties: ["collective.tech.concentrate", "guardian:BalanceKeeper.Eternal"],
    description:
      "Entity attempted to circumvent wealth concentration limits through subsidiary structures",
    value: 15600,
    status: "ceremonial_review",
    mediator: "guardian:DisputeMediator.Wisdom",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
  },
  {
    id: "dispute-002",
    type: "ai_bias_complaint",
    parties: ["collective.global_south", "system:flourish_algorithm"],
    description:
      "Systematic bias in proposal evaluation favoring certain cultural presentation styles",
    value: 0,
    status: "evidence_gathering",
    mediator: "guardian:AIWarden.Sacred",
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
  },
  {
    id: "dispute-003",
    type: "extraction_complaint",
    parties: ["bioregion:AFR-001", "bioregion:PNW-001"],
    description:
      "Imbalance in value extraction versus regenerative contribution between bioregions",
    value: 23400,
    status: "mediation_active",
    mediator: "guardian:RegionalSteward.Earth",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
];

export const mockFailsafes: RitualFailsafe[] = [
  {
    id: "failsafe-001",
    name: "Wealth Concentration Circuit Breaker",
    triggerCondition:
      "When any single entity approaches 20% of total Flourish control",
    action: "ceremonial_redistribution",
    lastTriggered: new Date(Date.now() - 15 * 60 * 1000),
    isActive: true,
    affectedSystems: [
      "Flourish Distribution",
      "Voting Mechanisms",
      "Wealth Tracking",
    ],
  },
  {
    id: "failsafe-002",
    name: "Extraction Ratio Guardian",
    triggerCondition: "Regional extraction ratio exceeds 1.5x for 48 hours",
    action: "redirect",
    lastTriggered: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isActive: true,
    affectedSystems: [
      "Regional Fund Allocation",
      "Payment Routing",
      "Impact Measurement",
    ],
  },
  {
    id: "failsafe-003",
    name: "AI Ethics Violation Emergency Brake",
    triggerCondition: "Ethics risk score exceeds 75 in any AI system",
    action: "pause",
    isActive: true,
    affectedSystems: [
      "All AI Systems",
      "Automated Distributions",
      "Decision Algorithms",
    ],
  },
  {
    id: "failsafe-004",
    name: "Governance Capture Prevention",
    triggerCondition:
      "Coordinated voting pattern detection with >90% correlation",
    action: "voting_pause",
    isActive: true,
    affectedSystems: [
      "Governance Systems",
      "Proposal Voting",
      "Collective Decision Making",
    ],
  },
  {
    id: "failsafe-005",
    name: "Sacred Covenant Enforcement",
    triggerCondition: "Any violation of core platform operating covenants",
    action: "ceremonial_review",
    isActive: true,
    affectedSystems: [
      "All Platform Systems",
      "User Access",
      "Guardian Authority",
    ],
  },
];

export const mockRevOpsMetrics: RevOpsMetrics = {
  totalRevenue: 456789,
  flourishCirculation: 123456,
  activeSubscriptions: 2847,
  refundRequests: 12,
  ethicsScore: 91,
  regionBalance: 68,
  aiAlerts: 8,
  ceremonialOverrides: 5,
};

export const mockAIInsights: MetaCoPilotInsight[] = [
  {
    id: "insight-001",
    category: "watcher",
    title: "Systemic Wealth Concentration Pattern",
    description:
      "Three entities showing coordinated behavior approaching combined 25% platform control",
    confidence: 92,
    actionRequired: true,
    suggestedAction:
      "Initiate immediate wealth redistribution ceremony and investigate coordination",
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
  },
  {
    id: "insight-002",
    category: "balancer",
    title: "Critical Regional Funding Imbalance",
    description:
      "East African Highlands showing 94% SDG alignment but receiving only 3.2% of funding",
    confidence: 87,
    actionRequired: true,
    suggestedAction:
      "Emergency bioregional redistribution ceremony focusing on high-impact, underfunded regions",
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
  },
  {
    id: "insight-003",
    category: "whisperer",
    title: "AI Bias Correlation Discovery",
    description:
      "Language bias in proposal evaluation correlates with 23% reduction in Global South funding",
    confidence: 89,
    actionRequired: true,
    suggestedAction:
      "Implement immediate AI bias correction and compensatory funding ceremony",
    timestamp: new Date(Date.now() - 20 * 60 * 1000),
  },
  {
    id: "insight-004",
    category: "watcher",
    title: "Governance Capture Early Warning",
    description:
      "Abnormal voting pattern in Digital Commons cluster - potential coordinated capture attempt",
    confidence: 78,
    actionRequired: true,
    suggestedAction:
      "Activate governance capture prevention protocols and investigate voting patterns",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
  },
];

export const mockCovenants: CovenantContract[] = [
  {
    id: "covenant-001",
    title: "Platform Sacred Operating Covenant",
    description:
      "Core moral operating system governing all platform interactions and value flows",
    parties: ["CIVICA-144-PLATFORM", "ALL-PARTICIPANTS", "GUARDIAN-COUNCIL"],
    terms: [
      "No individual or entity shall control more than 20% of total platform value",
      "All AI systems must maintain ethical alignment score above 70",
      "Regional extraction ratios must remain below 1.0 averaged over 30 days",
      "All major decisions affecting >1000 users require ceremonial consensus",
      "Guardian interventions must be transparent and auditable",
      "Wealth concentration triggers automatic redistribution ceremonies",
      "AI bias detection requires immediate corrective ritual action",
      "Bioregional balance maintained through regular flow ceremonies",
    ],
    status: "active",
    signedAt: new Date("2024-01-01"),
    linkedBilling: true,
    lastAmended: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    nextReview: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  },
  {
    id: "covenant-002",
    title: "Guardian Sacred Authority Covenant",
    description:
      "Defines the sacred responsibilities and limitations of Guardian Intelligence Layer",
    parties: ["ALL-GUARDIANS", "CIVICA-144-PLATFORM", "USER-COLLECTIVE"],
    terms: [
      "Guardians act only in service of collective flourishing",
      "All Guardian actions must be transparent and auditable",
      "Emergency interventions require subsequent ceremonial review",
      "No Guardian shall act from personal interest or external pressure",
      "Guardian decisions prioritize long-term regenerative outcomes",
      "Sacred technologies are protected from extractive modification",
      "User privacy and sovereignty are inviolable",
      "Guardian power is subject to periodic ceremonial renewal",
    ],
    status: "active",
    signedAt: new Date("2024-03-15"),
    linkedBilling: true,
    lastAmended: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    nextReview: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
  },
  {
    id: "covenant-003",
    title: "Bioregional Flourish Distribution Accord",
    description:
      "Agreement governing fair distribution of Flourish tokens across bioregions",
    parties: ["ALL-BIOREGIONS", "GUARDIAN-COUNCIL", "REGIONAL-STEWARDS"],
    terms: [
      "Minimum 40% of Flourish flows to Global South bioregions",
      "SDG alignment scores weight distribution algorithms with 60% influence",
      "Indigenous knowledge holders receive priority funding streams",
      "Monthly redistribution ceremonies balance wealth concentration",
      "Extraction ratios monitored and automatically limited",
      "Traditional ecological knowledge valued equally with technical innovation",
      "Bioregional autonomy in fund allocation within sustainable limits",
      "Inter-bioregional cooperation incentivized through bonus distributions",
    ],
    status: "active",
    signedAt: new Date("2024-06-01"),
    linkedBilling: true,
    lastAmended: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    nextReview: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
  },
];

export const guardianModules = [
  {
    id: "balance",
    name: "Balance",
    icon: "⚖️",
    description:
      "Prevents financial centralization or governance capture through automated monitoring and ceremonial intervention",
    revOpsBinding:
      "RevOps Dashboard, Flourish Ledger Watcher, Wealth Concentration Alerts",
    lastIntervention: new Date(Date.now() - 15 * 60 * 1000),
    interventionCount: 3,
    ethicsScore: 94,
  },
  {
    id: "regional",
    name: "Regional Oversight",
    icon: "🌍",
    description:
      "Monitors bioregional funding balance and extraction ratios to ensure equitable global resource distribution",
    revOpsBinding:
      "Bioregional Flow Monitor, Flourish Allocation Router, SDG Impact Tracker",
    lastIntervention: new Date(Date.now() - 2 * 60 * 60 * 1000),
    interventionCount: 7,
    ethicsScore: 91,
  },
  {
    id: "audit",
    name: "Audit & Consent Logs",
    icon: "🧾",
    description:
      "Maintains comprehensive audit trail of all economic and governance actions with sacred consent tracking",
    revOpsBinding:
      "Consentful Billing Log, Sacred Transaction Archive, Transparency Dashboard",
    lastIntervention: new Date(Date.now() - 5 * 60 * 1000),
    interventionCount: 1247,
    ethicsScore: 98,
  },
  {
    id: "ai-ethics",
    name: "AI Ethics Enforcement",
    icon: "🧠",
    description:
      "Ensures all AI systems maintain ethical alignment and bias-free operation through continuous monitoring",
    revOpsBinding:
      "AI Co-Pilot Ethics Layer, Algorithm Bias Detector, Decision Transparency System",
    lastIntervention: new Date(Date.now() - 45 * 60 * 1000),
    interventionCount: 15,
    ethicsScore: 87,
  },
  {
    id: "mediation",
    name: "Dispute Mediation",
    icon: "🕊️",
    description:
      "Facilitates restorative justice and ceremonial reconciliation between users, communities, and systems",
    revOpsBinding:
      "Ritual Refund Engine, Ceremonial Adjudication, Healing Circle Protocols",
    lastIntervention: new Date(Date.now() - 24 * 60 * 60 * 1000),
    interventionCount: 8,
    ethicsScore: 93,
  },
  {
    id: "failsafes",
    name: "Ritualized Failsafes",
    icon: "🛡️",
    description:
      "Ceremonially pauses or redirects systems when moral misalignment is detected, with sacred justification",
    revOpsBinding:
      "Smart Circuit Breakers, Sacred Covenant Enforcement, Emergency Intervention Protocols",
    lastIntervention: new Date(Date.now() - 2 * 60 * 60 * 1000),
    interventionCount: 5,
    ethicsScore: 96,
  },
  {
    id: "covenant",
    name: "Covenant Guardian",
    icon: "📜",
    description:
      "Monitors and enforces sacred covenants and agreements that bind platform operations to moral principles",
    revOpsBinding:
      "Sacred Contract Monitor, Covenant Compliance Tracker, Moral Alignment Validator",
    lastIntervention: new Date(Date.now() - 6 * 60 * 60 * 1000),
    interventionCount: 2,
    ethicsScore: 99,
  },
];
