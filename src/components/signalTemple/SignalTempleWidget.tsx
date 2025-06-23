import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Waves,
  Bell,
  Scroll,
  Users,
  Globe,
  Star,
  ArrowRight,
  RefreshCw,
  Settings,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useWhisperFeed,
  useSignalSubscriptions,
} from "@/hooks/useSignalTemple";
import WhisperFeed from "./WhisperFeed";

interface SignalTempleWidgetProps {
  userId: string;
  variant?: "landing" | "dashboard" | "sidebar";
  onNavigateToTemple?: () => void;
  className?: string;
}

const SignalTempleWidget: React.FC<SignalTempleWidgetProps> = ({
  userId,
  variant = "landing",
  onNavigateToTemple,
  className = "",
}) => {
  const navigate = useNavigate();
  const { whispers, unreadCount, isLoading } = useWhisperFeed(userId, 5);
  const { subscriptions } = useSignalSubscriptions(userId);
  const [showPreview, setShowPreview] = useState(false);

  const handleNavigateToTemple = () => {
    if (onNavigateToTemple) {
      onNavigateToTemple();
    } else {
      navigate("/signal-temple");
    }
  };

  const activeSubscriptions = subscriptions.filter((s) => s.isActive).length;

  if (variant === "landing") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={`${className}`}
      >
        <Card className="bg-gradient-to-r from-purple-900/60 to-cyan-900/60 border-purple-400/30 backdrop-blur-md overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(139,92,246,0.3),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(6,182,212,0.2),transparent_50%)]" />
          </div>

          <CardHeader className="relative z-10 pb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500">
                  <Waves className="w-10 h-10 text-white" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold text-white flex items-center">
                    ⚙️ SignalTemple
                    <Badge className="ml-3 bg-yellow-500 text-black">
                      <Star className="w-3 h-3 mr-1" />
                      New System
                    </Badge>
                  </CardTitle>
                  <p className="text-purple-400 text-lg font-medium mt-1">
                    Subscriptions as Ritual Echoes
                  </p>
                </div>
              </div>

              {unreadCount > 0 && (
                <Badge
                  variant="outline"
                  className="border-cyan-400 text-cyan-400 animate-pulse"
                >
                  <Bell className="w-3 h-3 mr-1" />
                  {unreadCount} Sacred Whispers
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="relative z-10 space-y-6">
            <p className="text-gray-200 text-lg leading-relaxed">
              Move beyond traditional newsletters to ritual echoes. SignalTemple
              creates sacred subscription contracts through meaningful
              actions—following scrolls, joining clusters, Flourish
              transactions, and attending ceremonies.
            </p>

            {/* Key Features */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Scroll className="w-5 h-5 text-cyan-400" />
                  <h4 className="text-white font-semibold">
                    Intelligent Triggers
                  </h4>
                </div>
                <p className="text-gray-300 text-sm">
                  Subscribe through sacred actions, not forms
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-green-400" />
                  <h4 className="text-white font-semibold">
                    Bioregional Whispers
                  </h4>
                </div>
                <p className="text-gray-300 text-sm">
                  Place-based ecological and community updates
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  <h4 className="text-white font-semibold">Sacred Consent</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  Sovereign control over signal reception
                </p>
              </div>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-3 gap-6 p-4 bg-black/20 rounded-lg border border-purple-500/20">
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {activeSubscriptions}
                </div>
                <div className="text-sm text-gray-400">Active Flows</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {whispers.length}
                </div>
                <div className="text-sm text-gray-400">Sacred Whispers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  5
                </div>
                <div className="text-sm text-gray-400">Channel Types</div>
              </div>
            </div>

            {/* Preview Toggle */}
            {whispers.length > 0 && (
              <div className="space-y-4">
                <Button
                  variant="outline"
                  onClick={() => setShowPreview(!showPreview)}
                  className="border-purple-500 text-purple-400 hover:bg-purple-500/20"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showPreview ? "Hide" : "Preview"} Recent Whispers
                </Button>

                <AnimatePresence>
                  {showPreview && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <WhisperFeed
                        userId={userId}
                        maxItems={3}
                        variant="minimal"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between pt-6 border-t border-white/10">
              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                  onClick={handleNavigateToTemple}
                >
                  <Waves className="w-5 h-5 mr-2" />
                  Enter SignalTemple
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20"
                  onClick={() => navigate("/auth")}
                >
                  <Scroll className="w-5 h-5 mr-2" />
                  Start Your Flow
                </Button>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Zap className="w-4 h-4" />
                <span>Powered by Sacred Technology</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (variant === "dashboard") {
    return (
      <Card
        className={`bg-black/40 border-purple-500/30 backdrop-blur-md ${className}`}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold text-purple-400">
            SignalTemple
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNavigateToTemple}
            className="text-purple-400 hover:bg-purple-500/20"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">
                {unreadCount}
              </div>
              <div className="text-xs text-gray-400">Unread</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {activeSubscriptions}
              </div>
              <div className="text-xs text-gray-400">Active</div>
            </div>
          </div>

          {whispers.length > 0 && (
            <WhisperFeed userId={userId} maxItems={2} variant="minimal" />
          )}

          <Button
            onClick={handleNavigateToTemple}
            className="w-full bg-gradient-to-r from-purple-500 to-cyan-500"
            size="sm"
          >
            Open Temple
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Sidebar variant
  return (
    <Card
      className={`bg-black/30 border-purple-500/20 backdrop-blur-sm ${className}`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Waves className="w-4 h-4 text-purple-400" />
            <span className="text-white font-semibold text-sm">
              SignalTemple
            </span>
          </div>
          {unreadCount > 0 && (
            <Badge
              variant="secondary"
              className="bg-cyan-500/20 text-cyan-300 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="text-center text-xs text-gray-400">
            {activeSubscriptions} flows • {whispers.length} whispers
          </div>

          <Button
            onClick={handleNavigateToTemple}
            variant="outline"
            size="sm"
            className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/20 text-xs"
          >
            Open Temple
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignalTempleWidget;
