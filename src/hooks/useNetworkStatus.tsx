// CIVICA 144 Network Status Hook
// Advanced network monitoring and offline handling

import { useState, useEffect, useCallback, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export interface NetworkStatus {
  isOnline: boolean;
  isSlowConnection: boolean;
  connectionType:
    | "unknown"
    | "ethernet"
    | "wifi"
    | "cellular"
    | "bluetooth"
    | "wimax"
    | "other";
  effectiveType: "slow-2g" | "2g" | "3g" | "4g" | "unknown";
  downlink: number;
  rtt: number;
  saveData: boolean;
  lastOnline: Date | null;
  lastOffline: Date | null;
  outageCount: number;
  reconnectAttempts: number;
}

export interface NetworkRecovery {
  isRecovering: boolean;
  retryConnection: () => Promise<boolean>;
  clearOutages: () => void;
  getNetworkHealth: () => "excellent" | "good" | "poor" | "critical";
}

const useNetworkStatus = (): NetworkStatus & NetworkRecovery => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
    isSlowConnection: false,
    connectionType: "unknown",
    effectiveType: "unknown",
    downlink: 0,
    rtt: 0,
    saveData: false,
    lastOnline: null,
    lastOffline: null,
    outageCount: 0,
    reconnectAttempts: 0,
  });

  const [isRecovering, setIsRecovering] = useState(false);
  const { toast } = useToast();
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const healthCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get network connection info
  const getConnectionInfo = useCallback(() => {
    if (typeof navigator === "undefined") return {};

    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    if (!connection) return {};

    return {
      connectionType: connection.type || "unknown",
      effectiveType: connection.effectiveType || "unknown",
      downlink: connection.downlink || 0,
      rtt: connection.rtt || 0,
      saveData: connection.saveData || false,
      isSlowConnection:
        connection.effectiveType === "slow-2g" ||
        connection.effectiveType === "2g",
    };
  }, []);

  // Test actual connectivity (not just navigator.onLine)
  const testConnectivity = useCallback(async (): Promise<boolean> => {
    try {
      // Test with a small request to the dev server
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch("/?_health_check=" + Date.now(), {
        method: "HEAD",
        cache: "no-cache",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.warn("🌐 Connectivity test failed:", error);
      return false;
    }
  }, []);

  // Handle going online
  const handleOnline = useCallback(async () => {
    console.log("🌐 Browser reports online status");

    // Verify actual connectivity
    const isReallyOnline = await testConnectivity();

    if (isReallyOnline) {
      const connectionInfo = getConnectionInfo();

      setNetworkStatus((prev) => ({
        ...prev,
        isOnline: true,
        lastOnline: new Date(),
        reconnectAttempts: 0,
        ...connectionInfo,
      }));

      setIsRecovering(false);

      // Show success toast
      toast({
        title: "🌐 Connection Restored",
        description: "Successfully reconnected to CIVICA network",
        duration: 3000,
      });

      console.log("✅ Network connectivity verified and restored");
    } else {
      console.warn("⚠️ Browser reports online but connectivity test failed");
      // Will retry with the regular health check
    }
  }, [getConnectionInfo, testConnectivity, toast]);

  // Handle going offline
  const handleOffline = useCallback(() => {
    console.log("📴 Browser reports offline status");

    setNetworkStatus((prev) => ({
      ...prev,
      isOnline: false,
      lastOffline: new Date(),
      outageCount: prev.outageCount + 1,
    }));

    // Show offline notification
    toast({
      title: "📴 Connection Lost",
      description: "Application has gone offline. Attempting to reconnect...",
      variant: "destructive",
      duration: 5000,
    });

    // Start recovery attempts
    setIsRecovering(true);
    attemptReconnection();
  }, [toast]);

  // Attempt automatic reconnection
  const attemptReconnection = useCallback(async () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    const maxAttempts = 10;
    const baseDelay = 2000; // Start with 2 seconds

    const attempt = async (attemptNumber: number): Promise<void> => {
      if (attemptNumber > maxAttempts) {
        console.error("🚨 Max reconnection attempts reached");
        setIsRecovering(false);
        toast({
          title: "🚨 Connection Failed",
          description: `Failed to reconnect after ${maxAttempts} attempts. Please check your network.`,
          variant: "destructive",
          duration: 10000,
        });
        return;
      }

      console.log(`🔄 Reconnection attempt ${attemptNumber}/${maxAttempts}`);

      setNetworkStatus((prev) => ({
        ...prev,
        reconnectAttempts: attemptNumber,
      }));

      const isConnected = await testConnectivity();

      if (isConnected && navigator.onLine) {
        await handleOnline();
        return;
      }

      // Exponential backoff with jitter
      const delay =
        Math.min(baseDelay * Math.pow(2, attemptNumber - 1), 30000) +
        Math.random() * 1000;

      reconnectTimeoutRef.current = setTimeout(() => {
        attempt(attemptNumber + 1);
      }, delay);
    };

    attempt(1);
  }, [handleOnline, testConnectivity, toast]);

  // Manual retry function
  const retryConnection = useCallback(async (): Promise<boolean> => {
    console.log("🔄 Manual connection retry initiated");
    setIsRecovering(true);

    const isConnected = await testConnectivity();

    if (isConnected) {
      await handleOnline();
      return true;
    } else {
      attemptReconnection();
      return false;
    }
  }, [attemptReconnection, handleOnline, testConnectivity]);

  // Clear outage history
  const clearOutages = useCallback(() => {
    setNetworkStatus((prev) => ({
      ...prev,
      outageCount: 0,
      reconnectAttempts: 0,
    }));
  }, []);

  // Get network health score
  const getNetworkHealth = useCallback(():
    | "excellent"
    | "good"
    | "poor"
    | "critical" => {
    if (!networkStatus.isOnline) return "critical";
    if (networkStatus.outageCount > 5) return "poor";
    if (networkStatus.isSlowConnection) return "poor";
    if (networkStatus.rtt > 1000) return "poor";
    if (networkStatus.outageCount > 2) return "good";
    return "excellent";
  }, [networkStatus]);

  // Periodic health check
  const performHealthCheck = useCallback(async () => {
    if (!networkStatus.isOnline) return;

    const isStillOnline = await testConnectivity();

    if (!isStillOnline && navigator.onLine) {
      console.warn("⚠️ Health check failed despite browser reporting online");
      handleOffline();
    }
  }, [networkStatus.isOnline, testConnectivity, handleOffline]);

  // Setup event listeners and intervals
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initial connectivity check
    testConnectivity().then((isConnected) => {
      const connectionInfo = getConnectionInfo();
      setNetworkStatus((prev) => ({
        ...prev,
        isOnline: isConnected && navigator.onLine,
        ...connectionInfo,
      }));
    });

    // Online/offline event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Connection change listener
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    const handleConnectionChange = () => {
      const connectionInfo = getConnectionInfo();
      setNetworkStatus((prev) => ({
        ...prev,
        ...connectionInfo,
      }));
    };

    if (connection) {
      connection.addEventListener("change", handleConnectionChange);
    }

    // Periodic health check (every 30 seconds)
    healthCheckIntervalRef.current = setInterval(performHealthCheck, 30000);

    // Cleanup
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);

      if (connection) {
        connection.removeEventListener("change", handleConnectionChange);
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      if (healthCheckIntervalRef.current) {
        clearInterval(healthCheckIntervalRef.current);
      }
    };
  }, [handleOnline, handleOffline, getConnectionInfo, performHealthCheck]);

  return {
    ...networkStatus,
    isRecovering,
    retryConnection,
    clearOutages,
    getNetworkHealth,
  };
};

export default useNetworkStatus;
