// CIVICA 144 RitualBlessing Component
// Sacred blessing ceremonies for scroll activation

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Heart,
  Crown,
  Sparkles,
  Users,
  Clock,
  CheckCircle,
  Star,
  Flame,
  Moon,
  Sun,
  Leaf,
} from "lucide-react";
import {
  CivicScroll,
  CommunityMember,
  Blessing,
  RitualData,
  CeremonyType,
} from "@/types/scrollSignal";
import { scrollSignalService } from "@/services/scrollSignal";

interface RitualBlessingProps {
  currentScroll: CivicScroll | null;
  ritualQueue: RitualData[];
  communityMembers: CommunityMember[];
  blessings: Blessing[];
}

export const RitualBlessing: React.FC<RitualBlessingProps> = ({
  currentScroll,
  ritualQueue,
  communityMembers,
  blessings,
}) => {
  const [activeRitual, setActiveRitual] = useState<RitualData | null>(null);
  const [blessingInProgress, setBlessingInProgress] = useState(false);
  const [selectedBlesser, setSelectedBlesser] =
    useState<CommunityMember | null>(null);
  const [ritualProgress, setRitualProgress] = useState(0);
  const [currentRitualStep, setCurrentRitualStep] = useState("");

  // Auto-select elder for blessing when scroll is ready
  useEffect(() => {
    if (
      currentScroll &&
      currentScroll.status === "pending_blessing" &&
      !selectedBlesser
    ) {
      const elder = communityMembers.find((member) => member.role === "elder");
      if (elder) setSelectedBlesser(elder);
    }
  }, [currentScroll, communityMembers, selectedBlesser]);

  const handleStartBlessing = async () => {
    if (!currentScroll || !selectedBlesser) return;

    setBlessingInProgress(true);
    setRitualProgress(0);
    setActiveRitual(currentScroll.ritual);

    try {
      // Ritual progression simulation
      const steps = [
        "Sacred circle formation",
        "Invoking ancestral guidance",
        "Reading scroll aloud",
        "Community consensus gathering",
        "Blessing power channeling",
        "Sacred completion",
      ];

      for (let i = 0; i < steps.length; i++) {
        setCurrentRitualStep(steps[i]);
        setRitualProgress((i + 1) * (100 / steps.length));
        await delay(1500);
      }

      // Complete the blessing
      await scrollSignalService.requestBlessing(currentScroll, selectedBlesser);
    } catch (error) {
      console.error("Blessing ceremony failed:", error);
    } finally {
      setBlessingInProgress(false);
      setActiveRitual(null);
      setRitualProgress(0);
      setCurrentRitualStep("");
    }
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const getCeremonyIcon = (type: CeremonyType) => {
    const icons = {
      blessing_circle: Heart,
      healing_ritual: Leaf,
      decision_council: Users,
      seasonal_ceremony: Moon,
      emergency_gathering: Star,
      memory_keeping: Crown,
    };
    return icons[type] || Heart;
  };

  const getBlessingTypeColor = (type: string) => {
    const colors = {
      elder_wisdom: "text-purple-400 border-purple-400",
      community_consent: "text-blue-400 border-blue-400",
      ancestral_guidance: "text-yellow-400 border-yellow-400",
      nature_harmony: "text-green-400 border-green-400",
      divine_approval: "text-pink-400 border-pink-400",
      collective_prayer: "text-indigo-400 border-indigo-400",
    };
    return colors[type as keyof typeof colors] || colors.elder_wisdom;
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "elder":
        return "👵";
      case "healer":
        return "👨‍⚕️";
      case "teacher":
        return "👩‍🏫";
      case "farmer":
        return "👨‍🌾";
      case "guardian":
        return "👩‍💼";
      default:
        return "👤";
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Scroll Blessing Status */}
      {currentScroll && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-pink-400">
              <div className="flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Current Scroll Blessing
              </div>
              <Badge
                variant="outline"
                className={`
                ${
                  currentScroll.status === "pending_blessing"
                    ? "border-orange-400 text-orange-400 bg-orange-400/10"
                    : currentScroll.status === "blessed"
                      ? "border-green-400 text-green-400 bg-green-400/10"
                      : "border-gray-400 text-gray-400"
                }
              `}
              >
                {currentScroll.status.replace("_", " ").toUpperCase()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Scroll Info */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <h3 className="font-semibold text-white mb-2">
                {currentScroll.title}
              </h3>
              <p className="text-sm text-gray-300 line-clamp-3">
                {currentScroll.content}
              </p>
              <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                <span>Created by {currentScroll.createdBy.name}</span>
                <span>Type: {currentScroll.type}</span>
              </div>
            </div>

            {/* Blessing Process */}
            {currentScroll.status === "pending_blessing" && (
              <div className="space-y-4">
                {/* Blesser Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    Sacred Blesser
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {communityMembers
                      .filter((member) =>
                        ["elder", "healer", "guardian"].includes(member.role),
                      )
                      .map((member) => (
                        <motion.div
                          key={member.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedBlesser(member)}
                          className={`
                          p-3 rounded-lg border cursor-pointer transition-all
                          ${
                            selectedBlesser?.id === member.id
                              ? "border-purple-400 bg-purple-400/10"
                              : "border-white/20 bg-white/5 hover:bg-white/10"
                          }
                        `}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">
                              {getRoleIcon(member.role)}
                            </div>
                            <div>
                              <div className="font-medium text-white">
                                {member.name}
                              </div>
                              <div className="text-xs text-gray-400 capitalize">
                                {member.role}
                              </div>
                              <div className="text-xs text-purple-400">
                                Wisdom: {member.wisdom}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>

                {/* Ritual Requirements */}
                {currentScroll.ritual && (
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <div className="flex items-center space-x-2 mb-3">
                      <Crown className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium text-yellow-400">
                        Ritual Requirements
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div>
                        Type: {currentScroll.ritual.type.replace("_", " ")}
                      </div>
                      <div>
                        Duration:{" "}
                        {Math.floor(currentScroll.ritual.timing.duration / 60)}{" "}
                        minutes
                      </div>
                      <div>
                        Participants: {currentScroll.ritual.participants.length}
                      </div>
                      <div>
                        Sacred Elements:{" "}
                        {currentScroll.ritual.sacredElements.length} required
                      </div>
                    </div>
                  </div>
                )}

                {/* Start Blessing Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleStartBlessing}
                    disabled={!selectedBlesser || blessingInProgress}
                    className={`w-full py-3 text-lg font-semibold ${
                      blessingInProgress
                        ? "bg-purple-400/50 cursor-not-allowed"
                        : "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                    } transition-all duration-300`}
                  >
                    {blessingInProgress ? (
                      <div className="flex items-center space-x-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Sparkles className="w-5 h-5" />
                        </motion.div>
                        <span>Sacred Ceremony in Progress...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Heart className="w-5 h-5" />
                        <span>Begin Sacred Blessing</span>
                      </div>
                    )}
                  </Button>
                </motion.div>
              </div>
            )}

            {/* Active Blessing Progress */}
            <AnimatePresence>
              {blessingInProgress && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg p-4 border border-pink-500/30">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-pink-300">
                        Sacred Ceremony Progress
                      </span>
                      <span className="text-sm text-purple-400">
                        {ritualProgress.toFixed(0)}%
                      </span>
                    </div>

                    <Progress
                      value={ritualProgress}
                      className="h-3 mb-3 bg-purple-400/20"
                    />

                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Flame className="w-4 h-4 text-yellow-400" />
                      </motion.div>
                      <span>{currentRitualStep}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Existing Blessings */}
            {currentScroll.blessings.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">
                    Sacred Blessings Received
                  </span>
                </div>
                <div className="space-y-2">
                  {currentScroll.blessings.map((blessing) => (
                    <div
                      key={blessing.id}
                      className="bg-green-500/10 backdrop-blur-sm rounded-lg p-3 border border-green-500/20"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-lg">
                            {getRoleIcon(blessing.blessedBy.role)}
                          </div>
                          <div>
                            <div className="font-medium text-white">
                              {blessing.blessedBy.name}
                            </div>
                            <div className="text-xs text-gray-300">
                              {blessing.intention}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="outline"
                            className={getBlessingTypeColor(blessing.type)}
                          >
                            {blessing.type.replace("_", " ")}
                          </Badge>
                          <div className="text-xs text-green-400 mt-1">
                            Power: {blessing.power}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Community Blessing History */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center text-indigo-400">
            <Sparkles className="w-5 h-5 mr-2" />
            Community Blessing Archive
          </CardTitle>
        </CardHeader>
        <CardContent>
          {blessings.length > 0 ? (
            <div className="space-y-3">
              {blessings
                .slice(-5)
                .reverse()
                .map((blessing) => (
                  <motion.div
                    key={blessing.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-lg">
                          {getRoleIcon(blessing.blessedBy.role)}
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {blessing.blessedBy.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {blessing.intention}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant="outline"
                          className={getBlessingTypeColor(blessing.type)}
                        >
                          {blessing.type.replace("_", " ")}
                        </Badge>
                        <div className="text-xs text-gray-400 mt-1">
                          {blessing.timestamp.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Heart className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>
                No blessings yet. Create and bless your first scroll to begin.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ritual Queue */}
      {ritualQueue.length > 0 && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-400">
              <Clock className="w-5 h-5 mr-2" />
              Pending Rituals ({ritualQueue.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ritualQueue.map((ritual, index) => {
                const CeremonyIcon = getCeremonyIcon(ritual.type);
                return (
                  <div
                    key={index}
                    className="p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CeremonyIcon className="w-5 h-5 text-yellow-400" />
                        <div>
                          <div className="font-medium text-white capitalize">
                            {ritual.type.replace("_", " ")}
                          </div>
                          <div className="text-xs text-gray-400">
                            {ritual.participants.length} participants •{" "}
                            {Math.floor(ritual.timing.duration / 60)} min
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-yellow-400 text-yellow-400"
                      >
                        {ritual.timing.preferred.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sacred Time Indicator */}
      <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border-yellow-500/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sun className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="font-medium text-yellow-300">Sacred Time</div>
                <div className="text-xs text-yellow-200/80">
                  Current time optimal for blessing ceremonies
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-yellow-400">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="text-xs text-yellow-200/80">
                Local Sacred Time
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RitualBlessing;
