import { supabase } from "../integrations/supabase/client";
import { GuardianSession, GuardianCredentials } from "../types/guardian";

interface GuardianUser {
  id: string;
  guardian_name: string;
  access_level:
    | "observer"
    | "analyst"
    | "curator"
    | "overseer"
    | "sacred_keeper";
  specialization: string;
  real_name: string;
  bioregion: string;
  cultural_lineage?: string;
  failsafe_permissions: Record<string, boolean>;
  ai_ethics_thresholds: Record<string, number>;
  ceremonial_authorities: string[];
  is_active: boolean;
}

interface GuardianAuthResponse {
  session: GuardianSession | null;
  error?: string;
}

class GuardianAuthService {
  private static instance: GuardianAuthService;
  private currentSession: GuardianSession | null = null;

  private constructor() {
    this.loadSessionFromStorage();
  }

  public static getInstance(): GuardianAuthService {
    if (!GuardianAuthService.instance) {
      GuardianAuthService.instance = new GuardianAuthService();
    }
    return GuardianAuthService.instance;
  }

  private loadSessionFromStorage(): void {
    try {
      const storedSession = localStorage.getItem("guardian-session");
      if (storedSession) {
        const parsedSession = JSON.parse(storedSession);
        const expiresAt = new Date(parsedSession.expiresAt);

        if (expiresAt > new Date()) {
          this.currentSession = {
            ...parsedSession,
            expiresAt,
          };
        } else {
          this.clearSession();
        }
      }
    } catch (error) {
      console.error("Error loading Guardian session:", error);
      this.clearSession();
    }
  }

  private saveSessionToStorage(session: GuardianSession): void {
    localStorage.setItem("guardian-session", JSON.stringify(session));
  }

  private clearSession(): void {
    this.currentSession = null;
    localStorage.removeItem("guardian-session");
  }

  public async authenticateWithSacredKey(
    guardianName: string,
    sacredKey: string,
  ): Promise<GuardianAuthResponse> {
    try {
      // Call the Supabase function for Guardian authentication
      const { data, error } = await supabase.rpc("authenticate_guardian", {
        p_guardian_name: guardianName,
        p_sacred_key: sacredKey,
      });

      if (error) {
        console.error("Guardian authentication error:", error);

        // Check if this is a missing function error (database not seeded yet)
        if (
          error.message?.includes("function") &&
          error.message?.includes("does not exist")
        ) {
          console.warn(
            "Guardian database functions not available. Please run migration: supabase migration up",
          );
          return { session: null, error: "Guardian database not initialized" };
        }

        return { session: null, error: "Invalid Guardian credentials" };
      }

      if (!data || data.length === 0) {
        return { session: null, error: "Guardian not found or inactive" };
      }

      const guardianData = data[0];

      // Create Guardian session
      const session: GuardianSession = {
        isAuthenticated: true,
        user: guardianName,
        accessLevel: guardianData.access_level,
        specialization: guardianData.specialization,
        guardianId: guardianData.guardian_id,
        permissions: guardianData.permissions,
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours
        sessionType: "sacred_key",
      };

      this.currentSession = session;
      this.saveSessionToStorage(session);

      // Log the Guardian access
      await this.logGuardianAccess(
        guardianData.guardian_id,
        "login",
        "Guardian Intelligence Layer",
      );

      return { session };
    } catch (error) {
      console.error("Guardian authentication service error:", error);
      return { session: null, error: "Authentication service unavailable" };
    }
  }

  public async authenticateWithCredentials(
    credentials: GuardianCredentials,
  ): Promise<GuardianAuthResponse> {
    try {
      // For backward compatibility, try to authenticate with Supabase auth
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: this.mapUsernameToEmail(credentials.username),
          password: credentials.password,
        });

      if (authError || !authData.user) {
        return { session: null, error: "Invalid Guardian credentials" };
      }

      // Get Guardian user data
      const { data: guardianUser, error: guardianError } = await supabase
        .from("guardian_users")
        .select("*")
        .eq("user_id", authData.user.id)
        .eq("is_active", true)
        .single();

      if (guardianError) {
        console.error("Guardian user lookup error:", guardianError);
        await supabase.auth.signOut(); // Clean up auth session

        // Check if this is a missing table error
        if (
          guardianError.message?.includes("relation") &&
          guardianError.message?.includes("does not exist")
        ) {
          console.warn(
            "Guardian tables not available. Please run migration: supabase migration up",
          );
          return { session: null, error: "Guardian database not initialized" };
        }

        return { session: null, error: "Guardian profile not found" };
      }

      if (!guardianUser) {
        await supabase.auth.signOut(); // Clean up auth session
        return { session: null, error: "Guardian profile not found" };
      }

      const session: GuardianSession = {
        isAuthenticated: true,
        user: guardianUser.guardian_name,
        accessLevel: guardianUser.access_level,
        specialization: guardianUser.specialization,
        guardianId: guardianUser.id,
        permissions: {
          failsafe_permissions: guardianUser.failsafe_permissions,
          ai_ethics_thresholds: guardianUser.ai_ethics_thresholds,
          ceremonial_authorities: guardianUser.ceremonial_authorities,
        },
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours
        sessionType: "credentials",
      };

      this.currentSession = session;
      this.saveSessionToStorage(session);

      // Log the Guardian access
      await this.logGuardianAccess(
        guardianUser.id,
        "login",
        "Guardian Intelligence Layer",
      );

      return { session };
    } catch (error) {
      console.error("Guardian credential authentication error:", error);
      return { session: null, error: "Authentication service error" };
    }
  }

  public async createEmergencySession(
    guardianName: string,
    emergencyOverrideKey: string,
  ): Promise<GuardianAuthResponse> {
    try {
      // Verify emergency override key
      const { data: guardianUser, error } = await supabase
        .from("guardian_users")
        .select("*")
        .eq("guardian_name", guardianName)
        .eq("emergency_override_key", emergencyOverrideKey)
        .eq("is_active", true)
        .single();

      if (error) {
        console.error("Emergency override lookup error:", error);

        // Check if this is a missing table error
        if (
          error.message?.includes("relation") &&
          error.message?.includes("does not exist")
        ) {
          console.warn(
            "Guardian tables not available. Please run migration: supabase migration up",
          );
          return { session: null, error: "Guardian database not initialized" };
        }

        return {
          session: null,
          error: "Invalid emergency override credentials",
        };
      }

      if (!guardianUser) {
        return {
          session: null,
          error: "Invalid emergency override credentials",
        };
      }

      const session: GuardianSession = {
        isAuthenticated: true,
        user: guardianUser.guardian_name,
        accessLevel: guardianUser.access_level,
        specialization: guardianUser.specialization,
        guardianId: guardianUser.id,
        permissions: {
          failsafe_permissions: {
            ...guardianUser.failsafe_permissions,
            emergency_override: true,
          },
          ai_ethics_thresholds: guardianUser.ai_ethics_thresholds,
          ceremonial_authorities: [
            ...guardianUser.ceremonial_authorities,
            "emergency_intervention",
          ],
        },
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours for emergency
        sessionType: "emergency",
        isEmergencySession: true,
      };

      this.currentSession = session;
      this.saveSessionToStorage(session);

      // Log emergency access
      await this.logGuardianAccess(
        guardianUser.id,
        "emergency_login",
        "Emergency Override System",
      );

      return { session };
    } catch (error) {
      console.error("Emergency session creation error:", error);
      return { session: null, error: "Emergency authentication failed" };
    }
  }

  private mapUsernameToEmail(username: string): string {
    // Map Guardian usernames to their corresponding email addresses
    const emailMap: Record<string, string> = {
      "SacredKeeper.Eternal": "guardian@civica144.org",
      "BalanceKeeper.Eternal": "balance@civica144.org",
      "RegionalSteward.Earth": "regional@civica144.org",
      "AIWarden.Sacred": "ai-ethics@civica144.org",
      "DisputeMediator.Wisdom": "mediation@civica144.org",
      "RitualTech.Sacred": "ritual-tech@civica144.org",
      "CovenantGuardian.Eternal": "covenant@civica144.org",
      // Legacy demo mapping
      "guardian-demo": "guardian@civica144.org",
    };

    return emailMap[username] || `${username}@civica144.org`;
  }

  private async logGuardianAccess(
    guardianId: string,
    accessType: string,
    systemAccessed: string,
  ): Promise<void> {
    try {
      await supabase.from("guardian_access_log").insert({
        guardian_user_id: guardianId,
        access_type: accessType,
        system_accessed: systemAccessed,
        ip_address: await this.getClientIP(),
        actions_taken: [],
      });
    } catch (error) {
      console.error("Error logging Guardian access:", error);
    }
  }

  private async getClientIP(): Promise<string | null> {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch {
      return null;
    }
  }

  public async logGuardianAction(
    actionType: string,
    targetSystem: string,
    actionDetails: Record<string, any>,
    justification?: string,
    affectedUsers?: string[],
    valueImpact?: number,
    ceremonyInvoked?: string,
  ): Promise<void> {
    if (!this.currentSession || !this.currentSession.guardianId) {
      throw new Error("No active Guardian session");
    }

    try {
      const { error } = await supabase.rpc("log_guardian_action", {
        p_guardian_id: this.currentSession.guardianId,
        p_action_type: actionType,
        p_target_system: targetSystem,
        p_action_details: actionDetails,
        p_justification: justification,
        p_affected_users: affectedUsers || [],
        p_value_impact: valueImpact,
        p_ceremony_invoked: ceremonyInvoked,
      });

      if (error) {
        console.error("Error logging Guardian action:", error);
      }
    } catch (error) {
      console.error("Guardian action logging service error:", error);
    }
  }

  public getCurrentSession(): GuardianSession | null {
    return this.currentSession;
  }

  public isAuthenticated(): boolean {
    return (
      this.currentSession?.isAuthenticated === true &&
      this.currentSession.expiresAt > new Date()
    );
  }

  public hasPermission(permission: string): boolean {
    if (!this.currentSession) return false;

    const permissions = this.currentSession.permissions?.failsafe_permissions;
    return (
      permissions?.[permission] === true || permissions?.all_systems === true
    );
  }

  public hasCeremonialAuthority(authority: string): boolean {
    if (!this.currentSession) return false;

    const authorities =
      this.currentSession.permissions?.ceremonial_authorities || [];
    return authorities.includes(authority);
  }

  public async logout(): Promise<void> {
    if (this.currentSession?.guardianId) {
      await this.logGuardianAccess(
        this.currentSession.guardianId,
        "logout",
        "Guardian Intelligence Layer",
      );
    }

    // Sign out from Supabase auth if credential-based session
    if (this.currentSession?.sessionType === "credentials") {
      await supabase.auth.signOut();
    }

    this.clearSession();
  }

  public async refreshSession(): Promise<boolean> {
    if (!this.currentSession) return false;

    try {
      // For sacred key sessions, just extend the expiration
      if (this.currentSession.sessionType === "sacred_key") {
        this.currentSession.expiresAt = new Date(
          Date.now() + 8 * 60 * 60 * 1000,
        );
        this.saveSessionToStorage(this.currentSession);
        return true;
      }

      // For credential sessions, refresh with Supabase
      if (this.currentSession.sessionType === "credentials") {
        const { data, error } = await supabase.auth.refreshSession();
        if (error || !data.session) {
          this.clearSession();
          return false;
        }

        this.currentSession.expiresAt = new Date(
          Date.now() + 8 * 60 * 60 * 1000,
        );
        this.saveSessionToStorage(this.currentSession);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Session refresh error:", error);
      return false;
    }
  }
}

export default GuardianAuthService.getInstance();
