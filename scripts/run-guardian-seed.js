#!/usr/bin/env node

// Guardian Intelligence Layer Database Seeding Script
// Runs the TypeScript seeding function from Node.js

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

console.log("🛡️  Guardian Intelligence Layer Database Seeding");
console.log("================================================");

// Check if TypeScript files exist
const seedFile = path.join(__dirname, "seed-guardian-data.ts");
if (!fs.existsSync(seedFile)) {
  console.error("❌ Guardian seed file not found:", seedFile);
  process.exit(1);
}

try {
  console.log("📦 Installing dependencies if needed...");

  // Check if ts-node is available
  try {
    execSync("npx ts-node --version", { stdio: "ignore" });
  } catch (error) {
    console.log("Installing ts-node...");
    execSync("npm install --save-dev ts-node", { stdio: "inherit" });
  }

  console.log("🌱 Running Guardian database seeding...");

  // Run the TypeScript seeding script
  const seedCommand = `npx ts-node -r tsconfig-paths/register "${seedFile}"`;
  execSync(seedCommand, { stdio: "inherit", cwd: path.join(__dirname, "..") });

  console.log(
    "\n✅ Guardian Intelligence Layer seeding completed successfully!",
  );
  console.log("\n📋 Next steps:");
  console.log("   1. Verify Guardian users in Supabase dashboard");
  console.log("   2. Test Guardian authentication with official credentials");
  console.log("   3. Configure production environment variables");
  console.log("   4. Set up Guardian monitoring and alerting");

  console.log("\n⚠️  Security Notice:");
  console.log("   • Store Guardian credentials securely");
  console.log("   • Implement multi-factor authentication for production");
  console.log("   • Regular Guardian access audits recommended");
  console.log("   • Monitor Guardian action logs for unusual activity");
} catch (error) {
  console.error("\n❌ Guardian seeding failed:", error.message);
  console.error("\n🔧 Troubleshooting:");
  console.error("   • Check Supabase connection configuration");
  console.error("   • Verify database permissions");
  console.error("   • Ensure migrations have been run");
  console.error("   • Check environment variables");
  process.exit(1);
}
