import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Waves,
  Scroll,
  Shield,
  Bell,
  Settings,
  Users,
  Globe,
  Heart,
  Star,
  Brain,
  Zap,
  TreePine,
  Mail,
  Eye,
  Filter,
  Calendar,
  RefreshCw,
} from "lucide-react";
import ConsentVault from "./ConsentVault";
import WhisperFeed from "./WhisperFeed";
import SignalComposer from "./SignalComposer";
import {
  SubscriptionContract,
  WhisperFeedItem,
  SacredSignal,
  BiomeHealthStatus,
  ClusterStatus,
} from "@/types/signalTemple";
import signalTemple from "@/services/signalTemple";

interface SignalTempleProps {
  userId: string;
  userRole?: string;
  variant?: "full" | "dashboard" | "sidebar";
  className?: string;
}

const SignalTemple: React.FC<SignalTempleProps> = ({
  userId,
  userRole = "steward",
  variant = "full",
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState("feed");
  const [subscriptions, setSubscriptions] = useState<SubscriptionContract[]>(
    [],
  );
  const [biomeStatus, setBiomeStatus] = useState<BiomeHealthStatus[]>([]);
  const [clusterStatus, setClusterStatus] = useState<ClusterStatus[]>([]);
  const [recentSignals, setRecentSignals] = useState<SacredSignal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalWhispers: 0,
    unreadWhispers: 0,
    activeSubscriptions: 0,
    signalsSent: 0,
  });

  useEffect(() => {
    loadSignalTempleData();

    // Set up real-time updates
    const interval = setInterval(loadSignalTempleData, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  const loadSignalTempleData = async () => {
    setIsLoading(true);
    try {
      const [userSubscriptions, whisperFeed, biomeData, clusterData, signals] =
        await Promise.all([
          signalTemple.getSubscriptions(userId),
          signalTemple.getWhisperFeed(userId),
          signalTemple.getBiomeStatus(),
          signalTemple.getClusterStatus(),
          signalTemple.getAllSignals(),
        ]);

      setSubscriptions(userSubscriptions);
      setBiomeStatus(biomeData);
      setClusterStatus(clusterData);
      setRecentSignals(signals.slice(0, 10));

      // Calculate stats
      setStats({
        totalWhispers: whisperFeed.length,
        unreadWhispers: whisperFeed.filter((w) => !w.isRead).length,
        activeSubscriptions: userSubscriptions.filter((s) => s.isActive).length,
        signalsSent: signals.filter((s) => s.authorId === userId).length,
      });
    } catch (error) {
      console.error("Failed to load SignalTemple data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScrollFollow = async (authorId: string, scrollId: string) => {
    try {
      const subscription = await signalTemple.createScrollFollowSubscription(
        userId,
        authorId,
        scrollId,
      );
      setSubscriptions((prev) => [...prev, subscription]);
    } catch (error) {
      console.error("Failed to create scroll follow subscription:", error);
    }
  };

  const handleClusterAlignment = async (clusterId: number) => {
    try {
      const subscription =
        await signalTemple.createClusterAlignmentSubscription(
          userId,
          clusterId,
        );
      setSubscriptions((prev) => [...prev, subscription]);
    } catch (error) {
      console.error("Failed to create cluster alignment subscription:", error);
    }
  };

  const handleFlourishTransaction = async (
    transactionId: string,
    amount: number,
    purpose: string,
  ) => {
    try {
      const subscription =
        await signalTemple.createFlourishTransactionSubscription(
          userId,
          transactionId,
          amount,
          purpose,
        );
      setSubscriptions((prev) => [...prev, subscription]);
    } catch (error) {
      console.error(
        "Failed to create flourish transaction subscription:",
        error,
      );
    }
  };

  const handleSignalCreated = (signal: SacredSignal) => {
    setRecentSignals((prev) => [signal, ...prev.slice(0, 9)]);
    setStats((prev) => ({ ...prev, signalsSent: prev.signalsSent + 1 }));
  };

  const getUrgencyStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "text-red-400 bg-red-500/20";
      case "urgent":
        return "text-orange-400 bg-orange-500/20";
      case "active":
        return "text-cyan-400 bg-cyan-500/20";
      default:
        return "text-green-400 bg-green-500/20";
    }
  };

  if (variant === "sidebar") {
    return (
      <div className={`space-y-4 ${className}`}>
        <Card className="bg-black/40 border-purple-500/30 backdrop-blur-md">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Waves className="w-5 h-5 text-purple-400" />
              <CardTitle className="text-purple-400 text-lg">
                Signal Temple
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div>
                <div className="text-2xl font-bold text-cyan-400">
                  {stats.unreadWhispers}
                </div>
                <div className="text-xs text-gray-400">Unread</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  {stats.activeSubscriptions}
                </div>
                <div className="text-xs text-gray-400">Active</div>
              </div>
            </div>

            <WhisperFeed userId={userId} maxItems={3} variant="minimal" />

            <Button
              onClick={() => (window.location.href = "/signal-temple")}
              className="w-full bg-gradient-to-r from-purple-500 to-cyan-500"
              size="sm"
            >
              Open Temple
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (variant === "dashboard") {
    return (
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${className}`}>
        {/* Stats Overview */}
        <Card className="bg-gradient-to-r from-purple-900/60 to-cyan-900/60 border-purple-400/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center">
              <Waves className="w-5 h-5 mr-2" />
              Signal Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">
                  {stats.unreadWhispers}
                </div>
                <div className="text-sm text-gray-400">Unread Whispers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {stats.activeSubscriptions}
                </div>
                <div className="text-sm text-gray-400">Subscriptions</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-semibold text-sm">
                Quick Actions
              </h4>
              <div className="space-y-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20"
                  onClick={() => setActiveTab("compose")}
                >
                  <Scroll className="w-4 h-4 mr-2" />
                  Compose Signal
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
                  onClick={() => setActiveTab("preferences")}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Manage Consent
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mini Feed */}
        <div className="lg:col-span-2">
          <WhisperFeed userId={userId} maxItems={5} variant="compact" />
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-900/60 to-cyan-900/60 border-purple-400/30 backdrop-blur-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Waves className="w-8 h-8 text-purple-400" />
              <div>
                <CardTitle className="text-2xl text-purple-400">
                  ⚙️ SignalTemple
                </CardTitle>
                <p className="text-gray-400">
                  Subscriptions as Ritual Echoes • Sacred Communication Hub
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge
                variant="outline"
                className="border-cyan-400 text-cyan-400"
              >
                {stats.unreadWhispers} Unread
              </Badge>

              <Button
                variant="ghost"
                size="sm"
                onClick={loadSignalTempleData}
                className="text-purple-400 hover:bg-purple-500/20"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
            <div className="text-center">
              <div className="text-xl font-bold text-cyan-400">
                {stats.totalWhispers}
              </div>
              <div className="text-xs text-gray-400">Total Whispers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-400">
                {stats.activeSubscriptions}
              </div>
              <div className="text-xs text-gray-400">Active Flows</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-400">
                {stats.signalsSent}
              </div>
              <div className="text-xs text-gray-400">Signals Sent</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-yellow-400">
                {
                  biomeStatus.filter((b) => b.urgencyLevel === "critical")
                    .length
                }
              </div>
              <div className="text-xs text-gray-400">Biome Alerts</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4 bg-black/40 border border-purple-500/30">
          <TabsTrigger
            value="feed"
            className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
          >
            <Bell className="w-4 h-4 mr-2" />
            Whisper Feed
          </TabsTrigger>
          <TabsTrigger
            value="compose"
            className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
          >
            <Scroll className="w-4 h-4 mr-2" />
            Compose
          </TabsTrigger>
          <TabsTrigger
            value="subscriptions"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            <Zap className="w-4 h-4 mr-2" />
            Flows
          </TabsTrigger>
          <TabsTrigger
            value="preferences"
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
          >
            <Shield className="w-4 h-4 mr-2" />
            Consent
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed">
          <WhisperFeed userId={userId} variant="full" />
        </TabsContent>

        <TabsContent value="compose">
          <SignalComposer
            authorId={userId}
            onSignalCreated={handleSignalCreated}
            variant="full"
          />
        </TabsContent>

        <TabsContent value="subscriptions">
          <div className="space-y-6">
            <Card className="bg-black/40 border-green-500/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-green-400">
                  Active Signal Flows
                </CardTitle>
                <p className="text-gray-400 text-sm">
                  Your sacred subscription contracts
                </p>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-green-400">Loading subscriptions...</p>
                  </div>
                ) : subscriptions.length === 0 ? (
                  <div className="text-center py-8">
                    <Zap className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                    <h3 className="text-white font-semibold mb-2">
                      No Active Flows
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Start following scrolls, joining clusters, or making
                      Flourish transactions to create signal flows.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {subscriptions.map((subscription) => (
                      <Card
                        key={subscription.id}
                        className="bg-black/20 border-green-500/20"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="capitalize">
                                  {subscription.triggerType.replace(/_/g, " ")}
                                </Badge>
                                <Badge
                                  variant={
                                    subscription.isActive
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {subscription.isActive ? "Active" : "Paused"}
                                </Badge>
                              </div>

                              <div className="space-y-1">
                                <p className="text-white font-semibold">
                                  {subscription.frequency.replace(/_/g, " ")} •{" "}
                                  {subscription.roleId.replace(/_/g, " ")}
                                </p>
                                <p className="text-gray-400 text-sm">
                                  Created{" "}
                                  {subscription.createdAt.toLocaleDateString()}
                                </p>
                                {subscription.metadata.intentionMessage && (
                                  <p className="text-gray-300 text-sm italic">
                                    "{subscription.metadata.intentionMessage}"
                                  </p>
                                )}
                              </div>

                              <div className="flex flex-wrap gap-1">
                                {subscription.semanticTags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="outline"
                                    className="text-xs border-green-500/30 text-green-300"
                                  >
                                    {tag.replace(/_/g, " ")}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-white"
                            >
                              Configure
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Subscription Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-md">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
                  <h4 className="text-white font-semibold mb-2">
                    Follow Clusters
                  </h4>
                  <p className="text-gray-400 text-sm mb-3">
                    Join SDG clusters to receive their signal flows
                  </p>
                  <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600">
                    Browse Clusters
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/30 backdrop-blur-md">
                <CardContent className="p-4 text-center">
                  <Globe className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                  <h4 className="text-white font-semibold mb-2">
                    Bioregional Alerts
                  </h4>
                  <p className="text-gray-400 text-sm mb-3">
                    Get emergency signals from your bioregion
                  </p>
                  <Button
                    size="sm"
                    className="bg-purple-500 hover:bg-purple-600"
                  >
                    Set Location
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-yellow-500/30 backdrop-blur-md">
                <CardContent className="p-4 text-center">
                  <Star className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                  <h4 className="text-white font-semibold mb-2">
                    Flourish Rewards
                  </h4>
                  <p className="text-gray-400 text-sm mb-3">
                    Earn Flourish through signal engagement
                  </p>
                  <Button
                    size="sm"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preferences">
          <ConsentVault userId={userId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SignalTemple;
