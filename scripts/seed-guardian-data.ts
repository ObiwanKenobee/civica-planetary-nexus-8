import { supabase } from "../src/integrations/supabase/client";

// Official Guardian Intelligence Layer Access Credentials
// These will replace the demo credentials for production use

export interface GuardianSeedData {
  guardianName: string;
  email: string;
  password: string;
  accessLevel:
    | "observer"
    | "analyst"
    | "curator"
    | "overseer"
    | "sacred_keeper";
  specialization: string;
  realName: string;
  bioregion: string;
  culturalLineage?: string;
  sacredKey: string;
  emergencyOverrideKey?: string;
  failsafePermissions: Record<string, boolean>;
  aiEthicsThresholds: Record<string, number>;
  ceremonialAuthorities: string[];
}

export const GUARDIAN_SEED_DATA: GuardianSeedData[] = [
  {
    guardianName: "SacredKeeper.Eternal",
    email: "guardian@civica144.org",
    password: "Sacred_Eternal_Guardian_2024!",
    accessLevel: "sacred_keeper",
    specialization: "wisdom_keeper",
    realName: "Sacred Technology Council",
    bioregion: "Global Network",
    culturalLineage: "Multi-Traditional Wisdom Synthesis",
    sacredKey: "SK_ETERNAL_WISDOM_KEEPER_SACRED_2024",
    emergencyOverrideKey: "EMERGENCY_SACRED_OVERRIDE_ETERNAL_2024",
    failsafePermissions: {
      all_systems: true,
      emergency_shutdown: true,
      covenant_modification: true,
      platform_wide_intervention: true,
    },
    aiEthicsThresholds: {
      minimum_score: 70,
      intervention_threshold: 60,
      shutdown_threshold: 40,
    },
    ceremonialAuthorities: [
      "platform_wide_ceremonies",
      "covenant_creation",
      "guardian_appointment",
      "system_blessing",
      "moral_realignment",
    ],
  },
  {
    guardianName: "BalanceKeeper.Eternal",
    email: "balance@civica144.org",
    password: "Balance_Wealth_Guardian_2024!",
    accessLevel: "overseer",
    specialization: "balance_keeper",
    realName: "Wealth Concentration Monitor",
    bioregion: "Global Network",
    culturalLineage: "Economic Justice Traditions",
    sacredKey: "BK_WEALTH_BALANCE_KEEPER_2024",
    failsafePermissions: {
      wealth_redistribution: true,
      governance_intervention: true,
      voting_pause: true,
      concentration_alerts: true,
    },
    aiEthicsThresholds: {
      bias_threshold: 75,
      concentration_limit: 20,
      intervention_score: 65,
    },
    ceremonialAuthorities: [
      "redistribution_ceremony",
      "wealth_blessing",
      "governance_realignment",
      "economic_justice_ritual",
    ],
  },
  {
    guardianName: "RegionalSteward.Earth",
    email: "regional@civica144.org",
    password: "Regional_Earth_Steward_2024!",
    accessLevel: "curator",
    specialization: "regional_steward",
    realName: "Bioregional Flow Guardian",
    bioregion: "Global Network",
    culturalLineage: "Indigenous Land Stewardship",
    sacredKey: "RS_BIOREGIONAL_EARTH_STEWARD_2024",
    failsafePermissions: {
      fund_redistribution: true,
      extraction_limits: true,
      bioregion_protection: true,
      flow_monitoring: true,
    },
    aiEthicsThresholds: {
      extraction_threshold: 1.5,
      funding_balance_score: 70,
    },
    ceremonialAuthorities: [
      "bioregional_blessing",
      "extraction_ceremony",
      "funding_redistribution",
      "earth_healing_ritual",
    ],
  },
  {
    guardianName: "AIWarden.Sacred",
    email: "ai-ethics@civica144.org",
    password: "AI_Sacred_Ethics_Warden_2024!",
    accessLevel: "curator",
    specialization: "ai_ethics_warden",
    realName: "Artificial Intelligence Ethics Guardian",
    bioregion: "Digital Realm",
    culturalLineage: "Computational Ethics Traditions",
    sacredKey: "AW_AI_SACRED_ETHICS_WARDEN_2024",
    failsafePermissions: {
      ai_system_pause: true,
      algorithm_modification: true,
      ethics_enforcement: true,
      bias_correction: true,
    },
    aiEthicsThresholds: {
      minimum_ethics_score: 70,
      bias_alert_threshold: 65,
      emergency_shutdown: 40,
      intervention_required: 55,
    },
    ceremonialAuthorities: [
      "ai_blessing_ceremony",
      "algorithm_purification",
      "digital_ethics_ritual",
      "consciousness_alignment",
    ],
  },
  {
    guardianName: "DisputeMediator.Wisdom",
    email: "mediation@civica144.org",
    password: "Dispute_Wisdom_Mediator_2024!",
    accessLevel: "analyst",
    specialization: "dispute_mediator",
    realName: "Sacred Conflict Resolution Council",
    bioregion: "Global Network",
    culturalLineage: "Restorative Justice Traditions",
    sacredKey: "DM_DISPUTE_WISDOM_MEDIATOR_2024",
    failsafePermissions: {
      dispute_intervention: true,
      ceremony_initiation: true,
      mediation_authority: true,
    },
    aiEthicsThresholds: {},
    ceremonialAuthorities: [
      "dispute_ceremony",
      "reconciliation_ritual",
      "justice_blessing",
      "healing_circle",
      "truth_telling_ceremony",
    ],
  },
  {
    guardianName: "RitualTech.Sacred",
    email: "ritual-tech@civica144.org",
    password: "Ritual_Sacred_Tech_Guardian_2024!",
    accessLevel: "analyst",
    specialization: "ritual_technologist",
    realName: "Sacred Technology Integration Guardian",
    bioregion: "Digital-Physical Bridge",
    culturalLineage: "Sacred Technology Synthesis",
    sacredKey: "RT_RITUAL_SACRED_TECH_2024",
    failsafePermissions: {
      system_integration: true,
      ritual_automation: true,
      ceremony_triggers: true,
      technology_blessing: true,
    },
    aiEthicsThresholds: {
      integration_score: 75,
      sacred_alignment: 80,
    },
    ceremonialAuthorities: [
      "system_blessing",
      "integration_ceremony",
      "technology_purification",
      "digital_ritual_weaving",
    ],
  },
  {
    guardianName: "CovenantGuardian.Eternal",
    email: "covenant@civica144.org",
    password: "Covenant_Eternal_Guardian_2024!",
    accessLevel: "overseer",
    specialization: "covenant_guardian",
    realName: "Sacred Covenant Oversight Council",
    bioregion: "Global Network",
    culturalLineage: "Sacred Contract Traditions",
    sacredKey: "CG_COVENANT_ETERNAL_GUARDIAN_2024",
    failsafePermissions: {
      covenant_enforcement: true,
      agreement_modification: true,
      contract_intervention: true,
      sacred_binding_authority: true,
    },
    aiEthicsThresholds: {
      covenant_compliance_score: 85,
      sacred_alignment_threshold: 75,
    },
    ceremonialAuthorities: [
      "covenant_creation",
      "sacred_binding_ceremony",
      "agreement_blessing",
      "contract_purification",
      "moral_enforcement_ritual",
    ],
  },
];

// Additional seed data for Guardian system configuration
export const GUARDIAN_SYSTEM_CONFIG = {
  defaultSessionDuration: "8 hours",
  emergencySessionDuration: "2 hours",
  maxConcurrentSessions: 3,
  requiredConsensusThreshold: 0.6, // 60% of active guardians
  emergencyResponseTime: "15 minutes",
  ceremonialCooldownPeriod: "24 hours",
  aiEthicsReviewCycle: "7 days",
  wealthConcentrationLimit: 20, // 20% maximum individual control
  extractionRatioThreshold: 1.5,
  mandatoryAuditFrequency: "30 days",
};

// Sacred covenants that bind Guardian actions
export const SACRED_COVENANTS = [
  {
    id: "covenant-001",
    title: "Platform Sacred Operating Covenant",
    description:
      "Core moral operating system governing all platform interactions and value flows",
    parties: ["CIVICA-144-PLATFORM", "ALL-PARTICIPANTS"],
    terms: [
      "No individual or entity shall control more than 20% of total platform value",
      "All AI systems must maintain ethical alignment score above 70",
      "Regional extraction ratios must remain below 1.0 averaged over 30 days",
      "All major decisions affecting >1000 users require ceremonial consensus",
      "Guardian interventions must be justified with sacred reasoning",
      "Wealth concentration triggers automatic redistribution ceremonies",
      "AI bias detection requires immediate corrective ritual action",
      "Bioregional balance maintained through regular flow ceremonies",
    ],
    enforcementLevel: "automatic",
    ceremonialRequirements: [
      "guardian_consensus",
      "platform_blessing",
      "user_consent",
    ],
    violationConsequences: [
      "system_pause",
      "wealth_redistribution",
      "governance_restructure",
    ],
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
    enforcementLevel: "ceremonial",
    ceremonialRequirements: [
      "guardian_oath",
      "community_witness",
      "ancestral_blessing",
    ],
    renewalCycle: "365 days",
  },
];

// Seed function to create Guardian users and system data
export async function seedGuardianData() {
  console.log("🌱 Starting Guardian Intelligence Layer data seeding...");

  try {
    // Check if Guardian users already exist
    const { data: existingGuardians } = await supabase
      .from("guardian_users")
      .select("guardian_name")
      .limit(1);

    if (existingGuardians && existingGuardians.length > 0) {
      console.log(
        "⚠️  Guardian users already exist. Skipping seed to prevent duplicates.",
      );
      return;
    }

    // First, create auth users for each guardian
    for (const guardian of GUARDIAN_SEED_DATA) {
      console.log(`Creating auth user for ${guardian.guardianName}...`);

      const { data: authUser, error: authError } =
        await supabase.auth.admin.createUser({
          email: guardian.email,
          password: guardian.password,
          email_confirm: true,
          user_metadata: {
            guardian_name: guardian.guardianName,
            access_level: guardian.accessLevel,
            specialization: guardian.specialization,
            created_by: "guardian_seed_script",
          },
        });

      if (authError) {
        console.error(
          `❌ Error creating auth user for ${guardian.guardianName}:`,
          authError,
        );
        continue;
      }

      console.log(`✅ Auth user created for ${guardian.guardianName}`);

      // Create Guardian user record
      const { error: guardianError } = await supabase
        .from("guardian_users")
        .insert({
          user_id: authUser.user?.id,
          guardian_name: guardian.guardianName,
          access_level: guardian.accessLevel,
          specialization: guardian.specialization,
          real_name: guardian.realName,
          bioregion: guardian.bioregion,
          cultural_lineage: guardian.culturalLineage,
          sacred_key: guardian.sacredKey,
          emergency_override_key: guardian.emergencyOverrideKey,
          activated_at: new Date().toISOString(),
          is_active: true,
          failsafe_permissions: guardian.failsafePermissions,
          ai_ethics_thresholds: guardian.aiEthicsThresholds,
          ceremonial_authorities: guardian.ceremonialAuthorities,
        });

      if (guardianError) {
        console.error(
          `❌ Error creating guardian user for ${guardian.guardianName}:`,
          guardianError,
        );
      } else {
        console.log(`✅ Guardian user created for ${guardian.guardianName}`);
      }
    }

    console.log(
      "🎉 Guardian Intelligence Layer seeding completed successfully!",
    );
    console.log("📋 Guardian Access Credentials:");

    // Display Guardian credentials (for secure storage)
    GUARDIAN_SEED_DATA.forEach((guardian) => {
      console.log(`\n🛡️  ${guardian.guardianName}:`);
      console.log(`   Email: ${guardian.email}`);
      console.log(`   Access Level: ${guardian.accessLevel}`);
      console.log(`   Specialization: ${guardian.specialization}`);
      console.log(`   Sacred Key: ${guardian.sacredKey}`);
      if (guardian.emergencyOverrideKey) {
        console.log(`   Emergency Override: ${guardian.emergencyOverrideKey}`);
      }
    });

    console.log(
      "\n⚠️  IMPORTANT: Store these credentials securely and share only with authorized Guardian personnel.",
    );
    console.log(
      "🔐 Consider implementing additional multi-factor authentication for production use.",
    );
  } catch (error) {
    console.error("❌ Fatal error during Guardian seeding:", error);
    throw error;
  }
}

// Export Guardian credentials for production use
export const PRODUCTION_GUARDIAN_CREDENTIALS = {
  // Primary Guardian Access (replaces demo credentials)
  primary: {
    username: "SacredKeeper.Eternal",
    password: "Sacred_Eternal_Guardian_2024!",
    sacredKey: "SK_ETERNAL_WISDOM_KEEPER_SACRED_2024",
  },

  // Balance Guardian
  balance: {
    username: "BalanceKeeper.Eternal",
    password: "Balance_Wealth_Guardian_2024!",
    sacredKey: "BK_WEALTH_BALANCE_KEEPER_2024",
  },

  // Regional Guardian
  regional: {
    username: "RegionalSteward.Earth",
    password: "Regional_Earth_Steward_2024!",
    sacredKey: "RS_BIOREGIONAL_EARTH_STEWARD_2024",
  },

  // AI Ethics Guardian
  aiEthics: {
    username: "AIWarden.Sacred",
    password: "AI_Sacred_Ethics_Warden_2024!",
    sacredKey: "AW_AI_SACRED_ETHICS_WARDEN_2024",
  },
};

export default seedGuardianData;
