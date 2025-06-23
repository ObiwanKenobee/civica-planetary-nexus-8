// SignalTemple Service - Core logic for the intelligent newsletter system
import {
  SubscriptionContract,
  SacredSignal,
  ConsentPreferences,
  WhisperFeedItem,
  SemanticTag,
  UserRole,
  BiomeRegion,
  SubscriptionTrigger,
  SacredFrequency,
  BiomeHealthStatus,
  ClusterStatus,
  SemanticIntent,
} from "@/types/signalTemple";

class SignalTempleService {
  private subscriptions: Map<string, SubscriptionContract[]> = new Map();
  private signals: SacredSignal[] = [];
  private whisperFeeds: Map<string, WhisperFeedItem[]> = new Map();
  private consentVault: Map<string, ConsentPreferences> = new Map();
  private biomeStatus: Map<BiomeRegion, BiomeHealthStatus> = new Map();
  private clusterStatus: Map<number, ClusterStatus> = new Map();

  constructor() {
    this.initializeMockData();
    this.startSacredCycles();
  }

  // INTELLIGENT SUBSCRIPTION ENTRYPOINTS

  async createScrollFollowSubscription(
    userId: string,
    scrollAuthorId: string,
    scrollId: string,
  ): Promise<SubscriptionContract> {
    const authorRole = await this.getUserRole(scrollAuthorId);
    const authorTags = await this.getAuthorSemanticTags(scrollAuthorId);

    const contract: SubscriptionContract = {
      id: `scroll_follow_${Date.now()}`,
      userId,
      triggerType: "scroll_follow",
      triggerData: { scrollAuthorId, scrollId },
      roleId: await this.getUserRole(userId),
      semanticTags: authorTags,
      frequency: "weekly_pulse",
      channels: ["ritual_notifications", "bioregional_whisper_feed"],
      consentLevel: "implied",
      createdAt: new Date(),
      lastEcho: null,
      isActive: true,
      metadata: {
        sourceScroll: scrollId,
        intentionMessage: `Following the wisdom path of ${scrollAuthorId}`,
      },
    };

    this.addSubscription(userId, contract);
    return contract;
  }

  async createClusterAlignmentSubscription(
    userId: string,
    clusterId: number,
  ): Promise<SubscriptionContract> {
    const clusterInfo = this.clusterStatus.get(clusterId);

    const contract: SubscriptionContract = {
      id: `cluster_${clusterId}_${Date.now()}`,
      userId,
      triggerType: "cluster_alignment",
      triggerData: { clusterId },
      clusterId,
      roleId: await this.getUserRole(userId),
      semanticTags: clusterInfo?.currentFocus || ["governance"],
      frequency: "cluster_cycle",
      channels: ["ritual_notifications", "in_app_pulse"],
      consentLevel: "explicit",
      createdAt: new Date(),
      lastEcho: null,
      isActive: true,
      metadata: {
        intentionMessage: `Aligned with Cluster ${clusterId} for collective wisdom`,
      },
    };

    this.addSubscription(userId, contract);
    return contract;
  }

  async createFlourishTransactionSubscription(
    userId: string,
    transactionId: string,
    amount: number,
    purpose: string,
  ): Promise<SubscriptionContract> {
    const contract: SubscriptionContract = {
      id: `flourish_${transactionId}`,
      userId,
      triggerType: "flourish_transaction",
      triggerData: { transactionId, amount, purpose },
      roleId: await this.getUserRole(userId),
      semanticTags: ["abundance", "regeneration"],
      frequency: "immediate_echo",
      channels: ["ritual_notifications", "encrypted_scrolls"],
      consentLevel: "sacred_bond",
      createdAt: new Date(),
      lastEcho: null,
      isActive: true,
      metadata: {
        sourceFlourishTx: transactionId,
        intentionMessage: `Sacred exchange: ${purpose}`,
      },
    };

    this.addSubscription(userId, contract);

    // Immediate blessing receipt
    await this.sendFlourishBlessing(userId, contract, amount, purpose);

    return contract;
  }

  async createRitualAttendanceSubscription(
    userId: string,
    ritualId: string,
    ritualType: string,
  ): Promise<SubscriptionContract> {
    const contract: SubscriptionContract = {
      id: `ritual_${ritualId}_${Date.now()}`,
      userId,
      triggerType: "ritual_invocation",
      triggerData: { ritualId, ritualType },
      roleId: await this.getUserRole(userId),
      semanticTags: ["ritual", "ceremony", "healing"],
      frequency: "full_moon",
      channels: ["ritual_notifications", "bioregional_whisper_feed"],
      consentLevel: "sacred_bond",
      createdAt: new Date(),
      lastEcho: null,
      isActive: true,
      metadata: {
        sourceRitual: ritualId,
        intentionMessage: `Entered sacred space: ${ritualType}`,
      },
    };

    this.addSubscription(userId, contract);
    return contract;
  }

  // SEMANTIC INTENT ANALYSIS

  async analyzeSemanticIntent(
    query: string,
    userRole: UserRole,
  ): Promise<SemanticIntent> {
    // Simplified semantic analysis - in production would use LangChain/Haystack
    const tagMappings: Record<string, SemanticTag[]> = {
      healing: ["healing", "ritual", "regeneration"],
      technology: ["technology", "consciousness"],
      nature: ["ecology", "regeneration"],
      ceremony: ["ritual", "ceremony"],
      wisdom: ["wisdom", "consciousness"],
      governance: ["governance", "technology"],
    };

    let extractedTags: SemanticTag[] = [];

    Object.entries(tagMappings).forEach(([keyword, tags]) => {
      if (query.toLowerCase().includes(keyword)) {
        extractedTags.push(...tags);
      }
    });

    // Remove duplicates
    extractedTags = [...new Set(extractedTags)];

    return {
      query,
      extractedTags,
      userRole,
      confidence: 0.85,
      suggestedSubscriptions: [],
      ritualRecommendations: [
        "Morning intention setting",
        "Evening gratitude practice",
        "Weekly wisdom gathering",
      ],
    };
  }

  // SIGNAL COMPOSITION AND ROUTING

  async composeSignal(
    signal: Omit<SacredSignal, "id" | "createdAt" | "engagement">,
  ): Promise<SacredSignal> {
    const fullSignal: SacredSignal = {
      ...signal,
      id: `signal_${Date.now()}`,
      createdAt: new Date(),
      engagement: {
        echoes: 0,
        gratitude: 0,
        ritual_completions: 0,
      },
    };

    this.signals.push(fullSignal);
    await this.routeSignalToSubscribers(fullSignal);

    return fullSignal;
  }

  private async routeSignalToSubscribers(signal: SacredSignal): Promise<void> {
    // Get all user subscriptions
    for (const [userId, subscriptions] of this.subscriptions.entries()) {
      const matchingSubscriptions = subscriptions.filter((sub) =>
        this.doesSignalMatchSubscription(signal, sub),
      );

      if (matchingSubscriptions.length > 0) {
        await this.deliverSignalToUser(
          userId,
          signal,
          matchingSubscriptions[0],
        );
      }
    }
  }

  private doesSignalMatchSubscription(
    signal: SacredSignal,
    subscription: SubscriptionContract,
  ): boolean {
    // Check semantic tag overlap
    const tagOverlap = signal.semanticTags.some((tag) =>
      subscription.semanticTags.includes(tag),
    );

    // Check role targeting
    const roleMatch =
      signal.targetRoles.length === 0 ||
      signal.targetRoles.includes(subscription.roleId);

    // Check cluster targeting
    const clusterMatch =
      signal.targetClusters.length === 0 ||
      (subscription.clusterId &&
        signal.targetClusters.includes(subscription.clusterId));

    // Check bioregion targeting
    const bioregionMatch =
      signal.targetBioregions.length === 0 ||
      (subscription.bioregion &&
        signal.targetBioregions.includes(subscription.bioregion));

    return (
      subscription.isActive &&
      tagOverlap &&
      roleMatch &&
      clusterMatch &&
      bioregionMatch
    );
  }

  private async deliverSignalToUser(
    userId: string,
    signal: SacredSignal,
    subscription: SubscriptionContract,
  ): Promise<void> {
    const whisperItem: WhisperFeedItem = {
      id: `whisper_${signal.id}_${userId}`,
      signalId: signal.id,
      userId,
      type: "signal",
      title: signal.title,
      preview: signal.content.substring(0, 200) + "...",
      fullContent: signal.content,
      semanticTags: signal.semanticTags,
      urgencyLevel: signal.urgencyLevel,
      isRead: false,
      receivedAt: new Date(),
      actions: {
        canEcho: true,
        canShare: true,
        canArchive: true,
        requiresResponse: signal.urgencyLevel === "urgent_call",
      },
      metadata: {
        sourceType: subscription.triggerType,
        authorRole: await this.getUserRole(signal.authorId),
        clusterId: subscription.clusterId,
        bioregion: subscription.bioregion,
      },
    };

    // Add to whisper feed
    if (!this.whisperFeeds.has(userId)) {
      this.whisperFeeds.set(userId, []);
    }
    this.whisperFeeds.get(userId)!.unshift(whisperItem);

    // Limit whisper feed size
    const feed = this.whisperFeeds.get(userId)!;
    if (feed.length > 50) {
      this.whisperFeeds.set(userId, feed.slice(0, 50));
    }
  }

  // CONSENT VAULT MANAGEMENT

  async updateConsentPreferences(
    userId: string,
    preferences: Partial<ConsentPreferences>,
  ): Promise<ConsentPreferences> {
    const existing =
      this.consentVault.get(userId) ||
      this.getDefaultConsentPreferences(userId);
    const updated = { ...existing, ...preferences };

    this.consentVault.set(userId, updated);
    return updated;
  }

  async getConsentPreferences(userId: string): Promise<ConsentPreferences> {
    return (
      this.consentVault.get(userId) || this.getDefaultConsentPreferences(userId)
    );
  }

  private getDefaultConsentPreferences(userId: string): ConsentPreferences {
    return {
      userId,
      globalConsent: true,
      channels: {
        email: false,
        ritual_notifications: true,
        encrypted_scrolls: false,
        bioregional_whisper_feed: true,
        in_app_pulse: true,
      },
      frequencies: {
        full_moon: true,
        new_moon: false,
        equinox: true,
        weekly_pulse: true,
        cluster_cycle: true,
        immediate_echo: false,
      },
      semanticFilters: {
        allowedTags: ["wisdom", "healing", "technology", "consciousness"],
        blockedTags: [],
      },
      bioregionalAlerts: true,
      maxDailySignals: 3,
      sacredHours: {
        start: "06:00",
        end: "22:00",
        timezone: "UTC",
      },
      unsubscribeRituals: {
        requiresRitual: true,
        preferredRitualType: "gratitude",
      },
    };
  }

  // WHISPER FEED MANAGEMENT

  async getWhisperFeed(
    userId: string,
    limit: number = 20,
  ): Promise<WhisperFeedItem[]> {
    const feed = this.whisperFeeds.get(userId) || [];
    return feed.slice(0, limit);
  }

  async markWhisperAsRead(userId: string, whisperId: string): Promise<void> {
    const feed = this.whisperFeeds.get(userId) || [];
    const item = feed.find((w) => w.id === whisperId);
    if (item) {
      item.isRead = true;
    }
  }

  async archiveWhisper(userId: string, whisperId: string): Promise<void> {
    const feed = this.whisperFeeds.get(userId) || [];
    const updatedFeed = feed.filter((w) => w.id !== whisperId);
    this.whisperFeeds.set(userId, updatedFeed);
  }

  // RITUAL UNSUBSCRIBE PROTOCOL

  async initiateRitualUnsubscribe(
    userId: string,
    subscriptionId: string,
    ritualType: "gratitude" | "release" | "silence" | "blessing",
  ): Promise<string> {
    const subscription = this.getUserSubscriptions(userId).find(
      (s) => s.id === subscriptionId,
    );
    if (!subscription) {
      throw new Error("Subscription not found");
    }

    const ritualPrompts = {
      gratitude:
        "Share your gratitude for the wisdom received through this signal path, and your intention as you step into silence from this flow.",
      release:
        "Acknowledge what you release as you step away from this signal flow, and set an intention for your continued journey.",
      silence:
        "Enter sacred silence to honor the completion of this signal connection. What blessing do you offer to future receivers?",
      blessing:
        "Offer a blessing to the signal path and all who will follow this wisdom stream after you.",
    };

    return ritualPrompts[ritualType];
  }

  async completeRitualUnsubscribe(
    userId: string,
    subscriptionId: string,
    ritualType: "gratitude" | "release" | "silence" | "blessing",
    ritualResponse: string,
    gratitudeMessage?: string,
    blessingOffered?: string,
  ): Promise<void> {
    const subscriptions = this.getUserSubscriptions(userId);
    const subscription = subscriptions.find((s) => s.id === subscriptionId);

    if (subscription) {
      subscription.isActive = false;

      // Create ritual unsubscribe record
      const ritualRecord = {
        id: `ritual_unsub_${Date.now()}`,
        userId,
        subscriptionId,
        ritualType,
        ritualText: ritualResponse,
        completedAt: new Date(),
        gratitudeMessage,
        blessingOffered,
      };

      // In a real implementation, this would be stored in the database
      console.log("Ritual unsubscribe completed:", ritualRecord);
    }
  }

  // SACRED CYCLES AND CONTEXT-AWARE MODULATION

  private startSacredCycles(): void {
    // Simulate moon cycles, seasonal changes, and bioregional monitoring
    setInterval(() => {
      this.updateBiomeHealth();
      this.updateClusterStatus();
      this.sendScheduledSignals();
    }, 30000); // Every 30 seconds for demo
  }

  private updateBiomeHealth(): void {
    // Simulate biome health changes
    const regions: BiomeRegion[] = ["amazon", "arctic", "pacific_coral"];

    regions.forEach((region) => {
      const currentHealth = this.biomeStatus.get(region)?.healthIndex || 75;
      const change = (Math.random() - 0.5) * 10;
      const newHealth = Math.max(0, Math.min(100, currentHealth + change));

      let urgencyLevel: "thriving" | "stable" | "declining" | "critical";
      if (newHealth > 80) urgencyLevel = "thriving";
      else if (newHealth > 60) urgencyLevel = "stable";
      else if (newHealth > 30) urgencyLevel = "declining";
      else urgencyLevel = "critical";

      this.biomeStatus.set(region, {
        region,
        healthIndex: newHealth,
        urgencyLevel,
        lastUpdated: new Date(),
        indicators: {
          biodiversity: newHealth + Math.random() * 10 - 5,
          climate_stability: newHealth + Math.random() * 10 - 5,
          human_impact: 100 - newHealth + Math.random() * 10 - 5,
          regeneration_rate: newHealth + Math.random() * 10 - 5,
        },
        emergencySignals:
          urgencyLevel === "critical"
            ? [`${region} requires immediate attention`]
            : [],
      });
    });
  }

  private updateClusterStatus(): void {
    // Simulate cluster status changes
    for (let i = 1; i <= 13; i++) {
      const statuses: Array<"harmonious" | "active" | "urgent" | "critical"> = [
        "harmonious",
        "active",
        "urgent",
        "critical",
      ];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      this.clusterStatus.set(i, {
        clusterId: i,
        name: `SDG Cluster ${i}`,
        status,
        lastSimulation: new Date(),
        participantCount: Math.floor(Math.random() * 1000) + 100,
        currentFocus: ["governance", "technology"],
        emergencyUpdates: status === "critical",
      });
    }
  }

  private async sendScheduledSignals(): void {
    // This would handle scheduled signals based on moon phases, etc.
    const now = new Date();
    const moonPhase = this.getCurrentMoonPhase();

    if (moonPhase === "full" && Math.random() < 0.1) {
      // 10% chance during full moon
      await this.composeSignal({
        authorId: "system",
        title: "🌕 Full Moon Reflection Pulse",
        content:
          "The full moon illuminates our collective wisdom. Take a moment to reflect on your recent growth and set intentions for the cycle ahead.",
        semanticTags: ["ritual", "wisdom", "consciousness"],
        targetRoles: [],
        targetClusters: [],
        targetBioregions: [],
        urgencyLevel: "pulse",
        frequency: "full_moon",
        channels: ["ritual_notifications", "bioregional_whisper_feed"],
        ritualContext: {
          moonPhase: "full",
          seasonalAlignment: "winter",
        },
      });
    }
  }

  // UTILITY METHODS

  private addSubscription(
    userId: string,
    contract: SubscriptionContract,
  ): void {
    if (!this.subscriptions.has(userId)) {
      this.subscriptions.set(userId, []);
    }
    this.subscriptions.get(userId)!.push(contract);
  }

  private getUserSubscriptions(userId: string): SubscriptionContract[] {
    return this.subscriptions.get(userId) || [];
  }

  private async getUserRole(userId: string): Promise<UserRole> {
    // In real implementation, would fetch from user service
    const roles: UserRole[] = [
      "ritual_designer",
      "forest_delegate",
      "technologist",
      "guardian",
    ];
    return roles[Math.floor(Math.random() * roles.length)];
  }

  private async getAuthorSemanticTags(
    authorId: string,
  ): Promise<SemanticTag[]> {
    // In real implementation, would analyze author's content
    return ["wisdom", "technology", "consciousness"];
  }

  private getCurrentMoonPhase(): "new" | "waxing" | "full" | "waning" {
    const phases: Array<"new" | "waxing" | "full" | "waning"> = [
      "new",
      "waxing",
      "full",
      "waning",
    ];
    return phases[Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)) % 4];
  }

  private async sendFlourishBlessing(
    userId: string,
    contract: SubscriptionContract,
    amount: number,
    purpose: string,
  ): Promise<void> {
    const blessing: WhisperFeedItem = {
      id: `blessing_${Date.now()}`,
      signalId: `flourish_blessing_${contract.id}`,
      userId,
      type: "flourish_blessing",
      title: "✧ Sacred Exchange Blessing Received",
      preview: `Your offering of ${amount} Flourish for "${purpose}" has been received with gratitude...`,
      fullContent: `🙏 Sacred Exchange Acknowledged\n\nYour generous offering of ${amount} Flourish for "${purpose}" creates ripples of abundance throughout the collective.\n\nMay your gift return to you threefold in wisdom, health, and joy.\n\n✧ Impact Report:\n• Regenerative projects supported: 3\n• Community members blessed: 47\n• Ecosystem healing initiatives: 2\n\nNext suggested action: Share your intention for how this abundance should flow through the world.`,
      semanticTags: ["abundance", "regeneration", "gratitude"],
      urgencyLevel: "echo",
      isRead: false,
      receivedAt: new Date(),
      actions: {
        canEcho: true,
        canShare: false,
        canArchive: true,
        requiresResponse: false,
      },
      metadata: {
        sourceType: "flourish_transaction",
        authorRole: "oracle",
      },
    };

    if (!this.whisperFeeds.has(userId)) {
      this.whisperFeeds.set(userId, []);
    }
    this.whisperFeeds.get(userId)!.unshift(blessing);
  }

  private initializeMockData(): void {
    // Initialize some mock biome and cluster data
    this.updateBiomeHealth();
    this.updateClusterStatus();
  }

  // PUBLIC API METHODS

  async getSubscriptions(userId: string): Promise<SubscriptionContract[]> {
    return this.getUserSubscriptions(userId);
  }

  async getBiomeStatus(): Promise<BiomeHealthStatus[]> {
    return Array.from(this.biomeStatus.values());
  }

  async getClusterStatus(): Promise<ClusterStatus[]> {
    return Array.from(this.clusterStatus.values());
  }

  async getAllSignals(): Promise<SacredSignal[]> {
    return this.signals;
  }
}

// Export singleton instance
export const signalTemple = new SignalTempleService();
export default signalTemple;
