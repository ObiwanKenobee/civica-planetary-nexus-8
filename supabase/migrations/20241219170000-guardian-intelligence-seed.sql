-- Guardian Intelligence Layer Official Access Seeding
-- Creates official Guardian users and access credentials for production use

-- Create Guardian-specific access levels and roles
CREATE TYPE public.guardian_access_level AS ENUM (
  'observer',        -- Read-only access to Guardian dashboards
  'analyst',         -- Full access to analytics and monitoring
  'curator',         -- Can modify failsafes and trigger ceremonies
  'overseer',        -- Full administrative access
  'sacred_keeper'    -- Ultimate authority over moral operating system
);

CREATE TYPE public.guardian_specialization AS ENUM (
  'balance_keeper',         -- Wealth concentration and governance capture prevention
  'regional_steward',       -- Bioregional funding and extraction monitoring
  'ai_ethics_warden',       -- AI systems ethical alignment enforcement
  'dispute_mediator',       -- Conflict resolution and ceremonial adjudication
  'covenant_guardian',      -- Sacred contract and agreement oversight
  'ritual_technologist',    -- System integration and sacred technology
  'wisdom_keeper'           -- Overall platform moral guidance
);

-- Guardian Intelligence Layer users table
CREATE TABLE public.guardian_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  guardian_name TEXT NOT NULL UNIQUE,
  access_level guardian_access_level NOT NULL,
  specialization guardian_specialization NOT NULL,
  real_name TEXT,
  bioregion TEXT,
  cultural_lineage TEXT,
  sacred_key TEXT NOT NULL, -- Unique access key for Guardian systems
  emergency_override_key TEXT, -- For critical system interventions
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  activated_at TIMESTAMP WITH TIME ZONE,
  last_active TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  failsafe_permissions JSONB DEFAULT '{}',
  ai_ethics_thresholds JSONB DEFAULT '{}',
  ceremonial_authorities JSONB DEFAULT '[]'
);

-- Guardian access sessions for secure authentication
CREATE TABLE public.guardian_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guardian_user_id UUID REFERENCES public.guardian_users NOT NULL,
  session_key TEXT NOT NULL UNIQUE,
  access_scope JSONB NOT NULL, -- What systems this session can access
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Guardian action log for all interventions and decisions
CREATE TABLE public.guardian_actions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guardian_user_id UUID REFERENCES public.guardian_users NOT NULL,
  action_type TEXT NOT NULL,
  target_system TEXT NOT NULL,
  action_details JSONB NOT NULL,
  justification TEXT,
  affected_users TEXT[],
  value_impact DECIMAL,
  ceremony_invoked TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  requires_consensus BOOLEAN DEFAULT false,
  consensus_achieved BOOLEAN DEFAULT false
);

-- Sacred covenant bindings for Guardian authorities
CREATE TABLE public.guardian_covenant_bindings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guardian_user_id UUID REFERENCES public.guardian_users NOT NULL,
  covenant_id TEXT NOT NULL,
  binding_type TEXT NOT NULL, -- 'monitor', 'enforce', 'modify'
  authority_level INTEGER NOT NULL DEFAULT 1, -- 1-10 scale
  sacred_vow TEXT,
  bound_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  witnessed_by UUID REFERENCES public.guardian_users
);

-- Enable RLS on Guardian tables
ALTER TABLE public.guardian_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guardian_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guardian_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guardian_covenant_bindings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Guardian tables
CREATE POLICY "Guardian users can view their own profile" 
  ON public.guardian_users 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Guardian users can view other active guardians" 
  ON public.guardian_users 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Guardian users can view their own sessions" 
  ON public.guardian_sessions 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.guardian_users 
    WHERE id = guardian_sessions.guardian_user_id 
    AND user_id = auth.uid()
  ));

CREATE POLICY "Guardian users can view actions they performed" 
  ON public.guardian_actions 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.guardian_users 
    WHERE id = guardian_actions.guardian_user_id 
    AND user_id = auth.uid()
  ));

-- Create Guardian authentication function
CREATE OR REPLACE FUNCTION public.authenticate_guardian(
  p_guardian_name TEXT,
  p_sacred_key TEXT
)
RETURNS TABLE(
  guardian_id UUID,
  access_level guardian_access_level,
  specialization guardian_specialization,
  permissions JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  guardian_record public.guardian_users%ROWTYPE;
BEGIN
  -- Find guardian by name and validate sacred key
  SELECT * INTO guardian_record
  FROM public.guardian_users
  WHERE guardian_name = p_guardian_name
    AND sacred_key = p_sacred_key
    AND is_active = true;
  
  IF guardian_record.id IS NULL THEN
    RAISE EXCEPTION 'Invalid Guardian credentials';
  END IF;
  
  -- Update last active timestamp
  UPDATE public.guardian_users
  SET last_active = now()
  WHERE id = guardian_record.id;
  
  -- Return guardian info
  RETURN QUERY SELECT 
    guardian_record.id,
    guardian_record.access_level,
    guardian_record.specialization,
    jsonb_build_object(
      'failsafe_permissions', guardian_record.failsafe_permissions,
      'ai_ethics_thresholds', guardian_record.ai_ethics_thresholds,
      'ceremonial_authorities', guardian_record.ceremonial_authorities
    );
END;
$$;

-- Create function to log Guardian actions
CREATE OR REPLACE FUNCTION public.log_guardian_action(
  p_guardian_id UUID,
  p_action_type TEXT,
  p_target_system TEXT,
  p_action_details JSONB,
  p_justification TEXT DEFAULT NULL,
  p_affected_users TEXT[] DEFAULT '{}',
  p_value_impact DECIMAL DEFAULT NULL,
  p_ceremony_invoked TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  action_id UUID;
BEGIN
  INSERT INTO public.guardian_actions (
    guardian_user_id,
    action_type,
    target_system,
    action_details,
    justification,
    affected_users,
    value_impact,
    ceremony_invoked
  ) VALUES (
    p_guardian_id,
    p_action_type,
    p_target_system,
    p_action_details,
    p_justification,
    p_affected_users,
    p_value_impact,
    p_ceremony_invoked
  ) RETURNING id INTO action_id;
  
  RETURN action_id;
END;
$$;

-- Seed official Guardian Intelligence Layer users
-- Note: In production, these should be created through secure ceremony

-- 1. Sacred Keeper (Ultimate Authority)
INSERT INTO public.guardian_users (
  user_id,
  guardian_name,
  access_level,
  specialization,
  real_name,
  bioregion,
  cultural_lineage,
  sacred_key,
  emergency_override_key,
  activated_at,
  failsafe_permissions,
  ai_ethics_thresholds,
  ceremonial_authorities
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'guardian@civica144.org' LIMIT 1),
  'SacredKeeper.Eternal',
  'sacred_keeper',
  'wisdom_keeper',
  'Sacred Technology Council',
  'Global Network',
  'Multi-Traditional Wisdom Synthesis',
  'SK_' || encode(gen_random_bytes(32), 'hex'),
  'EMERGENCY_' || encode(gen_random_bytes(32), 'hex'),
  now(),
  '{"all_systems": true, "emergency_shutdown": true, "covenant_modification": true}',
  '{"minimum_score": 70, "intervention_threshold": 60, "shutdown_threshold": 40}',
  '["platform_wide_ceremonies", "covenant_creation", "guardian_appointment", "system_blessing"]'
);

-- 2. Balance Keeper (Wealth & Governance)
INSERT INTO public.guardian_users (
  user_id,
  guardian_name,
  access_level,
  specialization,
  real_name,
  bioregion,
  sacred_key,
  activated_at,
  failsafe_permissions,
  ai_ethics_thresholds,
  ceremonial_authorities
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'balance@civica144.org' LIMIT 1),
  'BalanceKeeper.Eternal',
  'overseer',
  'balance_keeper',
  'Wealth Concentration Monitor',
  'Global Network',
  'BK_' || encode(gen_random_bytes(32), 'hex'),
  now(),
  '{"wealth_redistribution": true, "governance_intervention": true, "voting_pause": true}',
  '{"bias_threshold": 75, "concentration_limit": 20}',
  '["redistribution_ceremony", "wealth_blessing", "governance_realignment"]'
);

-- 3. Regional Steward (Bioregional Balance)
INSERT INTO public.guardian_users (
  user_id,
  guardian_name,
  access_level,
  specialization,
  real_name,
  bioregion,
  sacred_key,
  activated_at,
  failsafe_permissions,
  ceremonial_authorities
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'regional@civica144.org' LIMIT 1),
  'RegionalSteward.Earth',
  'curator',
  'regional_steward',
  'Bioregional Flow Guardian',
  'Global Network',
  'RS_' || encode(gen_random_bytes(32), 'hex'),
  now(),
  '{"fund_redistribution": true, "extraction_limits": true, "bioregion_protection": true}',
  '["bioregional_blessing", "extraction_ceremony", "funding_redistribution"]'
);

-- 4. AI Ethics Warden
INSERT INTO public.guardian_users (
  user_id,
  guardian_name,
  access_level,
  specialization,
  real_name,
  bioregion,
  sacred_key,
  activated_at,
  failsafe_permissions,
  ai_ethics_thresholds,
  ceremonial_authorities
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'ai-ethics@civica144.org' LIMIT 1),
  'AIWarden.Sacred',
  'curator',
  'ai_ethics_warden',
  'Artificial Intelligence Ethics Guardian',
  'Digital Realm',
  'AW_' || encode(gen_random_bytes(32), 'hex'),
  now(),
  '{"ai_system_pause": true, "algorithm_modification": true, "ethics_enforcement": true}',
  '{"minimum_ethics_score": 70, "bias_alert_threshold": 65, "emergency_shutdown": 40}',
  '["ai_blessing_ceremony", "algorithm_purification", "digital_ethics_ritual"]'
);

-- 5. Dispute Mediator
INSERT INTO public.guardian_users (
  user_id,
  guardian_name,
  access_level,
  specialization,
  real_name,
  bioregion,
  sacred_key,
  activated_at,
  ceremonial_authorities
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'mediation@civica144.org' LIMIT 1),
  'DisputeMediator.Wisdom',
  'analyst',
  'dispute_mediator',
  'Sacred Conflict Resolution Council',
  'Global Network',
  'DM_' || encode(gen_random_bytes(32), 'hex'),
  now(),
  '["dispute_ceremony", "reconciliation_ritual", "justice_blessing", "healing_circle"]'
);

-- 6. Ritual Technologist (System Integration)
INSERT INTO public.guardian_users (
  user_id,
  guardian_name,
  access_level,
  specialization,
  real_name,
  bioregion,
  sacred_key,
  activated_at,
  failsafe_permissions,
  ceremonial_authorities
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'ritual-tech@civica144.org' LIMIT 1),
  'RitualTech.Sacred',
  'analyst',
  'ritual_technologist',
  'Sacred Technology Integration Guardian',
  'Digital-Physical Bridge',
  'RT_' || encode(gen_random_bytes(32), 'hex'),
  now(),
  '{"system_integration": true, "ritual_automation": true, "ceremony_triggers": true}',
  '["system_blessing", "integration_ceremony", "technology_purification"]'
);

-- Create covenant bindings for all guardians to the Platform Sacred Operating Covenant
INSERT INTO public.guardian_covenant_bindings (
  guardian_user_id,
  covenant_id,
  binding_type,
  authority_level,
  sacred_vow
)
SELECT 
  gu.id,
  'covenant-001', -- Platform Sacred Operating Covenant
  CASE 
    WHEN gu.access_level = 'sacred_keeper' THEN 'modify'
    WHEN gu.access_level = 'overseer' THEN 'enforce'
    WHEN gu.access_level = 'curator' THEN 'enforce'
    ELSE 'monitor'
  END,
  CASE 
    WHEN gu.access_level = 'sacred_keeper' THEN 10
    WHEN gu.access_level = 'overseer' THEN 8
    WHEN gu.access_level = 'curator' THEN 6
    WHEN gu.access_level = 'analyst' THEN 4
    ELSE 2
  END,
  'I vow to uphold the sacred moral operating system of CIVICA-144 and protect the collective flourishing of all beings through wise and compassionate technological stewardship.'
FROM public.guardian_users gu;

-- Create initial Guardian access tracking
CREATE TABLE public.guardian_access_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guardian_user_id UUID REFERENCES public.guardian_users NOT NULL,
  access_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  access_type TEXT NOT NULL, -- 'login', 'dashboard_view', 'action_taken', 'ceremony_invoked'
  system_accessed TEXT,
  ip_address INET,
  session_duration INTERVAL,
  actions_taken JSONB DEFAULT '[]'
);

ALTER TABLE public.guardian_access_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Guardian users can view their own access logs" 
  ON public.guardian_access_log 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.guardian_users 
    WHERE id = guardian_access_log.guardian_user_id 
    AND user_id = auth.uid()
  ));

-- Function to create Guardian session
CREATE OR REPLACE FUNCTION public.create_guardian_session(
  p_guardian_name TEXT,
  p_sacred_key TEXT,
  p_access_scope JSONB DEFAULT '{}',
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS TABLE(
  session_key TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  guardian_info JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  guardian_record public.guardian_users%ROWTYPE;
  new_session_key TEXT;
  session_expires TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Authenticate guardian
  SELECT * INTO guardian_record
  FROM public.guardian_users
  WHERE guardian_name = p_guardian_name
    AND sacred_key = p_sacred_key
    AND is_active = true;
  
  IF guardian_record.id IS NULL THEN
    RAISE EXCEPTION 'Invalid Guardian credentials';
  END IF;
  
  -- Generate session key and expiration
  new_session_key := 'GS_' || encode(gen_random_bytes(32), 'hex');
  session_expires := now() + INTERVAL '8 hours';
  
  -- Create session
  INSERT INTO public.guardian_sessions (
    guardian_user_id,
    session_key,
    access_scope,
    ip_address,
    user_agent,
    expires_at
  ) VALUES (
    guardian_record.id,
    new_session_key,
    p_access_scope,
    p_ip_address,
    p_user_agent,
    session_expires
  );
  
  -- Log access
  INSERT INTO public.guardian_access_log (
    guardian_user_id,
    access_type,
    system_accessed,
    ip_address
  ) VALUES (
    guardian_record.id,
    'login',
    'Guardian Intelligence Layer',
    p_ip_address
  );
  
  -- Return session info
  RETURN QUERY SELECT 
    new_session_key,
    session_expires,
    jsonb_build_object(
      'guardian_id', guardian_record.id,
      'guardian_name', guardian_record.guardian_name,
      'access_level', guardian_record.access_level,
      'specialization', guardian_record.specialization,
      'permissions', jsonb_build_object(
        'failsafe_permissions', guardian_record.failsafe_permissions,
        'ai_ethics_thresholds', guardian_record.ai_ethics_thresholds,
        'ceremonial_authorities', guardian_record.ceremonial_authorities
      )
    );
END;
$$;

-- Create indexes for performance
CREATE INDEX idx_guardian_users_guardian_name ON public.guardian_users(guardian_name);
CREATE INDEX idx_guardian_users_access_level ON public.guardian_users(access_level);
CREATE INDEX idx_guardian_sessions_session_key ON public.guardian_sessions(session_key);
CREATE INDEX idx_guardian_sessions_expires_at ON public.guardian_sessions(expires_at);
CREATE INDEX idx_guardian_actions_guardian_user_id ON public.guardian_actions(guardian_user_id);
CREATE INDEX idx_guardian_actions_created_at ON public.guardian_actions(created_at);
CREATE INDEX idx_guardian_access_log_guardian_user_id ON public.guardian_access_log(guardian_user_id);
CREATE INDEX idx_guardian_access_log_access_time ON public.guardian_access_log(access_time);

COMMENT ON TABLE public.guardian_users IS 'Official Guardian Intelligence Layer users with sacred access credentials';
COMMENT ON TABLE public.guardian_sessions IS 'Active Guardian authentication sessions';
COMMENT ON TABLE public.guardian_actions IS 'Log of all Guardian interventions and ceremonial actions';
COMMENT ON TABLE public.guardian_covenant_bindings IS 'Sacred covenant bindings that define Guardian authorities';
