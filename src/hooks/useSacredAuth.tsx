
import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface SacredIdentity {
  id: string;
  identity_type: 'civic' | 'ancestral' | 'ecological' | 'digital' | 'spiritual' | 'proxy';
  identity_name: string;
  cultural_lineage?: string;
  ceremonial_title?: string;
  mythic_avatar?: string;
  proxy_represents?: string;
  sacred_key_phrase?: string;
  is_active: boolean;
}

interface RitualSession {
  id: string;
  identity_id: string;
  auth_method: 'ritual' | 'vow' | 'intention' | 'cultural_credential' | 'ancestral_token' | 'proxy_delegate';
  ritual_type: string;
  intention_statement?: string;
  memory_offering?: string;
  sacred_vow?: string;
  sdg_cluster_accessed?: string;
  is_active: boolean;
}

interface SacredAuthContextType {
  user: User | null;
  session: Session | null;
  sacredIdentities: SacredIdentity[];
  activeRitualSession: RitualSession | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  createSacredIdentity: (identity: Partial<SacredIdentity>) => Promise<{ error: any }>;
  startRitualSession: (identityId: string, ritualData: any) => Promise<{ error: any }>;
  endRitualSession: () => Promise<void>;
}

const SacredAuthContext = createContext<SacredAuthContextType | undefined>(undefined);

export const SacredAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [sacredIdentities, setSacredIdentities] = useState<SacredIdentity[]>([]);
  const [activeRitualSession, setActiveRitualSession] = useState<RitualSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            loadSacredIdentities();
            loadActiveRitualSession();
          }, 0);
        } else {
          setSacredIdentities([]);
          setActiveRitualSession(null);
        }
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadSacredIdentities();
        loadActiveRitualSession();
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadSacredIdentities = async () => {
    const { data, error } = await supabase
      .from('sacred_identities')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setSacredIdentities(data);
    }
  };

  const loadActiveRitualSession = async () => {
    const { data, error } = await supabase
      .from('ritual_sessions')
      .select('*')
      .eq('is_active', true)
      .order('session_start', { ascending: false })
      .limit(1)
      .single();
    
    if (!error && data) {
      setActiveRitualSession(data);
    }
  };

  const signUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error };
  };

  const signOut = async () => {
    await endRitualSession();
    await supabase.auth.signOut();
  };

  const createSacredIdentity = async (identity: Partial<SacredIdentity>) => {
    const { error } = await supabase
      .from('sacred_identities')
      .insert([identity]);
    
    if (!error) {
      await loadSacredIdentities();
    }
    return { error };
  };

  const startRitualSession = async (identityId: string, ritualData: any) => {
    // End any existing session first
    await endRitualSession();

    const { data, error } = await supabase.rpc('create_ritual_session', {
      p_identity_id: identityId,
      p_auth_method: ritualData.authMethod,
      p_ritual_type: ritualData.ritualType,
      p_intention_statement: ritualData.intentionStatement,
      p_memory_offering: ritualData.memoryOffering,
      p_sacred_vow: ritualData.sacredVow,
      p_sdg_cluster: ritualData.sdgCluster
    });

    if (!error) {
      await loadActiveRitualSession();
    }
    return { error };
  };

  const endRitualSession = async () => {
    if (activeRitualSession) {
      await supabase
        .from('ritual_sessions')
        .update({ 
          is_active: false,
          session_end: new Date().toISOString()
        })
        .eq('id', activeRitualSession.id);
      
      setActiveRitualSession(null);
    }
  };

  return (
    <SacredAuthContext.Provider value={{
      user,
      session,
      sacredIdentities,
      activeRitualSession,
      isLoading,
      signUp,
      signIn,
      signOut,
      createSacredIdentity,
      startRitualSession,
      endRitualSession
    }}>
      {children}
    </SacredAuthContext.Provider>
  );
};

export const useSacredAuth = () => {
  const context = useContext(SacredAuthContext);
  if (context === undefined) {
    throw new Error('useSacredAuth must be used within a SacredAuthProvider');
  }
  return context;
};
