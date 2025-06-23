// CIVICA 144 ScrollParchment Component
// Animated parchment interface for displaying civic scrolls

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ScrollText,
  Heart,
  Sparkles,
  Crown,
  Users,
  Globe,
  Zap,
  Eye,
  Download,
  Share,
  Play,
  Pause,
} from "lucide-react";
import { CivicScroll } from "@/types/scrollSignal";

interface ScrollParchmentProps {
  scroll: CivicScroll | null;
  isGenerating?: boolean;
  className?: string;
  onBlessRequest?: () => void;
  onExecute?: () => void;
  onShare?: () => void;
}

export const ScrollParchment: React.FC<ScrollParchmentProps> = ({
  scroll,
  isGenerating = false,
  className = "",
  onBlessRequest,
  onExecute,
  onShare,
}) => {
  const [isUnfurling, setIsUnfurling] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Unfurl animation when scroll appears
  useEffect(() => {
    if (scroll && !isGenerating) {
      setIsUnfurling(true);
      setTimeout(() => {
        setShowContent(true);
        startTypingAnimation();
      }, 800);
    } else {
      setIsUnfurling(false);
      setShowContent(false);
      setTypingText("");
    }
  }, [scroll, isGenerating]);

  const startTypingAnimation = () => {
    if (!scroll?.content) return;

    let currentText = "";
    const fullText = scroll.content;
    let index = 0;

    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        currentText += fullText[index];
        setTypingText(currentText);
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 30); // Typing speed
  };

  const getScrollTypeGradient = (type: string) => {
    const gradients = {
      healthcare: "from-red-400/20 via-pink-400/20 to-red-400/20",
      education: "from-blue-400/20 via-cyan-400/20 to-blue-400/20",
      environment: "from-green-400/20 via-emerald-400/20 to-green-400/20",
      cultural: "from-purple-400/20 via-violet-400/20 to-purple-400/20",
      governance: "from-yellow-400/20 via-orange-400/20 to-yellow-400/20",
      emergency: "from-orange-400/20 via-red-400/20 to-orange-400/20",
      ritual: "from-pink-400/20 via-rose-400/20 to-pink-400/20",
      memory: "from-indigo-400/20 via-purple-400/20 to-indigo-400/20",
    };
    return gradients[type as keyof typeof gradients] || gradients.cultural;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      creating: "border-yellow-400 text-yellow-400 bg-yellow-400/10",
      pending_blessing: "border-orange-400 text-orange-400 bg-orange-400/10",
      blessed: "border-green-400 text-green-400 bg-green-400/10",
      active: "border-blue-400 text-blue-400 bg-blue-400/10",
      completed: "border-purple-400 text-purple-400 bg-purple-400/10",
      archived: "border-gray-400 text-gray-400 bg-gray-400/10",
    };
    return colors[status as keyof typeof colors] || colors.creating;
  };

  const simulateAudioPlayback = () => {
    setIsAudioPlaying(!isAudioPlaying);
    // In real implementation, this would play the actual audio version
    setTimeout(() => setIsAudioPlaying(false), 3000);
  };

  if (isGenerating) {
    return (
      <Card
        className={`bg-gradient-to-br from-amber-100/10 via-yellow-100/10 to-amber-100/10 backdrop-blur-sm border-amber-400/30 ${className}`}
      >
        <CardContent className="p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-12 h-12 text-amber-400 mx-auto" />
            </motion.div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-amber-300">
                Sacred AI Weaving Your Scroll...
              </h3>
              <p className="text-amber-200/80">
                Amazon Bedrock channels ancestral wisdom through quantum
                pathways
              </p>
            </div>

            <div className="space-y-2">
              <Progress value={85} className="h-2 bg-amber-400/20" />
              <div className="text-sm text-amber-300/80">
                Integrating voice wisdom with cultural protocols...
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-3 gap-4 text-xs text-amber-200/60"
            >
              <div>🧠 AI Processing</div>
              <div>🌍 Cultural Context</div>
              <div>✨ Sacred Integration</div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  if (!scroll) {
    return (
      <Card
        className={`bg-gradient-to-br from-gray-100/10 via-slate-100/10 to-gray-100/10 backdrop-blur-sm border-gray-400/30 ${className}`}
      >
        <CardContent className="p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-6"
          >
            <div className="space-y-4">
              <ScrollText className="w-16 h-16 text-gray-400 mx-auto opacity-50" />
              <h3 className="text-xl font-semibold text-gray-300">
                Sacred Scroll Awaits Creation
              </h3>
              <p className="text-gray-400">
                Speak your wisdom or type your intention to begin weaving a new
                scroll
              </p>
            </div>

            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-sm text-gray-500"
            >
              Activate voice input or select a scroll type to begin...
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card
        className={`bg-gradient-to-br ${getScrollTypeGradient(scroll.type)} backdrop-blur-sm border-white/20 relative overflow-hidden`}
      >
        {/* Parchment Texture Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div
            className={
              'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="parchment" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"%3E%3Ccircle cx="10" cy="10" r="1" fill="%23ffffff" opacity="0.1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100" height="100" fill="url(%23parchment)"/%3E%3C/svg%3E\')]'
            }
          ></div>
        </div>

        {/* Unfurling Animation */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: isUnfurling ? "auto" : 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <CardContent className="p-6 relative z-10">
            {/* Scroll Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: showContent ? 1 : 0,
                y: showContent ? 0 : -20,
              }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-between mb-6"
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ScrollText className="w-6 h-6 text-purple-400" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {scroll.title}
                  </h2>
                  <p className="text-sm text-gray-300">
                    By {scroll.createdBy.name} •{" "}
                    {scroll.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge
                  variant="outline"
                  className={getStatusColor(scroll.status)}
                >
                  {scroll.status.replace("_", " ").toUpperCase()}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-purple-400 text-purple-400 bg-purple-400/10"
                >
                  {scroll.type.toUpperCase()}
                </Badge>
              </div>
            </motion.div>

            {/* Scroll Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              {/* Main Content */}
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <div className="prose prose-invert max-w-none">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-100 leading-relaxed whitespace-pre-wrap"
                  >
                    {showContent ? typingText : ""}
                    {typingText &&
                      typingText.length < scroll.content.length && (
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="inline-block w-0.5 h-5 bg-purple-400 ml-1"
                        />
                      )}
                  </motion.div>
                </div>
              </div>

              {/* Scroll Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* AI Generation Info */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">
                      AI Generation
                    </span>
                  </div>
                  <div className="text-xs text-gray-300 space-y-1">
                    <div>Model: Bedrock Claude-3</div>
                    <div>
                      Confidence: {(Math.random() * 0.2 + 0.8).toFixed(2)}
                    </div>
                    <div>
                      Language: {scroll.metadata.language.toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Community Impact */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">
                      Community Impact
                    </span>
                  </div>
                  <div className="text-xs text-gray-300 space-y-1">
                    <div>
                      SDG Score: {scroll.communityImpact.overall.sdgScore}
                    </div>
                    <div>
                      Wellbeing:{" "}
                      {(
                        scroll.communityImpact.overall.communityWellbeing * 100
                      ).toFixed(0)}
                      %
                    </div>
                    <div>
                      Risk: {scroll.communityImpact.overall.risk.toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Blessings */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="w-4 h-4 text-pink-400" />
                    <span className="text-sm font-medium text-pink-400">
                      Sacred Blessings
                    </span>
                  </div>
                  <div className="text-xs text-gray-300 space-y-1">
                    <div>Count: {scroll.blessings.length}</div>
                    <div>
                      Power:{" "}
                      {scroll.blessings.reduce((acc, b) => acc + b.power, 0)}
                    </div>
                    <div>
                      Status:{" "}
                      {scroll.status === "blessed" ? "BLESSED" : "PENDING"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  {/* Audio Playback */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={simulateAudioPlayback}
                    className="border-blue-400 text-blue-400 hover:bg-blue-400/10"
                  >
                    {isAudioPlaying ? (
                      <Pause className="w-4 h-4 mr-2" />
                    ) : (
                      <Play className="w-4 h-4 mr-2" />
                    )}
                    {isAudioPlaying ? "Playing" : "Listen"}
                  </Button>

                  {/* View Full */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-400 text-purple-400 hover:bg-purple-400/10"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Full
                  </Button>

                  {/* Share */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onShare}
                    className="border-green-400 text-green-400 hover:bg-green-400/10"
                  >
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Blessing Request */}
                  {scroll.status === "creating" ||
                  scroll.status === "pending_blessing" ? (
                    <Button
                      onClick={onBlessRequest}
                      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Request Blessing
                    </Button>
                  ) : null}

                  {/* Execute Scroll */}
                  {scroll.status === "blessed" ? (
                    <Button
                      onClick={onExecute}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Execute Scroll
                    </Button>
                  ) : null}
                </div>
              </motion.div>
            </motion.div>
          </CardContent>
        </motion.div>

        {/* Sacred Glow Effect */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none"
        />

        {/* Corner Ornaments */}
        <div className="absolute top-2 left-2 text-purple-400/30">
          <Crown className="w-4 h-4" />
        </div>
        <div className="absolute top-2 right-2 text-purple-400/30">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="absolute bottom-2 left-2 text-purple-400/30">
          <Heart className="w-4 h-4" />
        </div>
        <div className="absolute bottom-2 right-2 text-purple-400/30">
          <Globe className="w-4 h-4" />
        </div>
      </Card>
    </motion.div>
  );
};

export default ScrollParchment;
