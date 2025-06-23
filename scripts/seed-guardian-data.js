// Guardian Intelligence Layer Database Seeding Execution
// Direct JavaScript execution of seeding logic

const { createClient } = require("@supabase/supabase-js");

// Guardian seed data - production credentials
const GUARDIAN_SEED_DATA = [
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
];

async function seedGuardianData() {
  console.log("🌱 Starting Guardian Intelligence Layer data seeding...");

  // Check environment variables
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error(
      "❌ Missing Supabase configuration. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.",
    );
    return;
  }

  // Create Supabase client with service role key for admin operations
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  try {
    console.log("🔍 Checking for existing Guardian users...");

    // Check if Guardian users already exist to prevent duplicates
    const { data: existingGuardians, error: checkError } = await supabase
      .from("guardian_users")
      .select("guardian_name")
      .limit(1);

    if (checkError) {
      console.error(
        "❌ Error checking existing guardians:",
        checkError.message,
      );
      console.log(
        "💡 This might be expected if the Guardian tables haven't been created yet.",
      );
      console.log(
        "📝 Make sure to run the Guardian migration first: supabase migration up",
      );
      return;
    }

    if (existingGuardians && existingGuardians.length > 0) {
      console.log(
        "⚠️  Guardian users already exist. Skipping seed to prevent duplicates.",
      );
      console.log("✅ Guardian Intelligence Layer is already seeded.");
      return;
    }

    console.log("👥 Creating Guardian auth users and profiles...");

    // Create Guardian users
    for (const guardian of GUARDIAN_SEED_DATA) {
      console.log(`📧 Creating auth user for ${guardian.guardianName}...`);

      // Create auth user using admin API
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
            is_guardian: true,
          },
        });

      if (authError) {
        console.error(
          `❌ Error creating auth user for ${guardian.guardianName}:`,
          authError.message,
        );
        continue;
      }

      if (!authUser.user) {
        console.error(`❌ No user returned for ${guardian.guardianName}`);
        continue;
      }

      console.log(
        `✅ Auth user created for ${guardian.guardianName} (ID: ${authUser.user.id})`,
      );

      // Create Guardian user record
      console.log(
        `🛡️  Creating Guardian profile for ${guardian.guardianName}...`,
      );

      const { error: guardianError } = await supabase
        .from("guardian_users")
        .insert({
          user_id: authUser.user.id,
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
          `❌ Error creating guardian profile for ${guardian.guardianName}:`,
          guardianError.message,
        );
      } else {
        console.log(`✅ Guardian profile created for ${guardian.guardianName}`);
      }
    }

    console.log(
      "\n🎉 Guardian Intelligence Layer seeding completed successfully!",
    );
    console.log("\n📋 Guardian Access Credentials Summary:");
    console.log("=====================================");

    // Display Guardian credentials summary
    GUARDIAN_SEED_DATA.forEach((guardian, index) => {
      console.log(`\n${index + 1}. 🛡️  ${guardian.guardianName}`);
      console.log(`   📧 Email: ${guardian.email}`);
      console.log(
        `   🎭 Role: ${guardian.accessLevel} (${guardian.specialization})`,
      );
      console.log(`   🔑 Sacred Key: ${guardian.sacredKey}`);
      if (guardian.emergencyOverrideKey) {
        console.log(`   🚨 Emergency Key: ${guardian.emergencyOverrideKey}`);
      }
    });

    console.log("\n⚠️  SECURITY IMPORTANT:");
    console.log("   🔐 Store these credentials securely");
    console.log("   🚫 Never commit credentials to version control");
    console.log("   👥 Share only with authorized Guardian personnel");
    console.log("   🔄 Consider implementing MFA for production");
    console.log("   📊 Monitor Guardian access logs regularly");

    console.log("\n🎯 Next Steps:");
    console.log("   1. Update Guardian authentication system");
    console.log("   2. Test login with new credentials");
    console.log("   3. Configure production environment");
    console.log("   4. Set up Guardian monitoring alerts");
    console.log("   5. Conduct Guardian security audit");
  } catch (error) {
    console.error("\n❌ Fatal error during Guardian seeding:", error);
    console.error("\n🔧 Troubleshooting suggestions:");
    console.error("   • Verify Supabase connection settings");
    console.error("   • Check database permissions");
    console.error("   • Ensure Guardian migrations are applied");
    console.error("   • Validate environment variables");
    console.error("   • Check network connectivity");

    throw error;
  }
}

// Run the seeding if this script is executed directly
if (require.main === module) {
  seedGuardianData()
    .then(() => {
      console.log(
        "\n🌟 Guardian Intelligence Layer seeding process completed!",
      );
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n💥 Guardian seeding failed:", error.message);
      process.exit(1);
    });
}

module.exports = { seedGuardianData, GUARDIAN_SEED_DATA };
