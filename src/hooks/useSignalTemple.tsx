// SignalTemple Integration Hooks
import { useState, useEffect, useCallback } from "react";
import {
  SubscriptionContract,
  WhisperFeedItem,
  SacredSignal,
  ConsentPreferences,
  SemanticIntent,
} from "@/types/signalTemple";
import signalTemple from "@/services/signalTemple";

// Hook for managing user's signal temple subscriptions
export const useSignalSubscriptions = (userId: string) => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionContract[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSubscriptions = useCallback(async () => {
    try {
      setIsLoading(true);
      const subs = await signalTemple.getSubscriptions(userId);
      setSubscriptions(subs);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load subscriptions",
      );
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadSubscriptions();
  }, [loadSubscriptions]);

  const createScrollFollow = useCallback(
    async (authorId: string, scrollId: string) => {
      try {
        const subscription = await signalTemple.createScrollFollowSubscription(
          userId,
          authorId,
          scrollId,
        );
        setSubscriptions((prev) => [...prev, subscription]);
        return subscription;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to create subscription",
        );
        throw err;
      }
    },
    [userId],
  );

  const createClusterAlignment = useCallback(
    async (clusterId: number) => {
      try {
        const subscription =
          await signalTemple.createClusterAlignmentSubscription(
            userId,
            clusterId,
          );
        setSubscriptions((prev) => [...prev, subscription]);
        return subscription;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to create subscription",
        );
        throw err;
      }
    },
    [userId],
  );

  const createFlourishSubscription = useCallback(
    async (transactionId: string, amount: number, purpose: string) => {
      try {
        const subscription =
          await signalTemple.createFlourishTransactionSubscription(
            userId,
            transactionId,
            amount,
            purpose,
          );
        setSubscriptions((prev) => [...prev, subscription]);
        return subscription;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to create subscription",
        );
        throw err;
      }
    },
    [userId],
  );

  return {
    subscriptions,
    isLoading,
    error,
    refresh: loadSubscriptions,
    createScrollFollow,
    createClusterAlignment,
    createFlourishSubscription,
  };
};

// Hook for managing whisper feed
export const useWhisperFeed = (userId: string, maxItems: number = 20) => {
  const [whispers, setWhispers] = useState<WhisperFeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWhispers = useCallback(async () => {
    try {
      setIsLoading(true);
      const feed = await signalTemple.getWhisperFeed(userId, maxItems);
      setWhispers(feed);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load whispers");
    } finally {
      setIsLoading(false);
    }
  }, [userId, maxItems]);

  useEffect(() => {
    loadWhispers();

    // Auto-refresh every 30 seconds
    const interval = setInterval(loadWhispers, 30000);
    return () => clearInterval(interval);
  }, [loadWhispers]);

  const markAsRead = useCallback(
    async (whisperId: string) => {
      try {
        await signalTemple.markWhisperAsRead(userId, whisperId);
        setWhispers((prev) =>
          prev.map((w) => (w.id === whisperId ? { ...w, isRead: true } : w)),
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to mark as read");
      }
    },
    [userId],
  );

  const archiveWhisper = useCallback(
    async (whisperId: string) => {
      try {
        await signalTemple.archiveWhisper(userId, whisperId);
        setWhispers((prev) => prev.filter((w) => w.id !== whisperId));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to archive whisper",
        );
      }
    },
    [userId],
  );

  const unreadCount = whispers.filter((w) => !w.isRead).length;

  return {
    whispers,
    unreadCount,
    isLoading,
    error,
    refresh: loadWhispers,
    markAsRead,
    archiveWhisper,
  };
};

// Hook for managing consent preferences
export const useConsentPreferences = (userId: string) => {
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPreferences = useCallback(async () => {
    try {
      setIsLoading(true);
      const prefs = await signalTemple.getConsentPreferences(userId);
      setPreferences(prefs);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load preferences",
      );
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadPreferences();
  }, [loadPreferences]);

  const updatePreferences = useCallback(
    async (updates: Partial<ConsentPreferences>) => {
      if (!preferences) return;

      const optimisticUpdate = { ...preferences, ...updates };
      setPreferences(optimisticUpdate);

      try {
        const updated = await signalTemple.updateConsentPreferences(
          userId,
          updates,
        );
        setPreferences(updated);
        setError(null);
        return updated;
      } catch (err) {
        // Revert optimistic update on error
        setPreferences(preferences);
        setError(
          err instanceof Error ? err.message : "Failed to update preferences",
        );
        throw err;
      }
    },
    [userId, preferences],
  );

  return {
    preferences,
    isLoading,
    error,
    refresh: loadPreferences,
    updatePreferences,
  };
};

// Hook for semantic intent analysis
export const useSemanticIntent = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeIntent = useCallback(
    async (query: string, userRole: any): Promise<SemanticIntent | null> => {
      try {
        setIsAnalyzing(true);
        setError(null);
        const intent = await signalTemple.analyzeSemanticIntent(
          query,
          userRole,
        );
        return intent;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to analyze intent",
        );
        return null;
      } finally {
        setIsAnalyzing(false);
      }
    },
    [],
  );

  return {
    analyzeIntent,
    isAnalyzing,
    error,
  };
};

// Hook for composing and sending signals
export const useSignalComposer = (authorId: string) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const composeSignal = useCallback(
    async (
      signalData: Omit<SacredSignal, "id" | "createdAt" | "engagement">,
    ): Promise<SacredSignal | null> => {
      try {
        setIsSubmitting(true);
        setError(null);
        const signal = await signalTemple.composeSignal({
          ...signalData,
          authorId,
        });
        return signal;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to send signal");
        return null;
      } finally {
        setIsSubmitting(false);
      }
    },
    [authorId],
  );

  return {
    composeSignal,
    isSubmitting,
    error,
  };
};

// Hook for biome and cluster status monitoring
export const useSystemStatus = () => {
  const [biomeStatus, setBiomeStatus] = useState<any[]>([]);
  const [clusterStatus, setClusterStatus] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStatus = useCallback(async () => {
    try {
      setIsLoading(true);
      const [biome, cluster] = await Promise.all([
        signalTemple.getBiomeStatus(),
        signalTemple.getClusterStatus(),
      ]);
      setBiomeStatus(biome);
      setClusterStatus(cluster);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load system status",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStatus();

    // Auto-refresh every minute
    const interval = setInterval(loadStatus, 60000);
    return () => clearInterval(interval);
  }, [loadStatus]);

  const criticalBiomes = biomeStatus.filter(
    (b) => b.urgencyLevel === "critical",
  );
  const urgentClusters = clusterStatus.filter((c) => c.status === "critical");

  return {
    biomeStatus,
    clusterStatus,
    criticalBiomes,
    urgentClusters,
    isLoading,
    error,
    refresh: loadStatus,
  };
};

// Hook for integration with Flourish transactions
export const useFlourishIntegration = (userId: string) => {
  const { createFlourishSubscription } = useSignalSubscriptions(userId);

  const handleFlourishTransaction = useCallback(
    async (
      transactionId: string,
      amount: number,
      purpose: string,
      metadata?: any,
    ) => {
      try {
        // Create signal temple subscription
        const subscription = await createFlourishSubscription(
          transactionId,
          amount,
          purpose,
        );

        // Could trigger other integrations here (e.g., Guardian notifications)
        console.log(
          "Flourish transaction integrated with SignalTemple:",
          subscription,
        );

        return subscription;
      } catch (error) {
        console.error("Failed to integrate Flourish transaction:", error);
        throw error;
      }
    },
    [createFlourishSubscription],
  );

  return {
    handleFlourishTransaction,
  };
};
