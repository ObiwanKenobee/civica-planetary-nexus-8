import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { GuardianSession, GuardianCredentials } from "../types/guardian";
import guardianAuthService from "../services/guardianAuth";

interface GuardianAuthContextType {
  session: GuardianSession | null;
  login: (credentials: GuardianCredentials) => Promise<boolean>;
  loginWithSacredKey: (
    guardianName: string,
    sacredKey: string,
  ) => Promise<boolean>;
  emergencyLogin: (
    guardianName: string,
    emergencyKey: string,
  ) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
  hasCeremonialAuthority: (authority: string) => boolean;
  logAction: (
    actionType: string,
    targetSystem: string,
    details: Record<string, any>,
    justification?: string,
  ) => Promise<void>;
}

const GuardianAuthContext = createContext<GuardianAuthContextType | undefined>(
  undefined,
);

export function GuardianAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<GuardianSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Load existing session from the service
      const existingSession = guardianAuthService.getCurrentSession();
      setSession(existingSession);
    } catch (error) {
      console.error("Guardian service initialization error:", error);
      // Service unavailable, continue without session
      setSession(null);
    }
    setIsLoading(false);

    // Set up session refresh interval
    const refreshInterval = setInterval(
      async () => {
        try {
          const refreshed = await guardianAuthService.refreshSession();
          if (refreshed) {
            setSession(guardianAuthService.getCurrentSession());
          } else if (session) {
            setSession(null);
          }
        } catch (error) {
          console.error("Guardian session refresh error:", error);
          // If service is unavailable, clear session
          setSession(null);
        }
      },
      15 * 60 * 1000,
    ); // Check every 15 minutes

    return () => clearInterval(refreshInterval);
  }, []);

  const login = async (credentials: GuardianCredentials): Promise<boolean> => {
    setIsLoading(true);

    try {
      const result =
        await guardianAuthService.authenticateWithCredentials(credentials);

      if (result.session) {
        setSession(result.session);
        setIsLoading(false);
        return true;
      } else {
        console.error("Guardian login failed:", result.error);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Guardian login error:", error);
      setIsLoading(false);
      return false;
    }
  };

  const loginWithSacredKey = async (
    guardianName: string,
    sacredKey: string,
  ): Promise<boolean> => {
    setIsLoading(true);

    try {
      const result = await guardianAuthService.authenticateWithSacredKey(
        guardianName,
        sacredKey,
      );

      if (result.session) {
        setSession(result.session);
        setIsLoading(false);
        return true;
      } else {
        console.error("Sacred key authentication failed:", result.error);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Sacred key authentication error:", error);
      setIsLoading(false);
      return false;
    }
  };

  const emergencyLogin = async (
    guardianName: string,
    emergencyKey: string,
  ): Promise<boolean> => {
    setIsLoading(true);

    try {
      const result = await guardianAuthService.createEmergencySession(
        guardianName,
        emergencyKey,
      );

      if (result.session) {
        setSession(result.session);
        setIsLoading(false);
        return true;
      } else {
        console.error("Emergency login failed:", result.error);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Emergency login error:", error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    await guardianAuthService.logout();
    setSession(null);
    setIsLoading(false);
  };

  const hasPermission = (permission: string): boolean => {
    return guardianAuthService.hasPermission(permission);
  };

  const hasCeremonialAuthority = (authority: string): boolean => {
    return guardianAuthService.hasCeremonialAuthority(authority);
  };

  const logAction = async (
    actionType: string,
    targetSystem: string,
    details: Record<string, any>,
    justification?: string,
  ): Promise<void> => {
    try {
      await guardianAuthService.logGuardianAction(
        actionType,
        targetSystem,
        details,
        justification,
      );
    } catch (error) {
      console.error("Error logging Guardian action:", error);
    }
  };

  return (
    <GuardianAuthContext.Provider
      value={{
        session,
        login,
        loginWithSacredKey,
        emergencyLogin,
        logout,
        isLoading,
        hasPermission,
        hasCeremonialAuthority,
        logAction,
      }}
    >
      {children}
    </GuardianAuthContext.Provider>
  );
}

export function useGuardianAuth() {
  const context = useContext(GuardianAuthContext);
  if (context === undefined) {
    throw new Error(
      "useGuardianAuth must be used within a GuardianAuthProvider",
    );
  }
  return context;
}
