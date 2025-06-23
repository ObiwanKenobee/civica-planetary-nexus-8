# Guardian Intelligence Layer - Official Setup Guide

## 🛡️ Overview

The Guardian Intelligence Layer is the sacred moral operating system that oversees CIVICA-144's ethical alignment, wealth distribution, and AI systems. This guide covers the complete setup of official Guardian credentials and database seeding.

## 🗃️ Database Schema

### Core Tables

- **`guardian_users`** - Official Guardian profiles with sacred keys
- **`guardian_sessions`** - Secure authentication sessions
- **`guardian_actions`** - Audit log of all Guardian interventions
- **`guardian_covenant_bindings`** - Sacred covenant authorities
- **`guardian_access_log`** - Access tracking and monitoring

### Access Levels

1. **Sacred Keeper** (`sacred_keeper`) - Ultimate authority over moral operating system
2. **Overseer** (`overseer`) - Full administrative access to specific domains
3. **Curator** (`curator`) - Can modify failsafes and trigger ceremonies
4. **Analyst** (`analyst`) - Full access to analytics and monitoring
5. **Observer** (`observer`) - Read-only access to Guardian dashboards

### Specializations

- **Wisdom Keeper** - Overall platform moral guidance
- **Balance Keeper** - Wealth concentration and governance capture prevention
- **Regional Steward** - Bioregional funding and extraction monitoring
- **AI Ethics Warden** - AI systems ethical alignment enforcement
- **Dispute Mediator** - Conflict resolution and ceremonial adjudication
- **Covenant Guardian** - Sacred contract and agreement oversight
- **Ritual Technologist** - System integration and sacred technology

## 🌱 Database Seeding

### Prerequisites

1. **Supabase Project** - Active Supabase project with admin access
2. **Environment Variables** - Properly configured Supabase credentials
3. **Database Migrations** - All Guardian migrations applied

### Environment Setup

Create or update your `.env.local` file:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Guardian Security Keys (Generate unique values)
GUARDIAN_MASTER_KEY=your_master_guardian_key
GUARDIAN_ENCRYPTION_SALT=your_encryption_salt
```

### Running the Seeding

#### Option 1: NPM Script (Recommended)

```bash
# Run the complete Guardian setup
npm run guardian:setup

# Or run just the seeding
npm run seed:guardian
```

#### Option 2: Direct Execution

```bash
# Run the seeding script directly
node scripts/seed-guardian-data.js
```

#### Option 3: Supabase Migration

```bash
# Apply the Guardian migration (creates tables and seed data)
supabase migration up

# Or apply specific migration
supabase migration up --target 20241219170000
```

### What Gets Created

The seeding process creates **7 official Guardian users**:

1. **SacredKeeper.Eternal** - Sacred Keeper / Wisdom Keeper
2. **BalanceKeeper.Eternal** - Overseer / Balance Keeper
3. **RegionalSteward.Earth** - Curator / Regional Steward
4. **AIWarden.Sacred** - Curator / AI Ethics Warden
5. **DisputeMediator.Wisdom** - Analyst / Dispute Mediator
6. **RitualTech.Sacred** - Analyst / Ritual Technologist
7. **CovenantGuardian.Eternal** - Overseer / Covenant Guardian

## 🔐 Guardian Credentials

### Official Production Credentials

```typescript
// Primary Sacred Keeper (Highest Authority)
{
  username: 'SacredKeeper.Eternal',
  email: 'guardian@civica144.org',
  password: 'Sacred_Eternal_Guardian_2024!',
  sacredKey: 'SK_ETERNAL_WISDOM_KEEPER_SACRED_2024',
  emergencyKey: 'EMERGENCY_SACRED_OVERRIDE_ETERNAL_2024'
}

// Balance Guardian (Wealth Monitoring)
{
  username: 'BalanceKeeper.Eternal',
  email: 'balance@civica144.org',
  password: 'Balance_Wealth_Guardian_2024!',
  sacredKey: 'BK_WEALTH_BALANCE_KEEPER_2024'
}

// Regional Guardian (Bioregional Stewardship)
{
  username: 'RegionalSteward.Earth',
  email: 'regional@civica144.org',
  password: 'Regional_Earth_Steward_2024!',
  sacredKey: 'RS_BIOREGIONAL_EARTH_STEWARD_2024'
}

// AI Ethics Guardian
{
  username: 'AIWarden.Sacred',
  email: 'ai-ethics@civica144.org',
  password: 'AI_Sacred_Ethics_Warden_2024!',
  sacredKey: 'AW_AI_SACRED_ETHICS_WARDEN_2024'
}
```

> ⚠️ **SECURITY CRITICAL**: Store these credentials securely. Never commit to version control.

## 🔄 Authentication Methods

### 1. Sacred Key Authentication (Recommended)

```typescript
import guardianAuthService from "@/services/guardianAuth";

const result = await guardianAuthService.authenticateWithSacredKey(
  "SacredKeeper.Eternal",
  "SK_ETERNAL_WISDOM_KEEPER_SACRED_2024",
);
```

### 2. Email/Password Authentication

```typescript
const result = await guardianAuthService.authenticateWithCredentials({
  username: "SacredKeeper.Eternal",
  password: "Sacred_Eternal_Guardian_2024!",
});
```

### 3. Emergency Override

```typescript
const result = await guardianAuthService.createEmergencySession(
  "SacredKeeper.Eternal",
  "EMERGENCY_SACRED_OVERRIDE_ETERNAL_2024",
);
```

## 🎭 Guardian Permissions

### Failsafe Permissions

```typescript
{
  all_systems: boolean,           // Sacred Keeper only
  emergency_shutdown: boolean,    // Sacred Keeper only
  wealth_redistribution: boolean, // Balance Keeper
  ai_system_pause: boolean,       // AI Ethics Warden
  fund_redistribution: boolean,   // Regional Steward
  covenant_modification: boolean  // Sacred Keeper only
}
```

### Ceremonial Authorities

```typescript
[
  "platform_wide_ceremonies", // Sacred Keeper
  "redistribution_ceremony", // Balance Keeper
  "bioregional_blessing", // Regional Steward
  "ai_blessing_ceremony", // AI Ethics Warden
  "dispute_ceremony", // Dispute Mediator
  "system_blessing", // Ritual Technologist
  "covenant_creation", // Covenant Guardian
];
```

## 📊 Monitoring & Auditing

### Guardian Action Logging

All Guardian actions are automatically logged:

```typescript
await guardianAuthService.logAction(
  "wealth_redistribution",
  "global_flourish_system",
  {
    redistributed_amount: 15000,
    trigger: "concentration_threshold",
    affected_entities: ["entity_1", "entity_2"],
  },
  "Automated redistribution triggered by 18% concentration threshold breach",
);
```

### Access Monitoring

- All Guardian logins tracked with IP addresses
- Session duration monitoring
- Unusual access pattern detection
- Ceremony invocation logging

## 🔧 Troubleshooting

### Common Issues

#### 1. Migration Fails

```bash
# Check Supabase connection
supabase status

# Verify project configuration
supabase projects list

# Reset and reapply migrations
supabase db reset
supabase migration up
```

#### 2. Authentication Errors

```bash
# Verify environment variables
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY

# Check Guardian user exists
supabase sql --db-url $DATABASE_URL --file check_guardians.sql
```

#### 3. Permission Denied

- Verify Supabase service role key has admin permissions
- Check Row Level Security (RLS) policies
- Ensure Guardian user is properly activated

### Debug Queries

```sql
-- Check Guardian users
SELECT guardian_name, access_level, is_active FROM guardian_users;

-- Check recent Guardian actions
SELECT * FROM guardian_actions ORDER BY created_at DESC LIMIT 10;

-- Check active sessions
SELECT * FROM guardian_sessions WHERE is_active = true;
```

## 🛡️ Security Best Practices

### Production Deployment

1. **Environment Isolation**

   - Use separate Supabase projects for dev/staging/production
   - Rotate Guardian credentials regularly
   - Implement IP whitelisting for Guardian access

2. **Multi-Factor Authentication**

   - Add MFA for all Guardian accounts
   - Use hardware security keys where possible
   - Implement biometric authentication

3. **Monitoring & Alerting**

   - Set up Guardian access alerts
   - Monitor unusual login patterns
   - Track ceremonial intervention frequency

4. **Regular Audits**
   - Monthly Guardian action reviews
   - Quarterly credential rotation
   - Annual security assessments

### Emergency Procedures

1. **Guardian Compromise**

   ```sql
   -- Immediately deactivate Guardian
   UPDATE guardian_users SET is_active = false WHERE guardian_name = 'CompromisedGuardian';

   -- Revoke all active sessions
   UPDATE guardian_sessions SET is_active = false WHERE guardian_user_id = 'guardian_id';
   ```

2. **System Override**
   - Use Sacred Keeper emergency override key
   - Initiate platform-wide ceremony pause
   - Activate manual intervention protocols

## 📚 Additional Resources

- [Guardian Intelligence Layer Architecture](./docs/guardian-architecture.md)
- [Sacred Covenant Documentation](./docs/sacred-covenants.md)
- [API Reference](./docs/guardian-api.md)
- [Ceremony Protocols](./docs/ceremony-protocols.md)

## 🌟 Support

For Guardian Intelligence Layer support:

- Technical Issues: `tech@civica144.org`
- Security Concerns: `security@civica144.org`
- Emergency Contact: `guardian@civica144.org`

---

_Sacred Technology in Service of Collective Flourishing_

**CIVICA-144 Guardian Intelligence Layer**
_Protecting the Moral Operating System of Regenerative Civilization_
