import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Scroll,
  Send,
  Clock,
  Users,
  Globe,
  Tag,
  Moon,
  Sun,
  Zap,
  Heart,
  Star,
  Brain,
  TreePine,
  Waves,
  Eye,
  Sparkles,
  Calendar,
  Settings,
  Play,
  Pause,
  Save,
} from "lucide-react";
import {
  SacredSignal,
  SemanticTag,
  UserRole,
  BiomeRegion,
  SacredFrequency,
  ClusterStatus,
} from "@/types/signalTemple";
import signalTemple from "@/services/signalTemple";

interface SignalComposerProps {
  authorId: string;
  onSignalCreated?: (signal: SacredSignal) => void;
  variant?: "full" | "compact" | "modal";
  className?: string;
}

const SignalComposer: React.FC<SignalComposerProps> = ({
  authorId,
  onSignalCreated,
  variant = "full",
  className = "",
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<SemanticTag[]>([]);
  const [targetRoles, setTargetRoles] = useState<UserRole[]>([]);
  const [targetClusters, setTargetClusters] = useState<number[]>([]);
  const [targetBioregions, setTargetBioregions] = useState<BiomeRegion[]>([]);
  const [urgencyLevel, setUrgencyLevel] = useState<
    "whisper" | "pulse" | "echo" | "urgent_call"
  >("pulse");
  const [frequency, setFrequency] = useState<SacredFrequency>("weekly_pulse");
  const [scheduledFor, setScheduledFor] = useState<Date | null>(null);
  const [flourishReward, setFlourishReward] = useState<number>(0);
  const [isComposing, setIsComposing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [clusterStatus, setClusterStatus] = useState<ClusterStatus[]>([]);

  useEffect(() => {
    loadClusterStatus();
  }, []);

  const loadClusterStatus = async () => {
    try {
      const clusters = await signalTemple.getClusterStatus();
      setClusterStatus(clusters);
    } catch (error) {
      console.error("Failed to load cluster status:", error);
    }
  };

  const availableSemanticTags: SemanticTag[] = [
    "ritual",
    "regeneration",
    "governance",
    "technology",
    "consciousness",
    "ecology",
    "ceremony",
    "healing",
    "abundance",
    "wisdom",
  ];

  const availableRoles: UserRole[] = [
    "ritual_designer",
    "forest_delegate",
    "future_diplomat",
    "myth_weaver",
    "river_delegate",
    "guardian",
    "steward",
    "oracle",
    "technologist",
  ];

  const availableBioregions: BiomeRegion[] = [
    "amazon",
    "arctic",
    "sahara",
    "himalayas",
    "pacific_coral",
    "boreal_forest",
    "grasslands",
    "wetlands",
    "urban_ecosystem",
    "digital_realm",
  ];

  const toggleTag = (tag: SemanticTag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const toggleRole = (role: UserRole) => {
    setTargetRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  };

  const toggleCluster = (clusterId: number) => {
    setTargetClusters((prev) =>
      prev.includes(clusterId)
        ? prev.filter((c) => c !== clusterId)
        : [...prev, clusterId],
    );
  };

  const toggleBioregion = (bioregion: BiomeRegion) => {
    setTargetBioregions((prev) =>
      prev.includes(bioregion)
        ? prev.filter((b) => b !== bioregion)
        : [...prev, bioregion],
    );
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please provide both title and content for your sacred signal");
      return;
    }

    if (selectedTags.length === 0) {
      alert("Please select at least one semantic tag to guide the signal");
      return;
    }

    setIsSubmitting(true);

    try {
      const signal = await signalTemple.composeSignal({
        authorId,
        title: title.trim(),
        content: content.trim(),
        semanticTags: selectedTags,
        targetRoles,
        targetClusters,
        targetBioregions,
        urgencyLevel,
        frequency,
        channels: [
          "ritual_notifications",
          "bioregional_whisper_feed",
          "in_app_pulse",
        ],
        scheduledFor,
        flourishReward: flourishReward > 0 ? flourishReward : undefined,
        ritualContext: {
          moonPhase: getCurrentMoonPhase(),
          seasonalAlignment: getCurrentSeason(),
        },
      });

      onSignalCreated?.(signal);

      // Reset form
      setTitle("");
      setContent("");
      setSelectedTags([]);
      setTargetRoles([]);
      setTargetClusters([]);
      setTargetBioregions([]);
      setUrgencyLevel("pulse");
      setScheduledFor(null);
      setFlourishReward(0);
      setIsComposing(false);
    } catch (error) {
      console.error("Failed to create signal:", error);
      alert("Failed to send signal. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentMoonPhase = (): string => {
    const phases = ["new", "waxing", "full", "waning"];
    return phases[Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)) % 4];
  };

  const getCurrentSeason = (): string => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return "spring";
    if (month >= 5 && month <= 7) return "summer";
    if (month >= 8 && month <= 10) return "autumn";
    return "winter";
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "urgent_call":
        return "border-red-500 text-red-400 bg-red-500/20";
      case "echo":
        return "border-orange-500 text-orange-400 bg-orange-500/20";
      case "pulse":
        return "border-cyan-500 text-cyan-400 bg-cyan-500/20";
      default:
        return "border-green-500 text-green-400 bg-green-500/20";
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case "urgent_call":
        return Zap;
      case "echo":
        return Waves;
      case "pulse":
        return Heart;
      default:
        return Sparkles;
    }
  };

  if (variant === "compact") {
    return (
      <Card
        className={`bg-black/40 border-purple-500/30 backdrop-blur-md ${className}`}
      >
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Scroll className="w-5 h-5 text-purple-400" />
              <Input
                placeholder="Share a sacred signal..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 bg-black/40 border-purple-500/30"
              />
              <Button
                onClick={() => setIsComposing(true)}
                disabled={!title.trim()}
                className="bg-gradient-to-r from-purple-500 to-cyan-500"
                size="sm"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isComposing && variant === "full") {
    return (
      <Card
        className={`bg-gradient-to-r from-purple-900/60 to-cyan-900/60 border-purple-400/30 backdrop-blur-md ${className}`}
      >
        <CardContent className="p-6">
          <Button
            onClick={() => setIsComposing(true)}
            className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 h-12"
          >
            <Scroll className="w-5 h-5 mr-3" />
            Compose Sacred Signal
            <Sparkles className="w-5 h-5 ml-3" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-900/60 to-cyan-900/60 border-purple-400/30 backdrop-blur-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Scroll className="w-6 h-6 text-purple-400" />
              <div>
                <CardTitle className="text-purple-400">
                  Sacred Signal Composer
                </CardTitle>
                <p className="text-gray-400 text-sm">
                  Send wisdom through the collective consciousness
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
                className="text-purple-400 hover:bg-purple-500/20"
              >
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? "Edit" : "Preview"}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsComposing(false)}
                className="text-gray-400 hover:bg-gray-500/20"
              >
                Cancel
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Composer */}
      <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-md">
        <CardContent className="p-6 space-y-6">
          {previewMode ? (
            // Preview Mode
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl font-bold text-white">
                    {title || "Untitled Signal"}
                  </h2>
                  <Badge className={getUrgencyColor(urgencyLevel)}>
                    {urgencyLevel.replace(/_/g, " ")}
                  </Badge>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>From: {authorId}</span>
                  <span>Frequency: {frequency.replace(/_/g, " ")}</span>
                  {scheduledFor && (
                    <span>Scheduled: {scheduledFor.toLocaleDateString()}</span>
                  )}
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {content || "No content yet..."}
                </p>
              </div>

              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-cyan-500/30 text-cyan-300"
                    >
                      {tag.replace(/_/g, " ")}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Edit Mode
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="text-white font-semibold mb-2 block">
                  Signal Title
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter the essence of your message..."
                  className="bg-black/40 border-cyan-500/30 text-white placeholder-gray-500"
                />
              </div>

              {/* Content */}
              <div>
                <label className="text-white font-semibold mb-2 block">
                  Sacred Content
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your wisdom, insight, or sacred transmission..."
                  rows={6}
                  className="bg-black/40 border-cyan-500/30 text-white placeholder-gray-500 resize-none"
                />
                <p className="text-gray-400 text-xs mt-1">
                  {content.length} characters • Write from the heart
                </p>
              </div>

              {/* Semantic Tags */}
              <div>
                <label className="text-white font-semibold mb-3 block">
                  Sacred Themes
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {availableSemanticTags.map((tag) => (
                    <Button
                      key={tag}
                      variant={
                        selectedTags.includes(tag) ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => toggleTag(tag)}
                      className={`${
                        selectedTags.includes(tag)
                          ? "bg-cyan-500 text-white"
                          : "border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20"
                      }`}
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag.replace(/_/g, " ")}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Urgency & Frequency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-white font-semibold mb-3 block">
                    Signal Intensity
                  </label>
                  <div className="space-y-2">
                    {(["whisper", "pulse", "echo", "urgent_call"] as const).map(
                      (level) => {
                        const IconComponent = getUrgencyIcon(level);
                        return (
                          <Button
                            key={level}
                            variant={
                              urgencyLevel === level ? "default" : "outline"
                            }
                            onClick={() => setUrgencyLevel(level)}
                            className={`w-full justify-start ${
                              urgencyLevel === level
                                ? getUrgencyColor(level)
                                    .replace("border-", "bg-")
                                    .replace("/20", "/40")
                                : "border-gray-600/30 text-gray-400 hover:bg-gray-500/20"
                            }`}
                          >
                            <IconComponent className="w-4 h-4 mr-2" />
                            {level.replace(/_/g, " ")}
                          </Button>
                        );
                      },
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-white font-semibold mb-3 block">
                    Sacred Timing
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) =>
                      setFrequency(e.target.value as SacredFrequency)
                    }
                    className="w-full p-3 bg-black/40 border border-purple-500/30 rounded text-white"
                  >
                    <option value="immediate_echo">Immediate Echo</option>
                    <option value="weekly_pulse">Weekly Pulse</option>
                    <option value="full_moon">Full Moon</option>
                    <option value="new_moon">New Moon</option>
                    <option value="equinox">Equinox</option>
                    <option value="cluster_cycle">Cluster Cycle</option>
                  </select>
                </div>
              </div>

              {/* Advanced Targeting */}
              <div className="space-y-4">
                <Button
                  variant="ghost"
                  onClick={() => setIsComposing(!isComposing)}
                  className="text-purple-400 hover:bg-purple-500/20"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Advanced Targeting
                </Button>

                <AnimatePresence>
                  {isComposing && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-4"
                    >
                      {/* Target Roles */}
                      <div>
                        <label className="text-white font-semibold mb-2 block">
                          Target Roles (Optional)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {availableRoles.map((role) => (
                            <Button
                              key={role}
                              variant={
                                targetRoles.includes(role)
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() => toggleRole(role)}
                              className={`text-xs ${
                                targetRoles.includes(role)
                                  ? "bg-purple-500 text-white"
                                  : "border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
                              }`}
                            >
                              {role.replace(/_/g, " ")}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Target Clusters */}
                      <div>
                        <label className="text-white font-semibold mb-2 block">
                          Target Clusters (Optional)
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                          {clusterStatus.map((cluster) => (
                            <Button
                              key={cluster.clusterId}
                              variant={
                                targetClusters.includes(cluster.clusterId)
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() => toggleCluster(cluster.clusterId)}
                              className={`text-xs ${
                                targetClusters.includes(cluster.clusterId)
                                  ? "bg-green-500 text-white"
                                  : "border-green-500/30 text-green-300 hover:bg-green-500/20"
                              }`}
                            >
                              {cluster.clusterId}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div className="flex items-center space-x-4">
              {scheduledFor && (
                <Badge
                  variant="outline"
                  className="border-yellow-500/30 text-yellow-400"
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  Scheduled
                </Badge>
              )}

              {flourishReward > 0 && (
                <Badge
                  variant="outline"
                  className="border-green-500/30 text-green-400"
                >
                  <Star className="w-3 h-3 mr-1" />
                  {flourishReward} ✧ Reward
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  // Save as draft functionality
                  console.log("Saving draft...");
                }}
                className="border-gray-500/30 text-gray-400 hover:bg-gray-500/20"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>

              <Button
                onClick={handleSubmit}
                disabled={
                  isSubmitting ||
                  !title.trim() ||
                  !content.trim() ||
                  selectedTags.length === 0
                }
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Signal
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignalComposer;
