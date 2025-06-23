import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Shield,
  Heart,
  Bell,
  Mail,
  Scroll,
  Waves,
  Moon,
  Sun,
  Settings,
  Eye,
  Lock,
  Unlock,
  Clock,
  Globe,
  TreePine,
  Star,
  Zap,
  Filter,
} from "lucide-react";
import {
  ConsentPreferences,
  SemanticTag,
  SacredFrequency,
} from "@/types/signalTemple";
import signalTemple from "@/services/signalTemple";

interface ConsentVaultProps {
  userId: string;
  onPreferencesChange?: (preferences: ConsentPreferences) => void;
  className?: string;
}

const ConsentVault: React.FC<ConsentVaultProps> = ({
  userId,
  onPreferencesChange,
  className = "",
}) => {
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<
    "channels" | "frequencies" | "semantic" | "sacred"
  >("channels");
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    loadPreferences();
  }, [userId]);

  const loadPreferences = async () => {
    setIsLoading(true);
    try {
      const prefs = await signalTemple.getConsentPreferences(userId);
      setPreferences(prefs);
    } catch (error) {
      console.error("Failed to load consent preferences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreferences = async (updates: Partial<ConsentPreferences>) => {
    if (!preferences) return;

    const updated = { ...preferences, ...updates };
    setPreferences(updated);

    try {
      await signalTemple.updateConsentPreferences(userId, updates);
      onPreferencesChange?.(updated);
    } catch (error) {
      console.error("Failed to update preferences:", error);
      // Revert on error
      setPreferences(preferences);
    }
  };

  const toggleChannel = (channel: keyof ConsentPreferences["channels"]) => {
    if (!preferences) return;
    updatePreferences({
      channels: {
        ...preferences.channels,
        [channel]: !preferences.channels[channel],
      },
    });
  };

  const toggleFrequency = (
    frequency: keyof ConsentPreferences["frequencies"],
  ) => {
    if (!preferences) return;
    updatePreferences({
      frequencies: {
        ...preferences.frequencies,
        [frequency]: !preferences.frequencies[frequency],
      },
    });
  };

  const toggleSemanticTag = (tag: SemanticTag, isAllowed: boolean) => {
    if (!preferences) return;

    let allowedTags = [...preferences.semanticFilters.allowedTags];
    let blockedTags = [...preferences.semanticFilters.blockedTags];

    if (isAllowed) {
      if (!allowedTags.includes(tag)) {
        allowedTags.push(tag);
      }
      blockedTags = blockedTags.filter((t) => t !== tag);
    } else {
      if (!blockedTags.includes(tag)) {
        blockedTags.push(tag);
      }
      allowedTags = allowedTags.filter((t) => t !== tag);
    }

    updatePreferences({
      semanticFilters: {
        allowedTags,
        blockedTags,
      },
    });
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return Mail;
      case "ritual_notifications":
        return Bell;
      case "encrypted_scrolls":
        return Scroll;
      case "bioregional_whisper_feed":
        return Waves;
      case "in_app_pulse":
        return Zap;
      default:
        return Bell;
    }
  };

  const getChannelDescription = (channel: string) => {
    switch (channel) {
      case "email":
        return "Traditional email messages for important updates";
      case "ritual_notifications":
        return "Sacred notifications for ceremonies and rituals";
      case "encrypted_scrolls":
        return "Private, encrypted wisdom transmissions";
      case "bioregional_whisper_feed":
        return "Place-based ecological and community updates";
      case "in_app_pulse":
        return "Real-time in-application pulses and signals";
      default:
        return "";
    }
  };

  const getFrequencyIcon = (frequency: string) => {
    switch (frequency) {
      case "full_moon":
        return Moon;
      case "new_moon":
        return <div className="w-4 h-4 rounded-full border border-current" />;
      case "equinox":
        return Sun;
      case "weekly_pulse":
        return Clock;
      case "cluster_cycle":
        return TreePine;
      case "immediate_echo":
        return Zap;
      default:
        return Clock;
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

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <Card className="bg-black/40 border-purple-500/30 backdrop-blur-md">
          <CardContent className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-purple-400">Loading Sacred Preferences...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!preferences) return null;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-900/60 to-cyan-900/60 border-purple-400/30 backdrop-blur-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-purple-400" />
              <div>
                <CardTitle className="text-purple-400">
                  Sacred Consent Vault
                </CardTitle>
                <p className="text-gray-400 text-sm">
                  Your sovereign choices for signal reception
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-purple-400 hover:bg-purple-500/20"
              >
                <Settings className="w-4 h-4 mr-2" />
                {showAdvanced ? "Simple" : "Advanced"}
              </Button>

              <Badge
                variant={preferences.globalConsent ? "default" : "destructive"}
                className="ml-2"
              >
                {preferences.globalConsent ? (
                  <>
                    <Unlock className="w-3 h-3 mr-1" />
                    Open to Signals
                  </>
                ) : (
                  <>
                    <Lock className="w-3 h-3 mr-1" />
                    Signal Silence
                  </>
                )}
              </Badge>
            </div>
          </div>

          {/* Global Consent Toggle */}
          <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-purple-500/20 mt-4">
            <div>
              <h4 className="text-white font-semibold">
                Global Signal Reception
              </h4>
              <p className="text-gray-400 text-sm">
                Master control for all sacred communications
              </p>
            </div>
            <Switch
              checked={preferences.globalConsent}
              onCheckedChange={(checked) =>
                updatePreferences({ globalConsent: checked })
              }
            />
          </div>
        </CardHeader>
      </Card>

      {/* Section Navigation */}
      <div className="flex space-x-2 overflow-x-auto">
        {[
          { id: "channels", label: "Channels", icon: Bell },
          { id: "frequencies", label: "Sacred Timing", icon: Moon },
          { id: "semantic", label: "Wisdom Filters", icon: Filter },
          { id: "sacred", label: "Sacred Settings", icon: Star },
        ].map((section) => {
          const IconComponent = section.icon;
          return (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveSection(section.id as any)}
              className={`whitespace-nowrap ${
                activeSection === section.id
                  ? "bg-purple-500 text-white"
                  : "border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
              }`}
            >
              <IconComponent className="w-4 h-4 mr-2" />
              {section.label}
            </Button>
          );
        })}
      </div>

      {/* Section Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeSection === "channels" && (
            <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-cyan-400">Signal Channels</CardTitle>
                <p className="text-gray-400 text-sm">
                  Choose how you receive sacred communications
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(preferences.channels).map(
                  ([channel, enabled]) => {
                    const IconComponent = getChannelIcon(channel);
                    return (
                      <div
                        key={channel}
                        className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-cyan-500/20"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="p-2 rounded-lg bg-cyan-500/20">
                            <IconComponent className="w-5 h-5 text-cyan-400" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold capitalize">
                              {channel.replace(/_/g, " ")}
                            </h4>
                            <p className="text-gray-400 text-sm">
                              {getChannelDescription(channel)}
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={enabled}
                          onCheckedChange={() =>
                            toggleChannel(
                              channel as keyof ConsentPreferences["channels"],
                            )
                          }
                          disabled={!preferences.globalConsent}
                        />
                      </div>
                    );
                  },
                )}
              </CardContent>
            </Card>
          )}

          {activeSection === "frequencies" && (
            <Card className="bg-black/40 border-purple-500/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-purple-400">Sacred Timing</CardTitle>
                <p className="text-gray-400 text-sm">
                  Honor natural cycles and cosmic rhythms
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(preferences.frequencies).map(
                  ([frequency, enabled]) => {
                    const IconComponent = getFrequencyIcon(frequency);
                    return (
                      <div
                        key={frequency}
                        className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-purple-500/20"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-purple-500/20">
                            {typeof IconComponent === "function" ? (
                              <IconComponent className="w-5 h-5 text-purple-400" />
                            ) : (
                              IconComponent
                            )}
                          </div>
                          <div>
                            <h4 className="text-white font-semibold capitalize">
                              {frequency.replace(/_/g, " ")}
                            </h4>
                            <p className="text-gray-400 text-sm">
                              {frequency === "full_moon" &&
                                "Monthly wisdom gatherings during full moon"}
                              {frequency === "new_moon" &&
                                "Intention setting during new moon darkness"}
                              {frequency === "equinox" &&
                                "Seasonal balance and transition signals"}
                              {frequency === "weekly_pulse" &&
                                "Regular weekly community pulses"}
                              {frequency === "cluster_cycle" &&
                                "Updates when clusters complete cycles"}
                              {frequency === "immediate_echo" &&
                                "Urgent signals requiring immediate attention"}
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={enabled}
                          onCheckedChange={() =>
                            toggleFrequency(
                              frequency as keyof ConsentPreferences["frequencies"],
                            )
                          }
                          disabled={!preferences.globalConsent}
                        />
                      </div>
                    );
                  },
                )}
              </CardContent>
            </Card>
          )}

          {activeSection === "semantic" && (
            <Card className="bg-black/40 border-green-500/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-green-400">Wisdom Filters</CardTitle>
                <p className="text-gray-400 text-sm">
                  Curate signals by sacred themes and intentions
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-white font-semibold mb-4">
                    Allowed Sacred Themes
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {availableSemanticTags.map((tag) => {
                      const isAllowed =
                        preferences.semanticFilters.allowedTags.includes(tag);
                      const isBlocked =
                        preferences.semanticFilters.blockedTags.includes(tag);

                      return (
                        <Button
                          key={tag}
                          variant={isAllowed ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleSemanticTag(tag, !isAllowed)}
                          disabled={!preferences.globalConsent}
                          className={`${
                            isAllowed
                              ? "bg-green-500 text-white"
                              : isBlocked
                                ? "border-red-500/30 text-red-400 bg-red-500/10"
                                : "border-green-500/30 text-green-300 hover:bg-green-500/20"
                          }`}
                        >
                          {tag.replace(/_/g, " ")}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {showAdvanced && (
                  <div>
                    <h4 className="text-white font-semibold mb-4">
                      Daily Signal Limit
                    </h4>
                    <div className="space-y-3">
                      <Slider
                        value={[preferences.maxDailySignals]}
                        onValueChange={([value]) =>
                          updatePreferences({ maxDailySignals: value })
                        }
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                        disabled={!preferences.globalConsent}
                      />
                      <p className="text-center text-gray-400 text-sm">
                        Maximum {preferences.maxDailySignals} signals per day
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeSection === "sacred" && (
            <Card className="bg-black/40 border-yellow-500/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-yellow-400">
                  Sacred Settings
                </CardTitle>
                <p className="text-gray-400 text-sm">
                  Honor your sacred boundaries and rhythms
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-yellow-500/20">
                    <div>
                      <h4 className="text-white font-semibold">
                        Bioregional Alerts
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Receive urgent ecological signals from your bioregion
                      </p>
                    </div>
                    <Switch
                      checked={preferences.bioregionalAlerts}
                      onCheckedChange={(checked) =>
                        updatePreferences({ bioregionalAlerts: checked })
                      }
                      disabled={!preferences.globalConsent}
                    />
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-white font-semibold">Sacred Hours</h4>
                    <p className="text-gray-400 text-sm">
                      Time window when you're open to receiving signals
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-400 text-sm">
                          Start Time
                        </label>
                        <input
                          type="time"
                          value={preferences.sacredHours.start}
                          onChange={(e) =>
                            updatePreferences({
                              sacredHours: {
                                ...preferences.sacredHours,
                                start: e.target.value,
                              },
                            })
                          }
                          className="w-full p-2 bg-black/40 border border-yellow-500/30 rounded text-white"
                          disabled={!preferences.globalConsent}
                        />
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm">
                          End Time
                        </label>
                        <input
                          type="time"
                          value={preferences.sacredHours.end}
                          onChange={(e) =>
                            updatePreferences({
                              sacredHours: {
                                ...preferences.sacredHours,
                                end: e.target.value,
                              },
                            })
                          }
                          className="w-full p-2 bg-black/40 border border-yellow-500/30 rounded text-white"
                          disabled={!preferences.globalConsent}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-yellow-500/20">
                    <div>
                      <h4 className="text-white font-semibold">
                        Ritual Unsubscribe
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Require ceremonial completion to unsubscribe
                      </p>
                    </div>
                    <Switch
                      checked={preferences.unsubscribeRituals.requiresRitual}
                      onCheckedChange={(checked) =>
                        updatePreferences({
                          unsubscribeRituals: {
                            ...preferences.unsubscribeRituals,
                            requiresRitual: checked,
                          },
                        })
                      }
                      disabled={!preferences.globalConsent}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Summary Footer */}
      <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">
              Active Channels:{" "}
              {Object.values(preferences.channels).filter(Boolean).length}/5
            </span>
            <span className="text-gray-400">
              Sacred Frequencies:{" "}
              {Object.values(preferences.frequencies).filter(Boolean).length}/6
            </span>
            <span className="text-gray-400">
              Wisdom Themes: {preferences.semanticFilters.allowedTags.length}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsentVault;
