import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  User,
  Sparkles,
  Scroll,
  Clock,
  Crown,
  Heart,
  TreePine,
  Star,
  Settings,
  LogOut,
} from "lucide-react";
import { PresenceOrb as PresenceOrbType } from "@/types/navigation";

interface PresenceOrbProps {
  userRole?: string;
  activeCluster?: number;
  ritualStatus?: string;
  flourishBalance?: number;
  scrollCount?: number;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  className?: string;
}

const PresenceOrb = ({
  userRole = "ritual_designer",
  activeCluster,
  ritualStatus,
  flourishBalance = 847,
  scrollCount = 12,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
  size = "md",
  interactive = true,
  className = "",
}: PresenceOrbProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [orbEnergy, setOrbEnergy] = useState(0);
  const [showInscriptions, setShowInscriptions] = useState(false);
  const [energyPulse, setEnergyPulse] = useState(0);

  // Energy pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyPulse((prev) => (prev + 0.1) % (Math.PI * 2));
      setOrbEnergy((prev) => Math.sin(Date.now() * 0.002) * 0.3 + 0.7);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const getRoleConfig = (role: string) => {
    const configs = {
      ritual_designer: {
        shape: "circle",
        colors: ["#f59e0b", "#ea580c"], // amber to orange
        glyph: "🕯️",
        pattern: "mandala",
        inscriptions: ["☰", "☱", "☲", "☳"],
      },
      forest_delegate: {
        shape: "hexagon",
        colors: ["#059669", "#0d9488"], // emerald to teal
        glyph: "🌳",
        pattern: "flow",
        inscriptions: ["🍃", "🌿", "🌱", "🌾"],
      },
      future_diplomat: {
        shape: "triangle",
        colors: ["#0ea5e9", "#2563eb"], // sky to blue
        glyph: "🌟",
        pattern: "pulse",
        inscriptions: ["⚡", "💫", "🔮", "⭐"],
      },
      myth_weaver: {
        shape: "spiral",
        colors: ["#ec4899", "#be185d"], // pink to rose
        glyph: "📜",
        pattern: "breathe",
        inscriptions: ["📚", "✒️", "🌉", "🔄"],
      },
      network_architect: {
        shape: "square",
        colors: ["#8b5cf6", "#7c3aed"], // violet
        glyph: "🔗",
        pattern: "flow",
        inscriptions: ["🕸️", "🧬", "⚡", "⚖️"],
      },
      soil_steward: {
        shape: "star",
        colors: ["#65a30d", "#16a34a"], // lime to green
        glyph: "🌱",
        pattern: "breathe",
        inscriptions: ["🌿", "♻️", "🌰", "🌾"],
      },
    };
    return configs[role as keyof typeof configs] || configs.ritual_designer;
  };

  const roleConfig = getRoleConfig(userRole);
  const sizes = {
    sm: { orb: 40, expanded: 280 },
    md: { orb: 48, expanded: 320 },
    lg: { orb: 56, expanded: 360 },
  };

  const getShapePath = (shape: string, size: number) => {
    const half = size / 2;
    switch (shape) {
      case "triangle":
        return `M ${half} 0 L ${size} ${size} L 0 ${size} Z`;
      case "square":
        return `M 0 0 L ${size} 0 L ${size} ${size} L 0 ${size} Z`;
      case "hexagon":
        const points = [];
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const x = half + half * 0.8 * Math.cos(angle);
          const y = half + half * 0.8 * Math.sin(angle);
          points.push(`${x} ${y}`);
        }
        return `M ${points.join(" L ")} Z`;
      case "star":
        const starPoints = [];
        for (let i = 0; i < 10; i++) {
          const angle = (i * Math.PI) / 5;
          const radius = i % 2 === 0 ? half * 0.8 : half * 0.4;
          const x = half + radius * Math.cos(angle - Math.PI / 2);
          const y = half + radius * Math.sin(angle - Math.PI / 2);
          starPoints.push(`${x} ${y}`);
        }
        return `M ${starPoints.join(" L ")} Z`;
      case "spiral":
        let spiralPath = `M ${half} ${half}`;
        for (let i = 0; i <= 100; i++) {
          const angle = (i * Math.PI) / 25;
          const radius = (i / 100) * half * 0.8;
          const x = half + radius * Math.cos(angle);
          const y = half + radius * Math.sin(angle);
          spiralPath += ` L ${x} ${y}`;
        }
        return spiralPath;
      default: // circle
        return "";
    }
  };

  const orbSize = sizes[size].orb;
  const expandedSize = sizes[size].expanded;

  return (
    <div className={`relative ${className}`}>
      {/* Main orb */}
      <motion.div
        className="relative cursor-pointer"
        style={{ width: orbSize, height: orbSize }}
        whileHover={interactive ? { scale: 1.1 } : {}}
        whileTap={interactive ? { scale: 0.95 } : {}}
        onClick={() => {
          if (interactive) {
            setIsExpanded(!isExpanded);
            onProfileClick?.();
          }
        }}
        onHoverStart={() => setShowInscriptions(true)}
        onHoverEnd={() => setShowInscriptions(false)}
      >
        {/* Energy emanation */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: `radial-gradient(circle, ${roleConfig.colors[0]}40 0%, transparent 70%)`,
          }}
        />

        {/* Main orb body */}
        <motion.div
          className="relative w-full h-full border-2 flex items-center justify-center overflow-hidden"
          style={{
            borderColor: roleConfig.colors[0],
            background: `linear-gradient(135deg, ${roleConfig.colors[0]}40, ${roleConfig.colors[1]}60)`,
          }}
          animate={{
            borderColor:
              roleConfig.colors[
                Math.floor(energyPulse) % roleConfig.colors.length
              ],
            boxShadow: `0 0 ${20 * orbEnergy}px ${roleConfig.colors[0]}80`,
          }}
        >
          {/* Sacred shape overlay */}
          {roleConfig.shape !== "circle" && (
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox={`0 0 ${orbSize} ${orbSize}`}
            >
              <path
                d={getShapePath(roleConfig.shape, orbSize)}
                fill="none"
                stroke={roleConfig.colors[1]}
                strokeWidth="1"
                opacity="0.6"
              />
            </svg>
          )}

          {/* Role glyph */}
          <motion.div
            className="text-2xl z-10"
            animate={{
              scale: [1, 1.1, 1],
              filter: `brightness(${orbEnergy})`,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {roleConfig.glyph}
          </motion.div>

          {/* Sacred inscriptions */}
          <AnimatePresence>
            {showInscriptions && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {roleConfig.inscriptions.map((symbol, index) => {
                  const angle = index * 90 * (Math.PI / 180);
                  const radius = orbSize * 0.3;
                  const x = orbSize / 2 + Math.cos(angle) * radius;
                  const y = orbSize / 2 + Math.sin(angle) * radius;

                  return (
                    <div
                      key={symbol}
                      className="absolute text-xs opacity-60"
                      style={{
                        left: x - 6,
                        top: y - 6,
                        color: roleConfig.colors[1],
                      }}
                    >
                      {symbol}
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Status indicators */}
        {ritualStatus && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-purple-500 border border-white"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {activeCluster && (
          <motion.div
            className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-cyan-500 border border-white flex items-center justify-center text-xs font-bold"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {activeCluster}
          </motion.div>
        )}
      </motion.div>

      {/* Expanded profile panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute top-full right-0 mt-2 z-50"
            style={{ width: expandedSize }}
          >
            <Card className="bg-black/80 border-white/20 backdrop-blur-md">
              <CardHeader className="text-center pb-2">
                <div className="flex items-center justify-center space-x-3">
                  <div className="text-3xl">{roleConfig.glyph}</div>
                  <div>
                    <CardTitle className="text-lg text-white">
                      Sacred Identity
                    </CardTitle>
                    <p className="text-sm text-gray-400 capitalize">
                      {userRole.replace("_", " ")}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Energy levels */}
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-cyan-400">
                    Sacred Energies:
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: "Wisdom", value: 87, color: "bg-blue-500" },
                      { label: "Service", value: 72, color: "bg-green-500" },
                      {
                        label: "Connection",
                        value: 94,
                        color: "bg-purple-500",
                      },
                      { label: "Creativity", value: 63, color: "bg-pink-500" },
                    ].map((energy) => (
                      <div key={energy.label} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-300">{energy.label}</span>
                          <span className="text-white">{energy.value}%</span>
                        </div>
                        <Progress value={energy.value} className="h-1" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center space-x-1">
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                      <span className="text-lg font-bold text-yellow-400">
                        {flourishBalance}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">Flourish</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center space-x-1">
                      <Scroll className="w-4 h-4 text-purple-400" />
                      <span className="text-lg font-bold text-purple-400">
                        {scrollCount}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">Sacred Scrolls</div>
                  </div>
                </div>

                {/* Active status */}
                {ritualStatus && (
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-purple-400">
                        Active Ritual:
                      </span>
                    </div>
                    <div className="text-sm text-white ml-6">
                      {ritualStatus}
                    </div>
                  </div>
                )}

                {/* Quick actions */}
                <div className="grid grid-cols-3 gap-2">
                  <motion.button
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onProfileClick}
                  >
                    <User className="w-4 h-4 mx-auto text-cyan-400" />
                    <div className="text-xs text-gray-400 mt-1">Profile</div>
                  </motion.button>
                  <motion.button
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onSettingsClick}
                  >
                    <Settings className="w-4 h-4 mx-auto text-gray-400" />
                    <div className="text-xs text-gray-400 mt-1">Settings</div>
                  </motion.button>
                  <motion.button
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onLogoutClick}
                  >
                    <LogOut className="w-4 h-4 mx-auto text-red-400" />
                    <div className="text-xs text-gray-400 mt-1">Exit</div>
                  </motion.button>
                </div>

                {/* Sacred time */}
                <div className="text-center pt-2 border-t border-white/20">
                  <div className="text-xs text-gray-400">
                    Sacred Time:{" "}
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PresenceOrb;
