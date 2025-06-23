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

// Import and re-export production Guardian credentials
export {
  DEMO_CREDENTIALS,
  PRODUCTION_GUARDIAN_CREDENTIALS,
} from "./guardianProductionData";

// Import and re-export production Guardian data
export {
  mockBalanceAlerts,
  mockRegionalMetrics,
  mockAuditEntries,
  mockAIEthicsAlerts,
  mockDisputes,
  mockFailsafes,
  mockRevOpsMetrics,
  mockAIInsights,
  mockCovenants,
  guardianModules,
} from "./guardianProductionData";

// Legacy mock data for backward compatibility during transition
export const legacyMockBalanceAlerts: BalanceAlert[] = [
  {
    id: "alert-001",
    type: "financial_centralization",
    severity: "high",
    description:
      "Unusual concentration of Flourish tokens in Pacific Northwest bioregion",
    affectedRegions: ["PNW-001", "PNW-002"],
    flourishValue: 12500,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: "active",
  },
  {
    id: "alert-002",
    type: "governance_capture",
    severity: "medium",
    description:
      "Single user account controlling 15% of voting power in Regenerative Tech cluster",
    affectedRegions: ["REGEN-TECH"],
    flourishValue: 8900,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    status: "investigating",
  },
  {
    id: "alert-003",
    type: "wealth_concentration",
    severity: "critical",
    description:
      "Top 5% of users hold 60% of platform value - triggering redistribution ceremony",
    affectedRegions: ["GLOBAL"],
    flourishValue: 45000,
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    status: "active",
  },
];

// Legacy regional metrics for backward compatibility
export const legacyMockRegionalMetrics: RegionalMetrics[] = [
  {
    regionId: "PNW-001",
    name: "Cascadian Bioregion",
    fundingLevel: "overfunded",
    extractionRatio: 0.3,
    flourishFlow: 15600,
    sdgAlignment: 85,
    lastAudit: new Date(Date.now() - 24 * 60 * 60 * 1000),
    alerts: ["Excess tech concentration", "Low indigenous representation"],
  },
  {
    regionId: "AFR-001",
    name: "East African Highlands",
    fundingLevel: "underfunded",
    extractionRatio: 2.1,
    flourishFlow: 3200,
    sdgAlignment: 92,
    lastAudit: new Date(Date.now() - 48 * 60 * 60 * 1000),
    alerts: ["Critical funding gap", "High extraction ratio"],
  },
  {
    regionId: "AMZ-001",
    name: "Amazon Basin Network",
    fundingLevel: "balanced",
    extractionRatio: 0.8,
    flourishFlow: 8900,
    sdgAlignment: 88,
    lastAudit: new Date(Date.now() - 12 * 60 * 60 * 1000),
    alerts: [],
  },
];

// Note: All primary exports now use production data from guardianProductionData.ts
// This ensures the Guardian Intelligence Layer uses official seeded credentials
// Legacy exports are maintained for backward compatibility during transition
