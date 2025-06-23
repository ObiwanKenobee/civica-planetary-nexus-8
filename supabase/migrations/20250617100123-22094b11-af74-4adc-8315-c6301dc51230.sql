
-- Create enum types for sacred authentication
CREATE TYPE public.identity_type AS ENUM ('civic', 'ancestral', 'ecological', 'digital', 'spiritual', 'proxy');
CREATE TYPE public.auth_method AS ENUM ('ritual', 'vow', 'intention', 'cultural_credential', 'ancestral_token', 'proxy_delegate');
CREATE TYPE public.consent_scope AS ENUM ('personal', 'ancestral', 'ecological', 'future_generational', 'cosmic');

-- Sacred identities table - supports plural identities per user
CREATE TABLE public.sacred_identities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  identity_type identity_type NOT NULL,
  identity_name TEXT NOT NULL,
  cultural_lineage TEXT,
  ceremonial_title TEXT,
  mythic_avatar TEXT,
  proxy_represents TEXT, -- For ecosystem/future generation representation
  sacred_key_phrase TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  activated_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT false
);

-- Ritual authentication sessions
CREATE TABLE public.ritual_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  identity_id UUID REFERENCES public.sacred_identities NOT NULL,
  auth_method auth_method NOT NULL,
  ritual_type TEXT NOT NULL,
  intention_statement TEXT,
  memory_offering TEXT,
  sacred_vow TEXT,
  sdg_cluster_accessed TEXT,
  session_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  session_end TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true
);

-- Consent ledger for data sovereignty
CREATE TABLE public.consent_ledger (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  identity_id UUID REFERENCES public.sacred_identities NOT NULL,
  consent_scope consent_scope NOT NULL,
  data_layer TEXT NOT NULL,
  granted_to TEXT, -- Who has access
  granted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  revoked_at TIMESTAMP WITH TIME ZONE,
  conditions JSONB, -- Smart contract conditions
  is_active BOOLEAN DEFAULT true
);

-- Cultural credentials issued by communities
CREATE TABLE public.cultural_credentials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identity_id UUID REFERENCES public.sacred_identities NOT NULL,
  issuer_community TEXT NOT NULL,
  credential_type TEXT NOT NULL,
  credential_name TEXT NOT NULL,
  verification_method TEXT,
  issued_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB,
  is_verified BOOLEAN DEFAULT false
);

-- Ancestral and future tokens
CREATE TABLE public.temporal_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identity_id UUID REFERENCES public.sacred_identities NOT NULL,
  token_type TEXT NOT NULL, -- 'ancestral' or 'future_generational'
  lineage_name TEXT,
  generation_span TEXT,
  sacred_story TEXT,
  guardian_permissions JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.sacred_identities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ritual_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consent_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cultural_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.temporal_tokens ENABLE ROW LEVEL SECURITY;

-- RLS Policies for sacred_identities
CREATE POLICY "Users can view their own sacred identities" 
  ON public.sacred_identities 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sacred identities" 
  ON public.sacred_identities 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sacred identities" 
  ON public.sacred_identities 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS Policies for ritual_sessions
CREATE POLICY "Users can view their own ritual sessions" 
  ON public.ritual_sessions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own ritual sessions" 
  ON public.ritual_sessions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for consent_ledger
CREATE POLICY "Users can view their own consent records" 
  ON public.consent_ledger 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own consent records" 
  ON public.consent_ledger 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own consent records" 
  ON public.consent_ledger 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS Policies for cultural_credentials
CREATE POLICY "Users can view credentials for their identities" 
  ON public.cultural_credentials 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.sacred_identities 
    WHERE id = cultural_credentials.identity_id 
    AND user_id = auth.uid()
  ));

-- RLS Policies for temporal_tokens
CREATE POLICY "Users can view tokens for their identities" 
  ON public.temporal_tokens 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.sacred_identities 
    WHERE id = temporal_tokens.identity_id 
    AND user_id = auth.uid()
  ));

-- Function to create ritual session
CREATE OR REPLACE FUNCTION public.create_ritual_session(
  p_identity_id UUID,
  p_auth_method auth_method,
  p_ritual_type TEXT,
  p_intention_statement TEXT DEFAULT NULL,
  p_memory_offering TEXT DEFAULT NULL,
  p_sacred_vow TEXT DEFAULT NULL,
  p_sdg_cluster TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  session_id UUID;
BEGIN
  INSERT INTO public.ritual_sessions (
    user_id,
    identity_id,
    auth_method,
    ritual_type,
    intention_statement,
    memory_offering,
    sacred_vow,
    sdg_cluster_accessed
  ) VALUES (
    auth.uid(),
    p_identity_id,
    p_auth_method,
    p_ritual_type,
    p_intention_statement,
    p_memory_offering,
    p_sacred_vow,
    p_sdg_cluster
  ) RETURNING id INTO session_id;
  
  RETURN session_id;
END;
$$;
